const Session = require('../models/SessionModel.js');
const User = require('../models/userModel.js');
const Astro = require('../models/astroModel.js');
const OfflineChat = require('../models/OfflineChat.js');
exports.addSession = async (req, res) => {
    const { astroId, userId, time, price, bonusBalance, value, rating, comment, offline, offChatId } = req.body
    if (offline) {
        try {
            const off = await OfflineChat.findOne({ _id: offChatId })
            off.isReplied = true
            await off.save()
            const xh = await Session.find()
            const d = new Date(off.createdAt)
            const c = new Date()
            const differenceInMilliseconds = c - d;
            const u = await Astro.findOne({ _id: astroId })
            const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
            u.balance = u.balance + 2.5
            await u.save()
            const a = await Session.create({ astroPrevBalance: u.balance, id: xh.length + 1, isOnline: false, astro: astroId, reason: value ? value : "NaN", user: userId, userPaid: 7, astroEarn: 2.5, timeInSeconds: differenceInSeconds })
            const chat = await OfflineChat.find({ astro: astroId, isReplied: false }).populate("user").populate("astro")
            res.status(200).json({ success: true, offChat: chat })
        } catch (error) {
            console.log(error.message)
        }
    } else {
        if (time <= 0) {
            return
        }
        const getAstro = (t, bb) => {
            const x = (bb / 2.51) * 60
            const v = t - x
            let a = 0
            const getAmount = (t, p) => {
                const m = ("0" + Math.floor((t / 60) % 60)).slice(-2)
                const s = ("0" + Math.floor((t) % 60)).slice(-2)
                let a = 0;
                a = m * p
                if (s > 0) {
                    a = a + p
                }
                return a
            }
            if (v <= 0) {
                a = getAmount(t, 0.33)
            }
            else if (v > 0) {
                if (x >= 60) {
                    let b = getAmount(x, 0.33)
                    let c = getAmount(v, 0.77)
                    a = b + c
                }
                else {
                    a = getAmount(t, 0.77)
                }
            }
            return a
        }

        const minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2)
        const second = ("0" + Math.floor((time) % 60)).slice(-2)
        const user = await User.findOne({ _id: userId })
        const getAmount = (m, s, p) => {
            let a = 0;
            a = m * p
            if (s > 0) {
                a = a + p
            }
            return a
        }
        const xh = await Session.find()
        const userChargeAmount = getAmount(minutes, second, price)

        const astro = await Astro.findOne({ _id: astroId })
        let astroChargeAmount = getAstro(time, user.bonus)
        let reviews = {}
        if (rating) {
            reviews.rating = Number(rating)
            reviews.comment = comment
            reviews.user = userId
        }
        astro.reviews.push(reviews)
        astro.balance = parseFloat(astro.balance + astroChargeAmount)
        astro.consultation = astro.consultation + 1
        astro.save()
        user.balance = parseFloat(user.balance - userChargeAmount)
        user.bonus = user.bonus >= 0 && parseFloat(user.bonus - userChargeAmount)
        user.save()
        const a = await Session.create({ astroPrevBalance: astro.balance, id: xh.length + 1, review: reviews, astro: astroId, reason: value ? value : "NaN", user: userId, userPaid: userChargeAmount, astroEarn: astroChargeAmount, userPaidPrise: price, astroEarnPrise: astro.earnPrise, timeInSeconds: time })
        res.status(200).json({ success: true })
    }

}
exports.getSession = async (req, res) => {
    const { id, a } = req.query
    if (a) {
        const sessions = await Session.find({ astro: id }).populate("user").populate("astro")
        res.status(200).json({ success: true, sessions })
    }
    else {
        const sessions = await Session.find({ user: id }).populate("astro").populate("user")
        res.status(200).json({ success: true, sessions })
    }
}
exports.Session = async (req, res) => {
    const sessions = await Session.find().populate("user").populate("astro")
    res.status(200).json({ success: true, sessions })
}
exports.userSession = async (req, res) => {
    const { astro, user } = req.body

    const sessions = await Session.find({
        $and: [
            { user: user },
            { astro: astro }
        ]
    }).populate("user").populate("astro")
    res.status(200).json({ success: true, sessions })
}
