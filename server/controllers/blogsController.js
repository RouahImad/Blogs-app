const blogModel = require("../modules/blogsModel");

const getBlogs = async (req, res) => {
    // const { page, limit } = req.query;
    // const offset = page ? (page - 1) * limit : 0;
    // const limit = limit ? limit : 10;
    const { search } = req.query;

    try {
        const blogs = await blogModel.getBlogs(search ?? null);

        if (blogs.length > 0) {
            res.status(200).json(blogs);
        } else {
            res.status(200).json([]);
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
            res.status(200).json(blog);
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const createBlog = async (req, res) => {
    const { title, content, links } = req.body;

    if (!title && !content) {
        res.status(400).json({ error: "Please provide title and content" });
        return;
    }
    try {
        const results = await blogModel.createBlog(
            title,
            content,
            links ? links : null
        );
        if (results) {
            res.status(200).json({ message: "Blog created successfully" });
        } else {
            res.status(400).json({ error: "Blog not created" });
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
            res.status(201).json({ message: "Blog updated successfully" });
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "An error occurred while updating the blog",
        });
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
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

const getStats = async (req, res) => {
    try {
        const stats = await blogModel.getStats();
        if (stats) {
            res.status(200).json(stats);
        } else {
            res.status(404).json({ error: "Stats not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sorry there is an error in server" });
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getStats,
};
