import SkeletonBlog from "./SkeletonBlog";
import "../styles/skeleton.css";

const SkeletonList = () => {
    return (
        <div className="skeletons">
            <SkeletonBlog />
            <SkeletonBlog />
            <SkeletonBlog />
        </div>
    );
};

export default SkeletonList;
