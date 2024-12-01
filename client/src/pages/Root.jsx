import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Root = ({ theme, setTheme }) => {
    const data = useLoaderData();

    useEffect(() => {
        setTheme(data);
    }, [data]);

    return (
        <div>
            <NavBar theme={theme} setTheme={setTheme} />
            <Outlet />
        </div>
    );
};

Root.propTypes = {
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
};

export default Root;

export const RootLoader = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        document.body.className = storedTheme;
        return storedTheme;
    }
    document.body.className = storedTheme;
    return storedTheme;
};
