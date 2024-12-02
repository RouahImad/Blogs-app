import PropTypes from "prop-types";
import { useEffect } from "react";

const Message = ({ status, message }) => {
    console.log(status, message);

    useEffect(() => {
        const msg = document.querySelector(".message");
        msg.classList.add("show");

        const timer = setTimeout(() => {
            msg.classList.remove("show");
        }, 1800);
        return () => clearTimeout(timer);
    });

    return (
        <div
            className={`message ${
                status?.toString().includes(20) ? "" : "error"
            }`}
        >
            <span>{message}</span>
        </div>
    );
};

Message.propTypes = {
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
};

export default Message;
