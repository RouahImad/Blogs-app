import { useLoaderData } from "react-router-dom";
import Blog from "../components/Blog";
import { getOne } from "../utils/api";
import { useTools } from "../utils/toolsStore";

const BlogPage = () => {
    const { likedBlogsId, handleLike, handleShare } = useTools();

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
