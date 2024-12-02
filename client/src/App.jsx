import { useEffect, useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import BlogsList, { BlogsLoader } from "./pages/BlogsList";
import BlogPage, { BlogLoader } from "./pages/BlogPage";
import NotFound from "./components/NotFound";
import Root, { RootLoader } from "./pages/Root";
import Home from "./pages/Home";
import ErrorLog from "./components/ErrorLog";
import LikedPage, { LikedPageLoader } from "./pages/LikedPage";
import Admin from "./pages/Admin";
import BlogForm from "./components/BlogForm";
import AdminBlogs, { AdminBLogsLoader } from "./components/AdminBlogs";
import AdminStats from "./components/AdminStats";
import axios from "axios";
import Login from "./components/Login";

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
            const response = await axios.post("/blogs", {
                title,
                content,
                links: JSON.stringify(links),
            });
            event.target.reset();
            return { status: 200, message: response.data.message };
        } catch (error) {
            console.log("Error fetching data");
            console.error(error);
            return {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
    };

    const [loggedIn, setLoggedIn] = useState(false); // change to false later

    useEffect(() => {
        console.log("Checking login status");

        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const response = await axios.get("/loggedIn");
            if (response.status === 200) {
                setLoggedIn(true);
            }
        } catch (error) {
            console.log("Error fetching data");
            console.error(error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();

        try {
            const response = await axios.post("/login", {
                username,
                password,
            });

            if (response.status === 200) {
                setLoggedIn(true);
                return { status: 200, message: response.data };
            }
        } catch (error) {
            console.log("Error fetching data");
            console.error(error.response.data);
            return { status: 401, message: error.response.data };
        }
    };

    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={<Root theme={theme} setTheme={setTheme} />}
                loader={RootLoader}
            >
                <Route index element={<Home />} />
                <Route
                    path="blog"
                    element={
                        <BlogsList
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    }
                    loader={BlogsLoader}
                    errorElement={<ErrorLog />}
                />
                <Route
                    path="blog/:id"
                    element={
                        <BlogPage
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    }
                    loader={BlogLoader}
                    errorElement={<ErrorLog />}
                />
                <Route
                    path="likes"
                    element={
                        <LikedPage
                            likedBlogsId={likedBlogsId}
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    }
                    loader={() => LikedPageLoader(likedBlogsId)}
                    errorElement={<ErrorLog />}
                />
                {loggedIn ? (
                    <Route
                        path="admin"
                        element={<Admin />}
                        errorElement={<ErrorLog />}
                    >
                        <Route index element={<AdminStats />} />
                        <Route
                            path="create"
                            element={
                                <BlogForm
                                    links={links}
                                    setLinks={setLinks}
                                    handleCreate={handleCreate}
                                />
                            }
                        />
                        <Route
                            path="blogs"
                            element={<AdminBlogs />}
                            loader={AdminBLogsLoader}
                        />
                    </Route>
                ) : (
                    <Route
                        path="admin"
                        element={<Login handleLogin={handleLogin} />}
                        errorElement={<ErrorLog />}
                    />
                )}
                <Route
                    path="*"
                    element={<NotFound />}
                    errorElement={<ErrorLog />}
                />
            </Route>
        )
    );

    return <RouterProvider router={routes} />;
};

export default App;
