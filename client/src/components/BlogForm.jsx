import PropTypes from "prop-types";
import { useState } from "react";
import LinksForm from "./LinksForm";

const BlogForm = ({ links, setLinks, handleCreate }) => {
    const [addLink, setAddLink] = useState(false);

    return (
        <div className="adminForm">
            <h2>Create Blog 📝</h2>
            <form onSubmit={handleCreate}>
                <div className="inputBox">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter blog's title"
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="content">Content: </label>
                    <textarea
                        name="content"
                        id="content"
                        rows="8"
                        placeholder="Enter blog's content"
                        required
                    ></textarea>
                </div>
                <div className="inputBox">
                    <label htmlFor="links">Links: ({links.length})</label>
                    <button type="button" onClick={() => setAddLink(!addLink)}>
                        Add Links
                    </button>
                </div>
                <button className="create" type="submit">
                    Create
                </button>
            </form>
            {addLink && (
                <LinksForm setLinks={setLinks} setAddLink={setAddLink} />
            )}
        </div>
    );
};

BlogForm.propTypes = {
    links: PropTypes.array.isRequired,
    setLinks: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
};

export default BlogForm;
