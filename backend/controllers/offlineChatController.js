const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const OfflineChat = require("../models/OfflineChat.js");
const User = require("../models/userModel.js");
const Astro = require("../models/astroModel.js");
const error = require("../middleware/error.js");


exports.astroOffChat = catchAsyncErrors(async (req, res) => {
    const { astroId, userId, offChatId, content } = req.body
    const chat = await OfflineChat.findOne({ _id: offChatId })
    chat.messages.push({ sender: astroId, content })
    await chat.save()
    res.status(200).json({ success: true, chat })
})

exports.astroGetAllOffChat = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const chat = await OfflineChat.find({ astro: id, isReplied: false }).populate("user").populate("astro")
    res.status(200).json({ success: true, chat })
})


// // fetch all the chats
// // exports.fetchChat = catchAsyncErrors(async (req, res) => {
// //     const a = req.query.astro
// //     if (a === "astro") {
// //         Chat.find({ astro: req.query.myId })
// //             .populate("user", "-password")
// //             .populate("astro", "-password")
// //             .populate("latestMessage")
// //             .sort({ updatedAt: -1 })
// //             .then(async (result) => {
// //                 console.log(result)
// //                 result = await User.populate(result, {
// //                     path: "latestMessage.sender",
// //                     select: "name avatar email"
// //                 })
// //                 res.status(200).send({ success: true, chats: result })
// //             })
// //             .catch((e) => {
// //                 throw new ErrorHandler(e.message, 400)
// //             })
// //     }
// //     else {
// //         Chat.find({ user: req.query.myId })
// //             .populate("user", "-password")
// //             .populate("astro", "-password")
// //             .populate("latestMessage")
// //             .sort({ updatedAt: -1 })
// //             .then(async (result) => {
// //                 result = await User.populate(result, {
// //                     path: "latestMessage.sender",
// //                     select: "name avatar email"
// //                 })
// //                 res.status(200).send({ success: true, chats: result })
// //             })
// //             .catch((e) => {
// //                 throw new ErrorHandler(e.message, 400)
// //             })
// //     }

// // })
// // exports.AdminFetchChat = catchAsyncErrors(async (req, res) => {
// //     const { astro, user } = req.body
// //     const isChat = await Chat.findOne({
// //         $and: [
// //             { astro: astro },
// //             { user: user },
// //         ],
// //     })
// //     if (!isChat?._id) throw new ErrorHandler("chat is not available", 404)
// //     const messages = await Message.find({ chat: isChat._id })
// //     console.log(messages)
// //     res.send({ messages, success: true })
// // })
// // exports.sendMessage = catchAsyncErrors(async (req, res) => {
// //     const { content, myId, chatId } = req.body
// //     if (!content || !chatId) {
// //         throw new ErrorHandler("Invalid data parse into request", 404)
// //     }
// //     var newMessage = {
// //         sender: myId,
// //         content: content,
// //         chat: chatId
// //     }
// //     try {
// //         var message = await Message.create(newMessage)
// //         message = await message.populate("chat")
// //         message = await User.populate(message, { path: "chat.user", select: "name avatar email" })
// //         message = await User.populate(message, { path: "chat.astro", select: "name avatar email" })
// //         await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
// //         res.json({ message, success: true })
// //     } catch (error) {
// //         throw new ErrorHandler(error.message, 404)
// //     }
// // })
// // exports.allMessages = catchAsyncErrors(async (req, res) => {
// //     try {
// //         const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name avatar email").populate("chat")
// //         res.send({ messages, success: true })
// //     } catch (error) {
// //         throw new ErrorHandler(error.message, 400)
// //     }
// // })
exports.userOffChat = catchAsyncErrors(async (req, res) => {
    const { astroId, userId, offChatId, content } = req.body
    const chat = await OfflineChat.findOne({
        $and: [
            { astro: astroId },
            { user: userId },
            { _id: offChatId }
        ]
    })
    const u = await User.findOne({ _id: userId })
    u.balance = u.balance - 7
    if (u.balance < 0) {
        throw new ErrorHandler("you have not sufficient balance", 401)
    }
    await u.save()
    chat.messages.push({ sender: userId, content, user: userId })
    await chat.save()
    res.status(200).json({ success: true, chat })
})
exports.userGetAllOffChat = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const chat = await OfflineChat.find({ user: id }).populate("user").populate("astro")
    res.status(200).json({ success: true, chat })
})
exports.addOfflineChat = catchAsyncErrors(async (req, res) => {
    const { astroId, myId, content } = req.body
    if (!astroId) {
        throw new ErrorHandler("Your link is broken", 404)
    }
    else {
        var chatData = {
            astro: astroId,
            user: myId,
        }
        try {
            const u = await User.findOne({ _id: myId })
            u.balance = u.balance - 7
            if (u.balance < 0) {
                throw new ErrorHandler("you have not sufficient balance", 401)
            }
            await u.save()
            const createdChat = await OfflineChat.create(chatData)
            createdChat.messages.push({ sender: myId, content: content })
            await createdChat.save()
            const fullChat = await OfflineChat.findOne({ _id: createdChat._id }).populate("astro", "-password").populate("user", "-password")
            res.status(200).json({ success: true, offChat: fullChat })
        } catch (error) {
            throw new ErrorHandler(error.message, 400)
        }
    }

})
