import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const BlogsLoader = async () => {
    try {
        const response = await axios.get("/blogs");
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.log("Error fetching data");
        console.error(error);
        throw error;
    }
};

const BlogsList = ({ handleLike, handleShare }) => {
    const [loading, setLoading] = useState(true);
    const data = useLoaderData();
    const [blogs, setBlogs] = useState(data.length ? data : []);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/blog/${id}`);
    };

    useEffect(() => {
        if (data) {
            setBlogs(data);
            setLoading(false);
        }
    }, [data]);

    return (
        <>
            {loading ? (
                <SkeletonList />
            ) : (
                <div className="blogs">
                    {blogs?.length ? (
                        blogs.map((blog) => (
                            <Blog
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                posted={blog.post_date}
                                handleLike={handleLike}
                                handleShare={handleShare}
                                handleClick={() => handleClick(blog.id)}
                            />
                        ))
                    ) : (
                        <span>More blogs are coming stay tunned!</span>
                    )}
                </div>
            )}
        </>
    );
};

BlogsList.propTypes = {
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default BlogsList;
