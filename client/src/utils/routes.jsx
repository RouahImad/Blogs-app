import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "../components/NotFound";
import ErrorLog from "../components/ErrorLog";
import RequireAuth from "../components/RequireAuth";

import { AdminBLogsLoader } from "../components/AdminBlogs";
import Root, { RootLoader } from "../pages/Root";
import Home from "../pages/Home";
import { BlogsLoader } from "../pages/BlogsList";
import BlogPage, { BlogLoader } from "../pages/BlogPage";
import { LikedPageLoader } from "../pages/LikedPage";
import Admin from "../pages/Admin";

const BlogForm = lazy(() => import("../components/BlogForm"));
const AdminBlogs = lazy(() => import("../components/AdminBlogs"));
const AdminStats = lazy(() => import("../components/AdminStats"));
const Login = lazy(() => import("../components/Login"));
const BlogsList = lazy(() => import("../pages/BlogsList"));
const LikedPage = lazy(() => import("../pages/LikedPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));

const routes = (links, setLinks, handleCreate, theme, setTheme) =>
    createBrowserRouter([
        {
            path: "/",
            element: <Root theme={theme ?? "light"} setTheme={setTheme} />,
            loader: RootLoader,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "blog",
                    element: (
                        <Suspense fallback={<div className="spinner"></div>}>
                            <BlogsList />
                        </Suspense>
                    ),
                    loader: BlogsLoader,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "blog/:id",
                    element: <BlogPage />,
                    loader: BlogLoader,
                    errorElement: <ErrorLog />,
                },
                {
                    path: "search",
                    element: (
                        <Suspense fallback={<div className="spinner"></div>}>
                            <SearchPage />
                        </Suspense>
                    ),
                    errorElement: <ErrorLog />,
                },
                {
                    path: "likes",
                    element: (
                        <Suspense fallback={<div className="spinner"></div>}>
                            <LikedPage />
                        </Suspense>
                    ),
                    loader: () => LikedPageLoader(),
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

export default routes;
