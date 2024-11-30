import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";

const Root = ({ theme, setTheme }) => {
    theme = useLoaderData();

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
    if (localStorage.getItem("theme") === "dark") {
        document.body.className = "dark";
        return "dark";
    }
    document.body.className = "light";
    return "light";
};
