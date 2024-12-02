import "../styles/login.css";
import PropTypes from "prop-types";
import Message from "./Message";
import { useState } from "react";

const Login = ({ handleLogin }) => {
    const [message, setMessage] = useState({});

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form
                onSubmit={async (e) => {
                    const res = await handleLogin(e);
                    setMessage(res);
                }}
            >
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
            {message?.status && (
                <Message status={message.status} message={message.message} />
            )}
        </div>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
};

export default Login;
