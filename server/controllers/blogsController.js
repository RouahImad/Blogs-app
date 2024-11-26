const blogModel = require("../modules/blogsModel");

const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.getBlogs();

        if (blogs.length > 0) {
            res.status(200).json({ data: blogs });
        } else {
            res.status(200).json({ data: [] });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const getBlog = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Please provide a blog id" });
        return;
    }
    try {
        const blog = await blogModel.getBlog(id);
        if (blog) {
            res.status(200).json({ data: blog });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const createBlog = async (req, res) => {
    const { title, content } = req.body;

    if (!title && !content) {
        res.status(400).json({ error: "Please provide title and content" });
        return;
    }
    try {
        const results = await blogModel.createBlog(title, content);
        if (results) {
            res.status(200).json({ message: "Blog created successfully" });
        } else {
            res.status(400).json({ message: "Blog not created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!id) {
        res.status(400).json({ error: "Please provide blog id" });
        return;
    }
    if (!title || !content) {
        res.status(400).json({ error: "Please provide data to update with" });
        return;
    }
    try {
        const results = await blogModel.updateBlog(id, title, content);
        if (results) {
            res.status(200).json({ message: "Blog updated successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "Please provide blog id" });
        return;
    }
    try {
        const results = await blogModel.deleteBlog(id);
        if (results) {
            res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
