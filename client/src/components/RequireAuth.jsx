import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    const { isLoggedIn, checkLoginStatus } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyLoginStatus = async () => {
            const status = await checkLoginStatus();
            if (!status) {
                navigate("/login", { replace: true });
            } else {
                setLoading(false);
            }
        };

        if (!isLoggedIn) {
            verifyLoginStatus();
        } else {
            setLoading(false);
        }
    }, [checkLoginStatus, navigate, isLoggedIn]);

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return children;
};

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RequireAuth;

// The RequireAuth component is a higher-order component that checks if the user is logged in.
//  If the user is not logged in, the component redirects the user to the login page.
//  If the user is logged in, the component renders the child component that is passed to it as a prop.
