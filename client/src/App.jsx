import { useEffect, useState } from "react";
// import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import axios from "axios";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import Blog, { BlogLoader } from "./pages/Blog";
import NotFound from "./pages/NotFound";

const App = () => {
    const [blogs, setBlogs] = useState({});
    const [theme, setTheme] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer;
        axios
            .get("/blogs")
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data");
                console.error(error);
            })
            .finally(() => {
                timer = setTimeout(() => {
                    setLoading(false);
                }, 700);
            });

        if (localStorage.getItem("theme") == "true") {
            setTheme(true);
            document.body.className = "dark";
        }

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const routes = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<Blogs blogs={blogs} loading={loading} />}
                />
                <Route
                    path="/blog/:id"
                    element={<Blog />}
                    loader={BlogLoader}
                />
                <Route path="/*" element={<NotFound />} />
            </>
        )
    );

    return (
        <div>
            <NavBar theme={theme} setTheme={setTheme} />
            <RouterProvider router={routes} />
        </div>
    );
};

export default App;
