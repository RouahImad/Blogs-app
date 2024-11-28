import ErrorImage from "../assets/error.png";
import "../styles/errorLog.css";

const ErrorLog = () => {
    return (
        <div className="errorMessage">
            <img src={ErrorImage} alt="Error" loading="lazy" />
            <h1>Oops! something went wrong</h1>
            <p>
                Brace yourself till we get the error fixed, You may also refresh
                the page or try again later
            </p>
        </div>
    );
};

export default ErrorLog;
