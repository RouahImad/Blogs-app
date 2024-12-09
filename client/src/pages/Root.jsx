import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import { useEffect, Suspense } from "react";
import { useTools } from "../utils/toolsStore";
import LoadingBar from "react-top-loading-bar";

const Root = ({ theme, setTheme }) => {
    const data = useLoaderData();
    const { progress } = useTools();

    useEffect(() => {
        setTheme(data);
    }, [data, setTheme]);

    return (
        <div>
            <LoadingBar
                color="#8fe2d3"
                progress={progress}
                shadow={true}
                height={3}
                // transitionTime={50}
                waitingTime={400}
            />
            <NavBar theme={theme} setTheme={setTheme} />
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
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
