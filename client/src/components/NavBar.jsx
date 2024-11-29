import { IoHome } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";
import Proptypes from "prop-types";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

const NavBar = ({ theme, setTheme }) => {
    return (
        <div className="nav">
            <h2>Blogo</h2>
            <ul className="actions">
                <li>
                    {/* <NavLink to="/"> */}
                    <button onClick={() => {}}>
                        <IoHome />
                    </button>
                    {/* </NavLink> */}
                </li>
                <li>
                    <button
                        className="theme"
                        type="button"
                        onClick={() => {
                            document.body.className = !theme ? "dark" : "";
                            localStorage.setItem("theme", !theme);
                            setTheme((old) => !old);
                        }}
                    >
                        {theme ? <LuSunMoon /> : <FaRegMoon />}
                    </button>
                </li>
            </ul>
        </div>
    );
};

NavBar.propTypes = {
    theme: Proptypes.bool.isRequired,
    setTheme: Proptypes.func.isRequired,
};

export default NavBar;
