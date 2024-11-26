import { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import axios from "axios";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        axios
            .get("/blogs")
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data");

                console.error(error);
            });

        if (localStorage.getItem("theme") == "true") {
            setTheme(true);
        }
    }, []);

    return (
        <div>
            <NavBar theme={theme} setTheme={setTheme} />
            <Blogs blogs={blogs} />
        </div>
    );
};

export default App;
