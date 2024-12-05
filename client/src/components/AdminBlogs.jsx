import BlogRow from "./BlogRow";
import { useLoaderData } from "react-router-dom";
import soon from "../assets/work-in-progress.png";
import SkeletonList from "./SkeletonList";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import Message from "./Message";
import { getAll, remove, update } from "../utils/api";

export const AdminBLogsLoader = async () => {
    try {
        const response = await getAll();
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (err) {
        console.error(err.response);
        throw err;
    }
};

const AdminBlogs = () => {
    const data = useLoaderData();
    const [blogs, setBlogs] = useState(data);
    const [loading, setLoading] = useState(true);
    const [clickedEdit, setClickedEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [message, setMessage] = useState({});

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const response = await remove(id);
            if (response.status === 204) {
                setBlogs(blogs.filter((blog) => blog.id !== id));
                setMessage({
                    status: 204,
                    message: "Blog deleted successfully",
                });
            }
        } catch (err) {
            console.error(err.response);
            setMessage({
                status: err.response.status,
                message: err.response.data.error,
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const originalBlog = blogs.find((blog) => blog.id === editData.id);
        const updatedData = {
            ...editData,
            title: editData.title.trim(),
            content: editData.content.trim(),
        };

        if (
            originalBlog &&
            JSON.stringify(updatedData) !== JSON.stringify(originalBlog) &&
            updatedData.title &&
            updatedData.content
        ) {
            try {
                const response = await update(updatedData.id, updatedData);
                if (response.status === 201) {
                    setBlogs(
                        blogs.map((blog) =>
                            blog.id === updatedData.id ? updatedData : blog
                        )
                    );
                    setMessage({
                        status: 201,
                        message: response.data.message,
                    });
                    setClickedEdit(false);
                }
            } catch (err) {
                console.error(err.response);
                setMessage({
                    status: err.response.status,
                    message: err.response.data?.error || err.response.data,
                });
            }
        } else {
            setMessage({
                status: 400,
                message: "No changes made to update",
            });
        }
    };

    return (
        <div className="adminBlogs">
            <h2>Admin Blogs</h2>
            {loading ? (
                <SkeletonList />
            ) : (
                <div className="blogs">
                    {blogs?.length ? (
                        blogs.map((blog) => (
                            <BlogRow
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                setClickedEdit={setClickedEdit}
                                setEditData={() => {
                                    setEditData(blog);
                                }}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="emptyBlogs">
                            <img
                                src={soon}
                                alt="work in progress"
                                loading="lazy"
                            />
                            <span>More blogs are coming stay tunned!</span>
                        </div>
                    )}
                </div>
            )}
            {clickedEdit && (
                <EditForm
                    editData={editData}
                    setEditData={setEditData}
                    setClickedEdit={setClickedEdit}
                    handleUpdate={handleUpdate}
                />
            )}
            {message?.status && <Message {...message} />}
        </div>
    );
};

export default AdminBlogs;
