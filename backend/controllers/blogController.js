const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Blog = require("../models/blogModel");
const cloudinary = require("cloudinary");
exports.Blog = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findOne({ _id: id })
    res.status(200).json({ blog, success: true })
})
exports.addBlog = catchAsyncErrors(async (req, res) => {
    const { title, img, blog, user, category } = req.body
    let a = await cloudinary.v2.uploader.upload(img, { folder: "avatar", })
    const b = await Blog.create({
        title, blog, category, createdBy: user, user, banner: {
            public_id: a.public_id,
            url: a.secure_url
        }
    })
    res.status(201).json({
        success: true
    })
});
exports.getBlog = catchAsyncErrors(async (req, res) => {
    const blogs = await Blog.find()
    res.status(201).json({
        blogs,
        success: true
    })
})
exports.deleteBlog = catchAsyncErrors(async (req, res) => {
    const { id } = req.query
    await Blog.findByIdAndDelete(id)
    res.status(201).json({
        success: true
    })
})


exports.updateBlog = catchAsyncErrors(async (req, res) => {
    const { id, img,...blog } = req.body
    if (img) {
        let a = await cloudinary.v2.uploader.upload(img, { folder: "avatar", })
        await Blog.findByIdAndUpdate(id, {
            banner: {
                public_id: a.public_id,
                url: a.secure_url
            }
        })
    }
    await Blog.findByIdAndUpdate(id, { ...blog })
    res.status(201).json({
        success: true
    })
})