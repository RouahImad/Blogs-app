const pool = require("../configure/db");

const getBlogs = async () => {
    const blogs = await pool.query(
        "SELECT id, title, content, DATE_FORMAT(post_date, '%Y-%m-%d') as post_date FROM blogs"
    );

    return blogs[0];
};
const getBlog = async (id) => {
    const blog = await pool.query(
        "SELECT id, title, content, DATE_FORMAT(post_date, '%Y-%m-%d') as post_date FROM blogs WHERE id = ?",
        [id]
    );

    return blog[0][0];
};

const createBlog = async (title, content) => {
    const today = new Date().toISOString().split("T")[0];

    const res = await pool.query(
        "INSERT INTO blogs (title, content, post_date) VALUES (?, ?, ?)",
        [title, content, today.toString()]
    );

    return res[0].affectedRows ? true : false;
};

const updateBlog = async (id, title, content) => {
    const res = await pool.query(
        "UPDATE blogs SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
    );
    return res[0].affectedRows ? true : false;
};

const deleteBlog = async (id) => {
    const res = await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    return res[0].affectedRows ? true : false;
};

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
