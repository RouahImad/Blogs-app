import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { checkLogin, login } from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        console.log("Checking login status");

        try {
            const response = await checkLogin("/loggedin");
            if (response.status === 200) {
                setIsLoggedIn(true);
                return true;
            } else {
                setIsLoggedIn(false);
                return false;
            }
        } catch (err) {
            console.error(err.response.data);
            setIsLoggedIn(false);
            return false;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();

        try {
            const response = await login({
                username,
                password,
            });

            if (response.status === 200) {
                setIsLoggedIn(true);
                return { status: 200, message: response.data };
            }
        } catch (error) {
            console.error(error.response.data);
            return { status: 401, message: error.response.data };
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, checkLoginStatus, handleLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.any,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
