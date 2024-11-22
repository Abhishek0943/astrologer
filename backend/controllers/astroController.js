const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const Astro = require("../models/astroModel");
const Bank = require("../models/bankModel.js");
const Log = require("../models/loginActivity.js");
const User = require("../models/userModel");
const log = require("../models/loginActivity");
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander.js");
const bcrypt = require("bcryptjs");

exports.registerUser = catchAsyncErrors(async (req, res) => {
    try {
        const { name, email, password, number, username } = req.body
        const otp = Math.floor(1000 + Math.random() * 9000);
        await Astro.create({ otp: otp.toString(), name, email, password, number, username })
        res.status(200).json({ success: true })
        const html = `<h1>${otp}</h1>`
        sendEmail({
            email: email,
            subject: "Verification Email",
            html
        })
    } catch (error) {
        console.log(error)
    }
})
exports.approve = catchAsyncErrors(async (req, res) => {
    try {
        const { id, approved } = req.body
        const astro = await Astro.find({ _id: id })
        astro.isApproved = approved === "approved" ? true : false1
        await astro.save()
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
    }
})
exports.emailVerification = catchAsyncErrors(async (req, res) => {
    const { otp, email } = req.body;
    console.log(req.body)
    const a = await Astro.findOne({ email }).select("+otp")
    if (a.otp === otp.toString()) {
        a.isVerified = true;
        a.save()
        const token = a.getJWTToken()
        res.status(200).json({ success: true, astro: a, token });
    }
    else {
        throw new ErrorHandler("You enter Wrong Otp", 400)
    }
})
exports.login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body
        let astro = await Astro.findOne({ email: email, isVerified: true }).select("+password")
        if (!astro) {
            return next(new ErrorHandler("Invalid email", 401))
        }
        const isPasswordMatched = await astro.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid  password", 401))
        }
        const token = astro.getJWTToken();
        astro.loginToken = token;
        astro.save()
        res.status(200).json({
            success: true,
            astro,
            token
        })
    } catch (error) {
        res.status(400).json({ success: false, error, message: error.message })
    }

})
exports.stepOne = catchAsyncErrors(async (req, res, next) => {
    try {
        const { category, specialty, language, experience, about, id } = req.body
        let astro = await Astro.findOne({ _id: id, isVerified: true })
        if (!astro) {
            return next(new ErrorHandler("Invalid user", 401))
        }
        astro.category = category
        astro.specialty = specialty
        astro.language = language
        astro.experience = experience
        astro.about = about
        astro.step = 2
        astro.save()
        res.status(200).json({
            success: true,
            astro
        })
    } catch (error) {
        res.status(400).json({ success: false, error, message: error.message })
    }

})
exports.stepTwo = catchAsyncErrors(async (req, res, next) => {
    try {
        const { address, country, accountName, IFSCCode, nameOfAccount, paypalId, id, file } = req.body
        console.log(file)
        let astro = await Astro.findOne({ _id: id, isVerified: true })
        if (!astro) {
            return next(new ErrorHandler("Invalid user", 401))
        }
        astro.country = country
        astro.step = 3
        astro.save()
        await Bank.create({ address, accountName, IFSCCode, nameOfAccount, paypalId, astro: id })
        res.status(200).json({
            success: true,
            astro
        })
    } catch (error) {
        res.status(400).json({ success: false, error, message: error.message })
    }

})
exports.getAllAstro = catchAsyncErrors(async (req, res, next) => {
    try {
        let astro = await Astro.find()
        res.status(200).json({
            success: true,
            astrologers: astro
        })
    } catch (error) {
        res.status(400).json({ success: false, error, message: error.message })
    }

})
exports.getAstro = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.params)
        let astro = await Astro.findOne({ _id: req.params.id })
        let bank = await Bank.findOne({ astro: req.params.id })
        res.status(200).json({
            success: true,
            astrologer: astro,
            bank,
        })
    } catch (error) {
        res.status(400).json({ success: false, error, message: error.message })
    }

})







// exports.getAstro = catchAsyncErrors(async (req, res) => {
//     function shuffleArray(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             // Swap array[i] and array[j]
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     }
//     let astro = await Astro.find()
//     shuffleArray(astro)
//     const sortedArray = astro.sort((a, b) => {
//         const order = { Online: 1, Busy: 2, Offline: 3 };
//         return order[a.isOnline] - order[b.isOnline];
//     });
//     res.status(200).json({ astrologers: sortedArray, success: true })
// })
exports.GetAstrologerLog = catchAsyncErrors(async (req, res) => {
    const astro = await Log.find({ astro: req.params.id })
    res.status(200).json({ logs: astro, success: true })
})
exports.upload = catchAsyncErrors(async (req, res) => {
    const { profile, Id } = req.body
    const u = await Astro.findOne({ _id: Id })
    if (!u) {
        throw new ErrorHandler("user not found", 404)
    }
    if (profile) {
        let a = await cloudinary.v2.uploader.upload(profile, { folder: "avatar", })
        u.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }
    await u.save()
    res.status(200).json({ astro: u, success: true })
})
exports.updateAstroPass = catchAsyncErrors(async (req, res) => {
    const { password, Id } = req.body
    const u = await Astro.findOne({ _id: Id })
    if (!u) {
        throw new ErrorHandler("user not found", 404)
    }
    u.password = password
    await u.save()
    res.status(200).json({ success: true })
})

