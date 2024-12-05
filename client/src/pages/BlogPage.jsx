import { useLoaderData } from "react-router-dom";
import Blog from "../components/Blog";
import PropTypes from "prop-types";
import { getOne } from "../utils/api";

const BlogPage = ({ likedBlogsId, handleLike, handleShare }) => {
    const data = useLoaderData();
    const links = JSON.parse(data.links);

    return (
        <div className="blogPage">
            <div className="links">
                {links?.map(({ name, url }, i) => (
                    <a key={i} href={url} className="link" target="_blank">
                        {name}
                    </a>
                ))}
            </div>
            <Blog
                id={data.id}
                title={data.title}
                content={data.content}
                posted={data.post_date}
                liked={likedBlogsId.includes(data.id)}
                handleLike={() => handleLike(data.id)}
                handleShare={handleShare}
            />
        </div>
    );
};

BlogPage.propTypes = {
    likedBlogsId: PropTypes.array.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
};

export default BlogPage;

export const BlogLoader = async ({ params }) => {
    const { id } = params;
    try {
        const res = await getOne(id);

        return res.data;
    } catch (error) {
        console.error(error.response);
        throw error;
    }
};
