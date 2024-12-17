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
