import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Blog from "../components/Blog";
import PropTypes from "prop-types";

const BlogPage = ({ handleLike, handleShare }) => {
    const data = useLoaderData();

    return (
        <div className="container">
            notice a single blog post
            <Blog
                id={data.id}
                title={data.title}
                content={data.content}
                posted={data.post_date}
                handleLike={handleLike}
                handleShare={handleShare}
            />
        </div>
    );
};

BlogPage.propTypes = {
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default BlogPage;

export const BlogLoader = async ({ params }) => {
    const { id } = params;
    try {
        const res = await axios.get("/blogs/" + id);
        return res.data;
    } catch (error) {
        console.log("Error fetching blog data");
        console.error(error);
        throw error;
    }
};
