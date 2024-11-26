import Blog from "./Blog";
import PropTypes from "prop-types";
import "../styles/Blogs.css";

const Blogs = ({ blogs }) => {
    return (
        <div className="blogs">
            {blogs.length ? (
                blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        title={blog.title}
                        content={blog.content}
                        posted={blog.post_date}
                    />
                ))
            ) : (
                <span>More blogs are coming stay tunned!</span>
            )}
        </div>
    );
};

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
};

export default Blogs;
