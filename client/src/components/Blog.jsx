import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Blog = ({ id, title, content, posted }) => {
    const navigate = useNavigate();
    return (
        <div className="blog" onClick={() => navigate("/blog/" + id)}>
            <div className="info">
                <span>{title}</span>
                <span>{posted}</span>
            </div>
            <p>{content}</p>
        </div>
    );
};

Blog.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    posted: PropTypes.string.isRequired,
};

export default Blog;
