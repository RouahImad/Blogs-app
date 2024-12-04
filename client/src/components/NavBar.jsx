import { IoHome } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { GoLog } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import Proptypes from "prop-types";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };
    return (
        <div className="nav">
            <h2>Blogo</h2>
            <ul className="actions">
                <li>
                    <NavLink to="/">
                        <IoHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/blog">
                        <GoLog />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/likes">
                        <FaHeart />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search">
                        <IoSearchSharp />
                    </NavLink>
                </li>
                <li>
                    <button
                        className="theme"
                        type="button"
                        onClick={toggleTheme}
                        name="theme"
                    >
                        {theme == "dark" ? <LuSunMoon /> : <FaRegMoon />}
                    </button>
                </li>
            </ul>
        </div>
    );
};

NavBar.propTypes = {
    theme: Proptypes.string.isRequired,
    setTheme: Proptypes.func.isRequired,
};

export default NavBar;
