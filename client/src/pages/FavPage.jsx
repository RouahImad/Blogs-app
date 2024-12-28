import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import love from "../assets/love-letter.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTools } from "../utils/toolsStore";
import ScrollTop from "../components/ScrollTop";

const FavPage = () => {
    const {
        loadingBlogs,
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

    if (loadingBlogs) {
        return (
            <div className="likePage">
                <h2>Saved Blogs 💖</h2>
                <div className="row">
                    <SkeletonList count={3} />
                </div>
            </div>
        );
    }
    if (!loadingBlogs && blogs.length === 0) {
        return (
            <div className="likePage empty">
                <h2>No Saved Blogs Yet 💔</h2>
                <div className="emptyLiked">
                    <img src={love} alt="love" loading="lazy" />
                    <span>
                        Start liking blogs to see them here!{" "}
                        <span
                            className="browseLink"
                            role="button"
                            aria-label="Browse Blogs"
                            onClick={() => navigate("/blogs")}
                        >
                            Browse Blogs
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="likePage">
            <h2>Saved Blogs 💖</h2>
            <div className="row">
                <div className="blogs">
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            title={blog.title}
                            content={blog.content}
                            posted={blog.post_date}
                            liked={likedBlogsId.includes(blog.id)}
                            handleLike={() => handleLike(blog.id)}
                            handleShare={() =>
                                handleShare(blog.id, blog.title, blog.content)
                            }
                            handleClick={() => {
                                if (isLoading) return;
                                navigate(`/blogs/${blog.id}`);
                                handleNavClick();
                            }}
                            links={blog.links ? JSON.parse(blog.links) : []}
                        />
                    ))}
                </div>
            </div>
            <ScrollTop />
        </div>
    );
};

export default FavPage;
