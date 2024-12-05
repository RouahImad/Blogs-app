import { useState } from "react";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useAuth } from "../utils/auth";

const Login = () => {
    const [message, setMessage] = useState({});
    const navigate = useNavigate();

    const { handleLogin } = useAuth();

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form
                onSubmit={async (e) => {
                    const res = await handleLogin(e);
                    setMessage(res);
                    if (res.status === 200) {
                        navigate("/admin", { replace: true });
                    }
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
                <button className="login" type="submit" name="login">
                    Login
                </button>
            </form>
            {message?.status && (
                <Message status={message.status} message={message.message} />
            )}
        </div>
    );
};

export default Login;
