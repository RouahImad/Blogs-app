import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";
import "../styles/notFound.css";

const NotFound = () => {
    return (
        <div className="notFound">
            <img src={notFound} alt="Not Found" loading="lazy" />
            <div>
                <h2>Not Found</h2>
                <p>
                    Sorry, the page you are looking for does not exist. Go{" "}
                    <Link to="/">Home</Link>.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
