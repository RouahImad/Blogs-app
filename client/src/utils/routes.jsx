import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "../components/NotFound";
import ErrorLog from "../components/ErrorLog";
import RequireAuth from "../components/RequireAuth";

import { AdminBLogsLoader } from "../components/AdminBlogs";
import Root, { RootLoader } from "../pages/Root";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import { StatsLoader } from "../components/AdminStats";

const BlogPage = lazy(() => import("../pages/BlogPage"));
const BlogForm = lazy(() => import("../components/BlogForm"));
const AdminBlogs = lazy(() => import("../components/AdminBlogs"));
const AdminStats = lazy(() => import("../components/AdminStats"));
const Login = lazy(() => import("../components/Login"));
const BlogsList = lazy(() => import("../pages/BlogsList"));
const FavPage = lazy(() => import("../pages/FavPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));

const routes = (links, setLinks, handleCreate, theme, setTheme) => {
    return createBrowserRouter([
        {
            path: "/",
            element: <Root theme={theme ?? "light"} setTheme={setTheme} />,
            loader: RootLoader,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "blogs",
                    element: (
                        <Suspense
                            fallback={
                                <div className="loaderContainer">
                                    <div className="loaderText">
                                        loading<span>...</span>
                                    </div>
                                </div>
                            }
                        >
                            <BlogsList />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "blogs/:id",
                    element: (
                        <Suspense
                            fallback={
                                <div className="loaderContainer">
                                    <div className="loaderText">
                                        loading<span>...</span>
                                    </div>
                                </div>
                            }
                        >
                            <BlogPage />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "search",
                    element: (
                        <Suspense
                            fallback={
                                <div className="loaderContainer">
                                    <div className="loaderText">
                                        loading<span>...</span>
                                    </div>
                                </div>
                            }
                        >
                            <SearchPage />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "favorites",
                    element: (
                        <Suspense
                            fallback={
                                <div className="loaderContainer">
                                    <div className="loaderText">
                                        loading<span>...</span>
                                    </div>
                                </div>
                            }
                        >
                            <FavPage />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "admin",
                    element: (
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    ),
                    errorElement: <ErrorLog />,
                    children: [
                        {
                            index: true,
                            element: (
                                <Suspense
                                    fallback={<div className="spinner"></div>}
                                >
                                    <AdminStats />
                                </Suspense>
                            ),
                            loader: StatsLoader,
                        },
                        {
                            path: "create",
                            element: (
                                <Suspense
                                    fallback={<div className="spinner"></div>}
                                >
                                    <BlogForm
                                        links={links}
                                        setLinks={setLinks}
                                        handleCreate={handleCreate}
                                    />
                                </Suspense>
                            ),
                        },
                        {
                            path: "blogs",
                            element: (
                                <Suspense
                                    fallback={<div className="spinner"></div>}
                                >
                                    <AdminBlogs />
                                </Suspense>
                            ),
                            loader: AdminBLogsLoader,
                        },
                    ],
                },
                {
                    path: "login",
                    element: (
                        <Suspense fallback={<div className="spinner"></div>}>
                            <Login />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                    errorElement: <ErrorLog />,
                },
            ],
        },
    ]);
};

export default routes;
