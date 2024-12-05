import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

const handleChange = (e, setEditData, editData) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
};

const EditForm = ({ editData, setEditData, setClickedEdit, handleUpdate }) => {
    return (
        <div className="edit">
            <IoMdClose
                className="close"
                onClick={() => setClickedEdit(false)}
            />

            <form onSubmit={handleUpdate}>
                <div className="inputBox">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={editData.title}
                        placeholder="Enter blog title"
                        onChange={(e) => handleChange(e, setEditData, editData)}
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="content">Content: </label>
                    <textarea
                        name="content"
                        id="content"
                        value={editData.content}
                        placeholder="Enter blog content"
                        rows={8}
                        onChange={(e) => handleChange(e, setEditData, editData)}
                        required
                    />
                </div>

                <button className="create" type="submit" name="update">
                    Update
                </button>
            </form>
        </div>
    );
};

EditForm.propTypes = {
    editData: PropTypes.object.isRequired,
    setEditData: PropTypes.func.isRequired,
    setClickedEdit: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default EditForm;
