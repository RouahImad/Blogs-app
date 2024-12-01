import { SiMake } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { ImStatsBars } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const AdminSideBar = () => {
    return (
        <div className="adminSideBar">
            <NavLink to="/admin" end>
                <ImStatsBars />
                <span>Stats</span>
            </NavLink>
            <NavLink to="/admin/create" end>
                <IoIosCreate />
                <span>Create Blog</span>
            </NavLink>
            <NavLink to="/admin/blogs" end>
                <SiMake />
                <span>Manage Blogs</span>
            </NavLink>
            <NavLink to="/admin/profile" end>
                <FaUser />
                <span>Profile</span>
            </NavLink>
        </div>
    );
};

export default AdminSideBar;
