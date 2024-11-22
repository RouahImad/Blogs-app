const express = require("express");
const router = express.Router();
const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogsController");

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);

router.post("/blogs", createBlog);

router.put("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

module.exports = router;
