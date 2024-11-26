import PropTypes from "prop-types";

const Blog = ({ title, content, posted }) => {
    return (
        <div className="blog">
            <div className="info">
                <span>{title}</span>
                <span>{posted}</span>
            </div>
            <p>{content}</p>
        </div>
    );
};

Blog.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    posted: PropTypes.string.isRequired,
};

export default Blog;
