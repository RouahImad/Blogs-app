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

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log("Authorized");

        next();
    } else {
        res.status(401).send("Unauthorized");
        console.log("Unauthorized");
    }
};

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.MASTER_NAME &&
        password === process.env.MASTER_PASSWORD
    ) {
        req.session.user = { username };
        res.status(200).send("Success");
    } else {
        res.status(401).send("Wrong credentials");
    }
});

router.get("/loggedin", (req, res) => {
    console.log(req.session);

    if (req.session.user) {
        res.status(200).send("Logged in");
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);

router.post("/blogs", isAuthenticated, createBlog);

router.put("/blogs/:id", isAuthenticated, updateBlog);

router.delete("/blogs/:id", isAuthenticated, deleteBlog);

router.get("/stats", isAuthenticated, getStats);

module.exports = router;
