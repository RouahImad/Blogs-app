import axios from "axios";
import PropTypes from "prop-types";
import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import love from "../assets/love-letter.png";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const LikedPageLoader = async (likedBlogsId) => {
    try {
        const response = await axios.get(
            "https://server-three-lac.vercel.app/blogs"
        );
        if (response.status === 200) {
            return response.data.filter((blog) =>
                likedBlogsId.includes(blog.id)
            );
        }
        return [];
    } catch (error) {
        console.log("Error fetching data");
        console.error(error);
        throw error;
    }
};

const LikedPage = ({ likedBlogsId, handleLike, handleShare }) => {
    const [loading, setLoading] = useState(true);

    const data = useLoaderData();
    const [blogs, setBlogs] = useState(data?.length ? data : []);
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
        <div className="likePage">
            <h2>Saved Blogs 💖</h2>
            <div className="row">
                {loading ? (
                    <SkeletonList />
                ) : (
                    <div className="blogs">
                        {blogs?.length ? (
                            blogs.map((blog) => (
                                <Blog
                                    key={blog.id}
                                    title={blog.title}
                                    content={blog.content}
                                    posted={blog.post_date}
                                    liked={likedBlogsId.includes(blog.id)}
                                    handleLike={() => handleLike(blog.id)}
                                    handleShare={() =>
                                        handleShare(
                                            blog.id,
                                            blog.title,
                                            blog.content
                                        )
                                    }
                                    handleClick={() => handleClick(blog.id)}
                                />
                            ))
                        ) : (
                            <div className="emptyLiked">
                                <img src={love} alt="love" loading="lazy" />
                                <span>
                                    Please like some blogs to see them here.
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

LikedPage.propTypes = {
    likedBlogsId: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default LikedPage;
