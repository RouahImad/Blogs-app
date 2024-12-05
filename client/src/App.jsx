import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./components/NotFound";
import BlogForm from "./components/BlogForm";
import ErrorLog from "./components/ErrorLog";
import RequireAuth from "./components/RequireAuth";
import AdminBlogs, { AdminBLogsLoader } from "./components/AdminBlogs";
import AdminStats from "./components/AdminStats";
import Login from "./components/Login";

import Root, { RootLoader } from "./pages/Root";
import BlogsList, { BlogsLoader } from "./pages/BlogsList";
import BlogPage, { BlogLoader } from "./pages/BlogPage";
import Home from "./pages/Home";
import LikedPage, { LikedPageLoader } from "./pages/LikedPage";
import Admin from "./pages/Admin";
import SearchPage from "./pages/SearchPage";
import { AuthProvider } from "./utils/auth";
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

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root theme={theme} setTheme={setTheme} />,
            loader: RootLoader,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "blog",
                    element: (
                        <BlogsList
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    ),
                    loader: BlogsLoader,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "blog/:id",
                    element: (
                        <BlogPage
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    ),
                    loader: BlogLoader,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "search",
                    element: <SearchPage />,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "likes",
                    element: (
                        <LikedPage
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    ),
                    loader: () => LikedPageLoader(likedBlogsId),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "admin",
                    element: (
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    ),
                    errorElement: <ErrorLog />,
                    children: [
                        { index: true, element: <AdminStats /> },
                        {
                            path: "create",
                            element: (
                                <BlogForm
                                    links={links}
                                    setLinks={setLinks}
                                    handleCreate={handleCreate}
                                />
                            ),
                        },
                        {
                            path: "blogs",
                            element: <AdminBlogs />,
                            loader: AdminBLogsLoader,
                        },
                    ],
                },
                {
                    path: "login",
                    element: <Login />,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                    errorElement: <ErrorLog />,
                },
            ],
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