exports.getAstroRequest = catchAsyncErrors(async (req, res) => {
    const astro = await Astro.find()
    res.status(200).json({ astro, success: true })
})

exports.sendAstro = catchAsyncErrors(async (req, res) => {
    const { name, email, number, category, price, languages, country, address, experience, gender, dateOfBirth, dailyHours, platform, onboard, interviewDate, interviewTime, bio, } = req.body
    const html = `<h2>New Astro Application Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Number:</strong> ${number}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
    <p><strong>Daily Hours:</strong> ${dailyHours}</p>
    <p><strong>Platform:</strong> ${platform}</p>
    <p><strong>Onboard:</strong> ${onboard}</p>
    <p><strong>Interview Date:</strong> ${interviewDate}</p>
    <p><strong>Interview Time:</strong> ${interviewTime}</p>
    <p><strong>Bio:</strong> ${bio}</p>`
    sendEmail({
        email: "unzziptruth@gmail.com",
        subject: "New astro Apply cation form",
        html
    })
    sendEmail({
        email: email,
        subject: "Stage two onboarding Unzziptruth",
        html: `
        <h1>Dear ${name},</h1><br/>
        <br/>
        <p>As Unzzip Truth is an International Astrology Chat Application, in which Astrologer will deliver their expertise to International Customer, So it is Important for Our Adviser to reply to Our Client on time with correct communication over the Chat. So We request you to visit typingtest.com and give a 3 Minutes medium level Typing test and Share the Result with Us on specialist@unzziptruth.com or You can reply to this email with test result</p>
        <br/>
        <br/>
        <button style="background-color: yellow;outline: none;border: 1px solid black;border-radius: 4px;padding: 6px 20px;"><a style="font-size: 18px ;font-weight: 700;text-decoration: none;color: black;" href="https://www.typingtest.com/test.html?minutes=3&textfile=mediumText.txt&mode=sent&result_url=result.html&bt=0&darkmode=1">Test Now</a></button>
         <br/>
        <br/>
        <p>With Regards, </p>
        <img src="https://unzziptruth.com/static/media/logo.165a057d88fc92272d3a.png" style="width:200px; height:auto;" alt="logo">
        `
    })
    sendEmail({
        email: email,
        subject: "Form has been successfully submitted",
        html: `
        <h1>Dear ${name},</h1><br/>
        <br/>
        <p>Thank You for applying to Unzzip Truth. Here is how our onboarding process works. You will be assigned an Onboarding specialist within 5 working days. Post that, we generally take 2-3 days to make your profile live! We will initiate a chat window for you to get you all the updates about the following process. On final selection (post third round), we will send you a congratulatory mail as feedback and ensure further process.</p>
        <ol>
        <li>Profile level shortlisting (Current stage)</li>
        <li>First round (Typing Test)</li>
        <li>Second round (Audio/Video call)</li>
        <li>Document verification (on selection only)</li>
        <li>Astrologer Application Training session (on selection only)</li>
        <li>Sample customer call/chat (on selection only)</li>
        <li>Your profile is live!</li>
        </ol>
        <br/>
        <br/>
        <p>With Regards, </p>
        <img src="https://unzziptruth.com/static/media/logo.165a057d88fc92272d3a.png" style="width:200px; height:auto;" alt="logo">
        `
    })
    res.status(200).json({ success: true, message: "applied successfully" })
})



exports.tokenLogin = catchAsyncErrors(async (req, res) => {
    const { token } = req.query
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken)
    if (!verifyToken) {
        return new ErrorHandler("Session is Expired", 401)
    }
    const user = await Astro.findOne({ _id: verifyToken.id })
    if (!user) {
        return new ErrorHandler("Session is Expired", 401)
    }
    console.log(user)
    res.status(200).json({
        success: true,
        astro: user,
    })
})
exports.StartAstro = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const a = await log.create({ astro: id, type: "WorkTime" })
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: "Online" })
    res.status(200).json({
        success: true,
        astro,
        a,
    })
})
exports.StopAstro = catchAsyncErrors(async (req, res) => {
    const { id, workId } = req.body
    const b = new Date()
    const a = await log.findOneAndUpdate({ _id: workId }, { endAt: b }, { new: true })
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: "Offline" })
    res.status(200).json({
        success: true,
        astro,
    })
})
exports.BusyAstro = catchAsyncErrors(async (req, res) => {
    const { id, work } = req.body
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: work ? work : "Busy" })
    res.status(200).json({
        success: true,
    })
})
exports.Search = catchAsyncErrors(async (req, res) => {
    const { q } = req.body
    const astrologers = await Astro.find({
        $and: [
            { $text: { $search: q } },
        ]
    })
    res.status(200).json({
        success: true,
        astrologers,
    })

})
exports.updateAstro = catchAsyncErrors(async (req, res) => {
    const { id, ...updates } = req.body
    const a = await Astro.findOneAndUpdate({ _id: id }, { $set: updates }, { new: true })
    res.status(200).json({ success: true, astrologer: a })
})
exports.deleteAstro = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    await Astro.findOneAndDelete({ _id: id })
    res.status(200).json({ success: true })
})
exports.GetAstrologer = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const astrologer = await Astro.findOne({ _id: id }).populate("reviews.user", "name")
    res.status(200).json({ success: true, astrologer })
})
exports.Astro = catchAsyncErrors(async (req, res) => {
})
