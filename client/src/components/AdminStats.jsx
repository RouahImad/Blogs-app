import { useLoaderData } from "react-router-dom";
import { getStats } from "../utils/api";
import "../styles/admin.css";

export const StatsLoader = async () => {
    try {
        const response = await getStats();
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response.status !== 401) {
            console.error(error);
        }
    }
};

const AdminStats = () => {
    const { totalBlogs, todayBlogs, blogsWithLinks, blogsWithoutLinks } =
        useLoaderData() || {
            totalBlogs: 0,
            todayBlogs: 0,
            blogsWithLinks: 0,
            blogsWithoutLinks: 0,
        };

    return (
        <div className="adminStats">
            <h2>Admin Stats</h2>
            <div className="statsContainer">
                <div className="statsRow">
                    <span>Total Blogs: {totalBlogs}</span>
                    <span>Today&apos;s Blogs: {todayBlogs}</span>
                </div>
                <div className="statsRow">
                    <div className="graph">
                        <span
                            className="withLinks"
                            style={{
                                width: `${
                                    (blogsWithLinks / totalBlogs) * 100
                                }%`,
                            }}
                            title="Blogs with links"
                        ></span>
                        <span
                            className="withoutLinks"
                            style={{
                                width: `${
                                    (blogsWithoutLinks / totalBlogs) * 100
                                }%`,
                            }}
                            title="Blogs without links"
                        ></span>
                    </div>
                    <span>Blogs with link: {blogsWithLinks}</span>
                    <span>Blogs without link: {blogsWithoutLinks}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
