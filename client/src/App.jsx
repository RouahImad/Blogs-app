import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./utils/auth";
import routes from "./utils/routes";
import { create } from "./utils/api";
import { ToolsProvider } from "./utils/toolsStore";
import LoadingFallback from "./components/LoadingFallback";

const App = () => {
    const [theme, setTheme] = useState("light");

    const [links, setLinks] = useState([]);

    const handleCreate = async (event) => {
        event.preventDefault();

        const title = event.target.title.value.trim();
        const content = event.target.content.value.trim();

        try {
            const response = await create({
                title,
                content,
                links: JSON.stringify(links),
            });
            event.target.reset();
            return { status: 200, message: response.data.message };
        } catch (error) {
            console.error(error.response.data);
            return {
                status: error.response.status,
                message: error.response.data.error,
            };
        }
    };

    const router = routes(links, setLinks, handleCreate, theme, setTheme);

    return (
        <Suspense fallback={<LoadingFallback />}>
            <ToolsProvider>
                <AuthProvider>
                    <RouterProvider
                        router={router}
                        fallbackElement={<LoadingFallback />}
                    />
                </AuthProvider>
            </ToolsProvider>
        </Suspense>
    );
};

export default App;
