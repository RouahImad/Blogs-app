import { IoHome } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { GoLog } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
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
                    <NavLink to="/" aria-label="Home page">
                        <IoHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/blog" aria-label="blogs page">
                        <GoLog />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/likes" aria-label="Liked blogs page">
                        <FaHeart />
                    </NavLink>
                </li>
                <li className="searchIcon">
                    <NavLink to="/search" aria-label="Search blogs">
                        <IoSearchSharp />
                    </NavLink>
                </li>
                <li>
                    <button
                        className="theme"
                        type="button"
                        onClick={toggleTheme}
                        name="theme"
                        aria-label="Toggle theme"
                    >
                        {theme == "dark" ? <LuSunMoon /> : <FaRegMoon />}
                    </button>
                </li>
            </ul>
        </div>
    );
};

NavBar.propTypes = {
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
};

export default NavBar;
