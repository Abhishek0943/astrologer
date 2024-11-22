const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const Chat = require("../models/ChatModel");
const Session = require("../models/SessionModel");
const User = require("../models/userModel");
const Astro = require("../models/astroModel");
const Message = require("../models/MessageModel");
const Recharge = require("../models/RechargeModel");

exports.createChat = catchAsyncErrors(async (req, res) => {
    const { userId, astroId } = req.body
    if (!astroId || !userId) {
        throw new ErrorHandler("Your link is broken", 404)
    }
    let isChat = {}
    isChat = await Chat.findOne({
        $and: [
            { astro: astroId },
            { user: userId },
        ],
    })
    const session = await Session.create({ astro: astroId, user: userId })
    if (!isChat?._id) {
        var chatData = {
            astro: astroId,
            user: userId
        }
        isChat = await Chat.create(chatData)
    }
    const user = await User.findOne({ _id: userId })
    const astro = await Astro.findById({ _id: astroId })
    user.chat = { chatId: isChat._id, sessionId: session._id, astroId }
    astro.chat = { chatId: isChat._id, sessionId: session._id, userId }
    await user.save()
    await astro.save()
    res.status(200).send({ success: true, astro, user })
})
exports.endChat = catchAsyncErrors(async (req, res) => {
    try {
        const { sessionId } = req.body
        const session = await Session.findOne({ _id: sessionId }).populate('astro').populate('user')
        session.endDate = new Date()
        const createDate = new Date(session.createdAt);
        const time = new Date() - createDate
        const timeInMinutes = Math.floor(time / (1000 * 60)) + 1
        session.isOpen = false
        const user = session.user
        const astro = session.astro
        user.chat = {}
        user.balance = user.balance || 0 - timeInMinutes * 7
        await Recharge.create({ user: user._id, amount: timeInMinutes * 7, from: `Chat with ${astro.name}`, add: false })
        astro.chat = {}
        await user.save()
        await astro.save()
        await session.save()
        res.status(200).send({ success: true, astro, user })
    } catch (error) {
        console.log(error)
    }

})
exports.postReview = catchAsyncErrors(async (req, res) => {
    try {
        const { id, comment, rating, user } = req.body
        await Session.findByIdAndUpdate({ _id: id }, { review: { comment, rating, user } }, { new: true })
        res.status(200).json({ success: true, sdjfhadsf: "sjdfhuadsgas" })
    } catch (error) {
        console.log(error)
    }
})
exports.allMessages = catchAsyncErrors(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.id })
        res.send({ messages, success: true })
    } catch (error) {
        throw new ErrorHandler(error.message, 400)
    }
})











































// fetch all the chats 
exports.fetchChat = catchAsyncErrors(async (req, res) => {
    const a = req.query.astro
    if (a === "astro") {
        Chat.find({ astro: req.query.myId })
            .populate("astro", "-password")
            .sort({ updatedAt: -1 })

    }
    else {
        Chat.find({ user: req.query.myId })
            .populate("user", "-password")
            .populate("astro", "-password")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                console.log(result)
                res.status(200).send({ success: true, chats: result })
            })
            .catch((e) => {
                throw new ErrorHandler(e.message, 400)
            })
    }

})
exports.AdminFetchChat = catchAsyncErrors(async (req, res) => {
    const { astro, user } = req.body
    const isChat = await Chat.findOne({
        $and: [
            { astro: astro },
            { user: user },
        ],
    })
    if (!isChat?._id) throw new ErrorHandler("chat is not available", 404)
    const messages = await Message.find({ chat: isChat._id })
    console.log(messages)
    res.send({ messages, success: true })
})
exports.sendMessage = catchAsyncErrors(async (req, res) => {
    const { content, myId, chatId } = req.body
    if (!content || !chatId) {
        throw new ErrorHandler("Invalid data parse into request", 404)
    }
    var newMessage = {
        sender: myId,
        content: content,
        chat: chatId
    }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("chat")
        message = await User.populate(message, { path: "chat.user", select: "name avatar email" })
        message = await User.populate(message, { path: "chat.astro", select: "name avatar email" })
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
        res.json({ message, success: true })
    } catch (error) {
        throw new ErrorHandler(error.message, 404)
    }
})

