import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import love from "../assets/love-letter.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTools } from "../utils/toolsStore";

const FavPage = () => {
    const {
        loadingBlogsm,
        loadBlogs,
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

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        loadBlogs().then((blogs) => {
            setBlogs(blogs.filter((blog) => likedBlogsId.includes(blog.id)));
        });
    }, [likedBlogsId, loadBlogs]);

    const navigate = useNavigate();

    return (
        <div className="likePage">
            <h2>Saved Blogs 💖</h2>
            <div className="row">
                {loadingBlogsm ? (
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
                                        navigate(`/blogs/${blog.id}`);
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

export default FavPage;
