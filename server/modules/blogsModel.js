const pool = require("../configure/db");

const getBlogs = async () => {
    const blogs = await pool.query(
        "SELECT id, title, content, links, DATE_FORMAT(post_date, '%Y-%m-%d') as post_date FROM blogs"
    );

    return blogs[0];
};
const getBlog = async (id) => {
    const blog = await pool.query(
        "SELECT id, title, content, links, DATE_FORMAT(post_date, '%Y-%m-%d') as post_date FROM blogs WHERE id = ?",
        [id]
    );

    return blog[0][0];
};

const createBlog = async (title, content, links) => {
    const today = new Date().toISOString().split("T")[0];

    let sql = "INSERT INTO blogs (title, content, post_date) VALUES (?, ?, ?)";
    let values = [title, content, today.toString()];

    if (links?.length) {
        sql =
            "INSERT INTO blogs (title, content, links, post_date) VALUES (?, ?, ?, ?)";
        values = [title, content, links, today.toString()];
    }

    const res = await pool.query(sql, values);

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

const getStats = async () => {
    const [totalBlogsResult, todayBlogsResult] = await Promise.all([
        pool.query("SELECT COUNT(*) as totalBlogs FROM blogs"),
        pool.query(
            "SELECT COUNT(*) as todayBlogs FROM blogs WHERE post_date = CURDATE()"
        ),
    ]);

    const stats = {
        totalBlogs: totalBlogsResult[0][0].totalBlogs,
        todayBlogs: todayBlogsResult[0][0].todayBlogs,
    };

    return stats;
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getStats,
};
