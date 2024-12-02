import Blog from "../components/Blog";
import SkeletonList from "../components/SkeletonList";
import soon from "../assets/work-in-progress.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import CategoriesNav from "../components/CategoriesNav";

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

const BlogsList = ({ likedBlogsId, handleLike, handleShare }) => {
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
        }
    }, [data]);

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
                                handleClick={() => handleClick(blog.id)}
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

BlogsList.propTypes = {
    likedBlogsId: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default BlogsList;
