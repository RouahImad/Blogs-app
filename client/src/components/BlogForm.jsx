import PropTypes from "prop-types";

const BlogForm = ({ handleCreate }) => {
    return (
        <div className="adminForm">
            <h1>Create Blog</h1>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" rows="10"></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
};

export default BlogForm;
