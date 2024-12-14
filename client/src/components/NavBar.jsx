import { IoHome } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { GoLog } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/navbar.css";
import { useTools } from "../utils/toolsStore";
import { useEffect, useRef, useState } from "react";

const NavBar = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    const { isLoading, setProgress } = useTools();
    const location = useLocation();

    const handleNavClick = (path) => {
        if (isLoading || location.pathname === path) return;
        setProgress(0);
        setTimeout(() => {
            setProgress(40);
        }, 50);
    };

    const [submenu, setSubmenu] = useState(false);

    const menuButtonRef = useRef(null);

    useEffect(() => {
        if (!submenu) return;
        const handleClickOutside = (e) => {
            const path = e.composedPath();

            const isClickedInside = path.some(
                (element) =>
                    element instanceof Node &&
                    menuButtonRef.current?.contains(element)
            );

            if (!isClickedInside) {
                setSubmenu(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [submenu]);

    return (
        <div className="nav">
            <h2>iMadLog</h2>
            <ul className="actions">
                <li onClick={() => handleNavClick("/")}>
                    <NavLink to="/" aria-label="Home page">
                        <IoHome />
                    </NavLink>
                </li>
                <li onClick={() => handleNavClick("/blog")}>
                    <NavLink to="/blog" aria-label="blogs page">
                        <GoLog />
                    </NavLink>
                </li>

                <li
                    className="searchIcon"
                    onClick={() => handleNavClick("/search")}
                >
                    <NavLink to="/search" aria-label="Search blogs">
                        <IoSearchSharp />
                    </NavLink>
                </li>

                <li ref={menuButtonRef}>
                    <button
                        className="menu"
                        type="button"
                        onClick={() => setSubmenu(!submenu)}
                        name="menu"
                        aria-label="Toggle menu"
                        aria-expanded={submenu}
                        aria-controls="submenu"
                    >
                        {submenu ? <IoClose /> : <IoMenu />}
                    </button>
                </li>
                <div className={`submenu ${submenu ? "open" : ""}`} role="menu">
                    <li onClick={() => handleNavClick("/favorites")}>
                        <NavLink to="/favorites" aria-label="Liked blogs page">
                            <FaHeart />
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
                </div>
            </ul>
        </div>
    );
};

NavBar.propTypes = {
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
};

export default NavBar;
