const AdminBlogs = () => {
    return (
        <div className="adminBlogs">
            <h1>Admin Blogs</h1>
            <div className="adminBlogs__list">
                <div className="adminBlogs__item">
                    <h2>Blog Title</h2>
                    <p>Blog Content</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogs;
