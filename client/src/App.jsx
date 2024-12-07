import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./utils/auth";
import routes from "./utils/routes";
import { create } from "./utils/api";

const App = () => {
    const [theme, setTheme] = useState("light");
    const [likedBlogsId, setLikedBlogsId] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("likedBlogs")) {
            setLikedBlogsId(JSON.parse(localStorage.getItem("likedBlogs")));
        }
    }, []);

    const handleLike = (id) => {
        if (localStorage.getItem("likedBlogs")) {
            const temp = JSON.parse(localStorage.getItem("likedBlogs"));
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

    const [links, setLinks] = useState([]);

    const handleCreate = async (event) => {
        event.preventDefault();

        const title = event.target.title.value.trim();
        const content = event.target.content.value.trim();

        try {
            const response = await create({
                title,
                content,
                links: JSON.stringify(links),
            });
            event.target.reset();
            return { status: 200, message: response.data.message };
        } catch (error) {
            console.error(error.response.data);
            return {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
    };

    const router = routes(
        likedBlogsId,
        handleLike,
        handleShare,
        links,
        setLinks,
        handleCreate,
        theme,
        setTheme
    );

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
