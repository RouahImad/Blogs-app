import SkeletonBlog from "./SkeletonBlog";
import PropTypes from "prop-types";
import "../styles/skeleton.css";

const SkeletonList = ({ count = 3 }) => {
    return (
        <div className="skeletons">
            {[...Array(count)].map((_, index) => (
                <SkeletonBlog key={index} />
            ))}
        </div>
    );
};

SkeletonList.propTypes = {
    count: PropTypes.number,
};

export default SkeletonList;
