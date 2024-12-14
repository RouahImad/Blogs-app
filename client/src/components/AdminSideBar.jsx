import { SiMake } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { ImStatsBars } from "react-icons/im";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const AdminSideBar = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div className={`adminSideBar${menu ? " open" : ""}`}>
            <div className="contentMenu">
                <NavLink to="/admin" onClick={() => setMenu(!menu)} end>
                    <ImStatsBars />
                    <span>Stats</span>
                </NavLink>
                <NavLink to="/admin/create" onClick={() => setMenu(!menu)} end>
                    <IoIosCreate />
                    <span>Create Blog</span>
                </NavLink>
                <NavLink to="/admin/blogs" onClick={() => setMenu(!menu)} end>
                    <SiMake />
                    <span>Manage Blogs</span>
                </NavLink>
            </div>
            <div className="menuIcon" onClick={() => setMenu(!menu)}>
                {menu ? <IoCloseOutline /> : <IoMenu />}
            </div>
        </div>
    );
};

export default AdminSideBar;
