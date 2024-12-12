import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ToolsStore = createContext();

export const ToolsProvider = ({ children }) => {
    const [likedBlogsId, setLikedBlogsId] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const handleNavClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        setProgress(0);
        setProgress(40);
    };

    useEffect(() => {
        const likedBlogs = localStorage.getItem("likedBlogs");

        if (likedBlogs) {
            setLikedBlogsId(JSON.parse(likedBlogs));
        }
    }, []);

    const handleShare = (id, title, content) => {
        if (navigator.share) {
            const shareData = {
                title: title,
                text: content,
                url: window.location.origin + "/blog/" + id,
            };

            navigator.share(shareData);
        }
    };

    const handleLike = (id) => {
        const likedBlogs = localStorage.getItem("likedBlogs");
        if (likedBlogs) {
            const temp = JSON.parse(likedBlogs);
            if (temp.includes(id)) {
                const newLikedBlogsId = temp.filter((blogId) => blogId !== id);
                setLikedBlogsId(newLikedBlogsId);
                localStorage.setItem(
                    "likedBlogs",
                    JSON.stringify(newLikedBlogsId)
                );
            } else {
                const newLikedBlogsId = [...temp, id];
                setLikedBlogsId(newLikedBlogsId);
                localStorage.setItem(
                    "likedBlogs",
                    JSON.stringify(newLikedBlogsId)
                );
            }
        } else {
            const newLikedBlogsId = [id];
            setLikedBlogsId(newLikedBlogsId);
            localStorage.setItem("likedBlogs", JSON.stringify(newLikedBlogsId));
        }
    };

    return (
        <ToolsStore.Provider
            value={{
                handleNavClick,
                progress,
                blogs,
                setBlogs,
                setProgress,
                isLoading,
                setIsLoading,
                likedBlogsId,
                setLikedBlogsId,
                handleLike,
                handleShare,
            }}
        >
            {children}
        </ToolsStore.Provider>
    );
};

ToolsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useTools = () => {
    return useContext(ToolsStore);
};
