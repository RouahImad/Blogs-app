import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Blog = () => {
    const { data } = useLoaderData();

    return (
        <div className="container">
            <div className="blog">
                <div className="info">
                    <span>{data.title}</span>
                    <span>{data.post_date}</span>
                </div>
                <p>{data.content}</p>
            </div>
        </div>
    );
};

export default Blog;

export const BlogLoader = async ({ params }) => {
    const { id } = params;
    const res = await axios.get("/blogs/" + id);
    return res.data;
};
