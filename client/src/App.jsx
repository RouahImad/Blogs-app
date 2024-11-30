import { useState } from "react";
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
import LikedPage from "./pages/LikedPage";

const App = () => {
    const [theme, setTheme] = useState("light");

    const handleLike = (id) => {
        console.log("Liked", id);
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
                            handleLike={handleLike}
                            handleShare={handleShare}
                        />
                    }
                    loader={BlogLoader}
                    errorElement={<ErrorLog />}
                />
                <Route path="likes" element={<LikedPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return <RouterProvider router={routes} />;
};

export default App;
