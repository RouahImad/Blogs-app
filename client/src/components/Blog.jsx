import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

function styledText(text) {
    return text.replace(/<\*\*(.*?)\*\*>/g, "<strong>$1</strong>");
}

const Blog = ({
    title,
    content,
    posted,
    liked,
    handleLike,
    handleShare,
    handleClick,
    links,
}) => {
    return (
        <div className="blog">
            <div className="info" onClick={handleClick}>
                <span>{title}</span>
                <span>
                    {new Date(posted).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                        ? "Today"
                        : posted}
                </span>
            </div>
            <p
                dangerouslySetInnerHTML={{
                    __html: `${styledText(content)}${
                        content.at(-1) == "." ? "" : "."
                    }`,
                }}
            ></p>
            <div className="action">
                <div className="links">
                    {links?.map(({ name, url }, i) => (
                        <a key={i} href={url} className="link" target="_blank">
                            {name}
                        </a>
                    ))}
                </div>
                <div className="box">
                    <button
                        onClick={handleLike}
                        name="like"
                        aria-label="Like this blog"
                    >
                        {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                    <button
                        onClick={handleShare}
                        name="share"
                        aria-label="Share this blog"
                    >
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
    links: PropTypes.array,
};

export default Blog;
