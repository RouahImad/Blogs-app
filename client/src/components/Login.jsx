import { useEffect, useState } from "react";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useAuth } from "../utils/auth";

const Login = () => {
    const [message, setMessage] = useState({});
    const navigate = useNavigate();

    const { handleLogin } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage({});
        }, 1800);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div className="loginContainer">
            <div className="holder">
                <h2>Authentification</h2>
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
                    <button
                        className="login"
                        type="submit"
                        name="login"
                        aria-label="Login"
                    >
                        Login
                    </button>
                </form>
                {message?.status && (
                    <Message
                        status={message.status}
                        message={message.message}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
