import axios from "axios";
import BlogRow from "./BlogRow";
import { useLoaderData } from "react-router-dom";
import soon from "../assets/work-in-progress.png";
import SkeletonList from "./SkeletonList";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import Message from "./Message";

export const AdminBLogsLoader = async () => {
    try {
        const response = await axios.get(
            "https://server-io2gmraao-imadrouahs-projects.vercel.app/blogs"
        );
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (err) {
        console.log("Error fetching blog data");
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
            const response = await axios.delete(
                `https://server-io2gmraao-imadrouahs-projects.vercel.app/blogs/${id}`
            );
            if (response.status === 204) {
                setBlogs(blogs.filter((blog) => blog.id !== id));
                setMessage({
                    status: 204,
                    message: "Blog deleted successfully",
                });
            }
        } catch (err) {
            console.log("Error deleting blog");
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
        if (
            JSON.stringify(editData) !== JSON.stringify(originalBlog) &&
            Object.keys(editData).length !== 0
        ) {
            try {
                const response = await axios.put(
                    `https://server-io2gmraao-imadrouahs-projects.vercel.app/blogs/${editData.id}`,
                    editData
                );
                if (response.status === 201) {
                    setBlogs(
                        blogs.map((blog) =>
                            blog.id === editData.id ? editData : blog
                        )
                    );
                    setMessage({
                        status: 201,
                        message: response.data.message,
                    });
                }
                setClickedEdit(false);
            } catch (err) {
                console.log("Error updating blog");
                console.error(err.response);
                setMessage({
                    status: err.response.status,
                    message: err.response.data.error,
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
            {message?.status && (
                <Message status={message.status} message={message.message} />
            )}
        </div>
    );
};

export default AdminBlogs;
