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

require("dotenv").config();

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);

router.post("/blogs", createBlog);

router.put("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

router.get("/stats", getStats);

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.MASTER_NAME &&
        password === process.env.MASTER_PASSWORD
    ) {
        res.status(200).send("Success");
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;
