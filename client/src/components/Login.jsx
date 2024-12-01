import "../styles/login.css";
import PropTypes from "prop-types";

const Login = ({ handleLogin }) => {
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="inputBox">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button className="login" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};

export default Login;
