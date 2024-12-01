import "../styles/categories.css";
import PropTypes from "prop-types";

const CategoriesNav = ({ categorieClick, setFilterType }) => {
    return (
        <ul className="catagories">
            <li
                className="active"
                onClick={(e) => {
                    setFilterType("all");
                    categorieClick(e);
                }}
            >
                All
            </li>
            <li
                onClick={(e) => {
                    setFilterType("today");
                    categorieClick(e);
                }}
            >
                Today
            </li>
            <li
                onClick={(e) => {
                    setFilterType("with links");
                    categorieClick(e);
                }}
            >
                With links
            </li>
            <li
                onClick={(e) => {
                    setFilterType("without links");
                    categorieClick(e);
                }}
            >
                Without links
            </li>
        </ul>
    );
};

CategoriesNav.propTypes = {
    categorieClick: PropTypes.func.isRequired,
    setFilterType: PropTypes.func.isRequired,
};

export default CategoriesNav;
