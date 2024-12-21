import { useParams } from "react-router-dom";
import Blog from "../components/Blog";
import { useTools } from "../utils/toolsStore";
import { lazy, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import LoadingFallback from "../components/LoadingFallback";
const NotFound = lazy(() => import("../components/NotFound"));

const BlogPage = () => {
    const { id } = useParams();

    const {
        loadBlog,
        setIsLoading,
        setProgress,
        likedBlogsId,
        handleLike,
        handleShare,
    } = useTools();

    const [blog, setBlog] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [isLoadingBlog, setIsLoadingBlog] = useState(true);

    useEffect(() => {
        const getBlog = async () => {
            setIsLoadingBlog(true);
            try {
                const data = await loadBlog(parseInt(id));

                if (!data) {
                    setNotFound(true);
                } else {
                    setBlog(data);
                }
            } catch (err) {
                if (err.response.status === 500)
                    console.error("Sorry there is an error in server");

                setNotFound(true);
            } finally {
                setIsLoadingBlog(false);
            }
        };
        getBlog();
    }, [id, setIsLoadingBlog, loadBlog]);

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

    if (isLoadingBlog) {
        return <LoadingFallback />;
    }

    if (notFound) {
        return <NotFound />;
    }

    const links = blog.links ? JSON.parse(blog.links) : [];

    return (
        <div className="blogPage">
            <button
                className="backBtn"
                role="button"
                aria-label="go back"
                onClick={() => {
                    window.history.back();
                }}
            >
                <IoArrowBack />
                <span>Back</span>{" "}
            </button>
            <div className="links">
                {links?.map(({ title, url }, i) => (
                    <a key={i} href={url} className="link" target="_blank">
                        {title}
                    </a>
                ))}
            </div>
            <Blog
                id={blog.id}
                title={blog.title}
                content={blog.content}
                posted={blog.post_date}
                liked={likedBlogsId.includes(blog.id)}
                handleLike={() => handleLike(blog.id)}
                handleShare={handleShare}
            />
        </div>
    );
};

export default BlogPage;
