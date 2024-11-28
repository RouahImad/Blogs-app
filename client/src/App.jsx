import { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import axios from "axios";

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

    return (
        <div>
            <NavBar theme={theme} setTheme={setTheme} />
            <Blogs blogs={blogs} loading={loading} />
        </div>
    );
};

export default App;
