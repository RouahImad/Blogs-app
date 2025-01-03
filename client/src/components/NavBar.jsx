import { IoHome } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import { GoLog } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useTools } from "../utils/toolsStore";
import { useEffect, useRef, useState } from "react";

const NavBar = () => {
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const { theme, setTheme, isLoading, setProgress } = useTools();
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
        <div className="nav" aria-label="Main navigation">
            <h2>iMadLog</h2>
            <ul className="actions">
                <li>
                    <NavLink
                        to="/"
                        aria-label="Home page"
                        onClick={() => handleNavClick("/")}
                    >
                        <IoHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/blogs"
                        aria-label="blogs page"
                        onClick={() => handleNavClick("/blogs")}
                    >
                        <GoLog />
                    </NavLink>
                </li>

                <li className="searchIcon">
                    <NavLink
                        to="/search"
                        aria-label="Search blogs"
                        onClick={() => handleNavClick("/search")}
                    >
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
                    <ul
                        className={`submenu ${submenu ? "open" : ""}`}
                        aria-label="submenu navigation"
                    >
                        <li onClick={() => handleNavClick("/favorites")}>
                            <NavLink
                                to="/favorites"
                                aria-label="Liked blogs page"
                            >
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
                                {theme == "dark" ? (
                                    <LuSunMoon />
                                ) : (
                                    <FaRegMoon />
                                )}
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
