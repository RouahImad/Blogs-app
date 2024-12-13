import { SiMake } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { ImStatsBars } from "react-icons/im";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
const AdminSideBar = () => {
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu) {
            document.querySelector(".adminSideBar").classList.add("open");
        } else {
            document.querySelector(".adminSideBar").classList.remove("open");
        }
    }, [menu]);

    return (
        <div className="adminSideBar">
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
