import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

const LinksForm = ({ setLinks, setAddLink }) => {
    return (
        <div className="linkForm">
            <IoMdClose className="close" onClick={() => setAddLink(false)} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const url = e.target.url.value;
                    setLinks((prevLinks) => [...prevLinks, { title, url }]);
                    e.target.reset();
                    setAddLink(false);
                }}
            >
                <div className="inputBox">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter link's title"
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="url">URL: </label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        placeholder="Enter link's URL"
                        required
                    />
                </div>
                <button className="create" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

LinksForm.propTypes = {
    setLinks: PropTypes.func.isRequired,
    setAddLink: PropTypes.func.isRequired,
};

export default LinksForm;
