import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import "../styles/admin.css";

const Admin = () => {
    return (
        <div className="admin">
            <AdminSideBar />
            <div className="adminContent">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
