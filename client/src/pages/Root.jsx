import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Suspense } from "react";
import { useTools } from "../utils/toolsStore";
import LoadingBar from "react-top-loading-bar";
import LoadingFallback from "../components/LoadingFallback";

import { useEffect } from "react";

export async function RootLoader() {
    const theme = localStorage.getItem("theme") || "light";
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return isDark ? "dark" : theme;
}

const Root = () => {
    const { theme, setTheme, progress } = useTools();
    const loadedTheme = useLoaderData();

    useEffect(() => {
        document.body.className = loadedTheme;
        localStorage.setItem("theme", loadedTheme);
        setTheme(loadedTheme);
    }, [loadedTheme, setTheme]);

    if (theme == null) return <LoadingFallback />;

    return (
        <>
            <LoadingBar
                color="#8fe2d3"
                progress={progress}
                shadow={true}
                height={3}
                waitingTime={400}
            />
            <NavBar />
            <Suspense fallback={<LoadingFallback />}>
                <Outlet />
            </Suspense>
        </>
    );
};

export default Root;
