import { useEffect, useMemo, useState, lazy } from "react";

import { useLoaderData, useNavigate } from "react-router-dom";
const Blog = lazy(() => import("../components/Blog"));
import SkeletonList from "../components/SkeletonList";
import CategoriesNav from "../components/CategoriesNav";

import soon from "../assets/work-in-progress.png";
import { getAll } from "../utils/api";
import { useTools } from "../utils/toolsStore";

export const BlogsLoader = async () => {
    try {
        const response = await getAll();
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error(error.response);
        throw error;
    }
};

const BlogsList = () => {
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

    const [loading, setLoading] = useState(true);

    const data = useLoaderData();

    useEffect(() => {}, []);

    useEffect(() => {
        setBlogs(data?.length ? data : []);
    }, [data, setBlogs]);

    const [filterType, setFilterType] = useState("all");

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

    useEffect(() => {
        setLoading(true);
        let timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [filterType]);

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
            {loading ? (
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
                                    navigate(`/blog/${blog.id}`);
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
