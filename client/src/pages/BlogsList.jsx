import { useEffect, useMemo, useState, lazy } from "react";

import { useNavigate } from "react-router-dom";
const Blog = lazy(() => import("../components/Blog"));
import SkeletonList from "../components/SkeletonList";
import CategoriesNav from "../components/CategoriesNav";

import soon from "../assets/work-in-progress.png";
import { useTools } from "../utils/toolsStore";

const BlogsList = () => {
    const {
        loadingBlogs,
        loadBlogs,
        blogs,
        isLoading,
        setIsLoading,
        handleNavClick,
        setProgress,
        likedBlogsId,
        handleLike,
        handleShare,
    } = useTools();

    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        loadBlogs();
    }, [loadBlogs]);

    const filteredBlogs = useMemo(() => {
        if (filterType === "all") {
            return blogs;
        } else if (filterType === "today") {
            return blogs.filter(
                (blog) =>
                    new Date(blog.post_date).toLocaleDateString() ===
                    new Date().toLocaleDateString()
            );
        } else if (filterType === "with links") {
            return blogs.filter((blog) => JSON.parse(blog.links).length > 0);
        } else if (filterType === "without links") {
            return blogs.filter((blog) => JSON.parse(blog.links).length === 0);
        }
    }, [blogs, filterType]);

    const categorieClick = (event) => {
        document
            .querySelectorAll(".active")
            .forEach((el) => el.classList.remove("active"));

        event.target.classList.add("active");
    };

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

    const navigate = useNavigate();

    return (
        <>
            <CategoriesNav
                categorieClick={categorieClick}
                setFilterType={setFilterType}
            />
            {loadingBlogs ? (
                <SkeletonList />
            ) : (
                <div className="blogs">
                    {filteredBlogs?.length ? (
                        filteredBlogs.map((blog) => (
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
                                links={blog.links ? JSON.parse(blog.links) : []}
                            />
                        ))
                    ) : (
                        <div className="emptyBlogs">
                            <img
                                src={soon}
                                alt="work in progress"
                                loading="lazy"
                            />
                            <span>More blogs are coming stay tunned!</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default BlogsList;
