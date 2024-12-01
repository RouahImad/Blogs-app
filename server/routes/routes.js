const express = require("express");
const router = express.Router();
const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getStats,
} = require("../controllers/blogsController");

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);

router.post("/blogs", createBlog);

router.put("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

router.get("/stats", getStats);

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    if (username === "admin" && password === "pass") {
        res.status(200).send("Success");
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;
