import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import love from "../assets/love-letter.png";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAll } from "../utils/api";
import { useTools } from "../utils/toolsStore";

export const LikedPageLoader = async () => {
    try {
        const likedBlogsId =
            JSON.parse(localStorage.getItem("likedBlogs")) || [];
        const response = await getAll();
        if (response.status === 200) {
            return response.data.filter((blog) =>
                likedBlogsId.includes(blog.id)
            );
        }
        return [];
    } catch (error) {
        console.error(error.response);
        throw error;
    }
};

const LikedPage = () => {
    const {
        blogs,
        setBlogs,
        isLoading,
        setIsLoading,
        handleNavClick,
        setProgress,
        likedBlogsId,
        handleLike,
        handleShare,
    } = useTools();
    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(100);
            setIsLoading(false);
        }, 100);

        return () => {
            clearTimeout(timer);
            setProgress(0);
            setIsLoading(false);
        };
    }, [setProgress, setIsLoading]);

    const [loading, setLoading] = useState(true);

    const data = useLoaderData();

    useEffect(() => {
        setBlogs(data?.length ? data : []);
        setBlogs(data);
        setLoading(false);
    }, [data, setBlogs]);

    const navigate = useNavigate();

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
                                    handleClick={() => {
                                        if (isLoading) return;
                                        navigate(`/blog/${blog.id}`);
                                        handleNavClick();
                                    }}
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

export default LikedPage;
