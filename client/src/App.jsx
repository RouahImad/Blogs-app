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
import Admin from "./pages/admin";
import BlogForm from "./components/BlogForm";
import AdminBlogs from "./components/adminBlogs";
import AdminStats from "./components/AdminStats";
import AdminProfile from "./components/AdminProfile";

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

    const handleCreate = (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

        console.log(title, content);
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
                <Route path="admin" element={<Admin />}>
                    <Route index element={<AdminStats />} />
                    <Route
                        path="create"
                        element={<BlogForm handleCreate={handleCreate} />}
                    />
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="profile" element={<AdminProfile />} />
                </Route>
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
