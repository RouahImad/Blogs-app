import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, Suspense } from "react";
import { useTools } from "../utils/toolsStore";
import LoadingBar from "react-top-loading-bar";
import LoadingFallback from "../components/LoadingFallback";

const Root = () => {
    const data = useLoaderData();
    const { theme, setTheme, progress } = useTools();

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
                waitingTime={400}
            />
            <NavBar theme={theme} setTheme={setTheme} />
            <Suspense fallback={<LoadingFallback />}>
                <Outlet />
            </Suspense>
        </div>
    );
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
