import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const Blog = ({
    title,
    content,
    posted,
    liked,
    handleLike,
    handleShare,
    handleClick,
}) => {
    return (
        <div className="blog">
            <div className="info" onClick={handleClick}>
                <span>{title}</span>
                <span>{posted}</span>
            </div>
            <p>{content}</p>
            <div className="action">
                <div className="links">link</div>
                <div className="box">
                    <button onClick={handleLike}>
                        {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                    <button onClick={handleShare}>
                        <FaShare />
                    </button>
                </div>
            </div>
        </div>
    );
};

Blog.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    posted: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
    handleClick: PropTypes.func,
};

export default Blog;
