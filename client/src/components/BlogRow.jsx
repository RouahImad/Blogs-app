import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BlogRow = ({ id, title, setClickedEdit, setEditData, handleDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="blogRow">
            <div onClick={() => navigate("/blog/" + id)}>
                <span>#{id}</span>
                <h2>{title}</h2>
            </div>
            <div>
                <button
                    onClick={() => {
                        setClickedEdit(true);
                        setEditData();
                    }}
                    name="edit"
                    aria-label="Edit blog"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(id)}
                    name="delete"
                    aria-label="Delete blog"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

BlogRow.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    setClickedEdit: PropTypes.func.isRequired,
    setEditData: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default BlogRow;
