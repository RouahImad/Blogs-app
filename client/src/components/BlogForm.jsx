import PropTypes from "prop-types";
import { useState } from "react";
import LinksForm from "./LinksForm";
import Message from "./Message";

const BlogForm = ({ links, setLinks, handleCreate }) => {
    const [addLink, setAddLink] = useState(false);
    const [message, setMessage] = useState({});

    return (
        <div className="adminForm">
            <h2>Create Blog 📝</h2>
            <form
                onSubmit={async (e) => {
                    const res = await handleCreate(e);

                    setMessage(res);
                }}
            >
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
                    <button
                        type="button"
                        onClick={() => setAddLink(!addLink)}
                        name="validate link"
                        aria-label="Add links"
                    >
                        Add Links
                    </button>
                </div>
                <button
                    className="create"
                    type="submit"
                    name="create blog"
                    aria-label="Create blog"
                >
                    Create
                </button>
            </form>
            {addLink && (
                <LinksForm setLinks={setLinks} setAddLink={setAddLink} />
            )}
            {message?.status && (
                <Message status={message.status} message={message.message} />
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
