const UpdateForm = () => {
    return (
        <div>
            <h1>Update Blog</h1>
            <form>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" rows="10"></textarea>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
