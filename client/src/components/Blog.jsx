import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const Blog = ({
    id,
    title,
    content,
    posted,
    handleLike,
    handleShare,
    handleClick,
}) => {
    const liked = false;
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
                        {liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button
                        onClick={() => {
                            handleShare(id, title, content);
                        }}
                    >
                        <FaShare />
                    </button>
                </div>
            </div>
        </div>
    );
};

Blog.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    posted: PropTypes.string.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
    handleClick: PropTypes.func,
};

export default Blog;
