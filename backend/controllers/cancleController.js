const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Cancle = require("../models/cancleModel.js");
exports.addCancle = catchAsyncErrors(async (req, res) => {
    const { astro, reason, user } = req.body
    const a = await Cancle.create({
        astro, reason, user
    })
    console.log(a)
    res.status(201).json({
        success: true
    })
});
exports.getCancle = catchAsyncErrors(async (req, res) => {
    const c = await Cancle.find()
    res.status(201).json({
        c,
        success: true
    })
})
exports.astro = catchAsyncErrors(async (req, res) => {
    try {
        const { id } = req.params
        const a = await Cancle.find({ astro: id }).populate("user", "name")

        res.status(201).json({
            a,
            success: true
        })
    } catch (error) {
        console.log(error)
    }

})
