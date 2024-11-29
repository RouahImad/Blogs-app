import Blog from "./Blog";
import PropTypes from "prop-types";
import SkeletonList from "./SkeletonList";
import ErrorLog from "./ErrorLog";

const Blogs = ({ blogs, loading }) => {
    return (
        <>
            {loading ? (
                <SkeletonList />
            ) : (
                <div className="blogs">
                    {blogs?.data?.length ? (
                        blogs.data.map((blog) => (
                            <Blog
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                posted={blog.post_date}
                            />
                        ))
                    ) : blogs?.data?.length == 0 ? (
                        <span>More blogs are coming stay tunned!</span>
                    ) : (
                        <ErrorLog />
                    )}
                </div>
            )}
        </>
    );
};

Blogs.propTypes = {
    blogs: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Blogs;
