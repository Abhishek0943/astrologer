const express = require("express");
const { getBlog, addBlog, deleteBlog, updateBlog, myBlog, Blog } = require("../controllers/blogController");
const router = express.Router();
router.route("/blog").get(getBlog).post(addBlog).put(updateBlog).delete(deleteBlog)
router.route("/blog/:id").get(Blog)




module.exports = router;