import { useRouteError } from "react-router-dom";
import ErrorImage from "../assets/error.png";
import "../styles/errorLog.css";

const ErrorLog = () => {
    const error = useRouteError();
    return (
        <div className="errorMessage">
            <img src={ErrorImage} alt="Error" loading="lazy" />
            <h2>Oops! something went wrong</h2>
            <p>
                Brace yourself till we get the error fixed, You may also{" "}
                <span
                    className="refresh"
                    aria-label="refresh the page"
                    onClick={() => window.location.reload()}
                >
                    refresh
                </span>{" "}
                the page or try again later
            </p>
            {error && <p className="errorDetails">{error.message}</p>}
        </div>
    );
};

export default ErrorLog;
