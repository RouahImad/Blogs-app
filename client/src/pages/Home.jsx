import { useNavigate } from "react-router-dom";
import welcome from "../assets/welcome.png";
import "../styles/home.css";
import { useEffect } from "react";
import { useTools } from "../utils/toolsStore";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();

    const { setIsLoading, setProgress } = useTools();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setProgress(100);
        }, 100);

        return () => {
            clearTimeout(timer);
            setProgress(0);
            setIsLoading(false);
        };
    }, [setProgress, setIsLoading]);

    return (
        <div className="home">
            <div className="content">
                <h1>Welcome to iMadLog 👋</h1>
                <p>
                    This is a simple blog app where you can read and like my
                    blogs. You can also share the blogs with your friends.{" "}
                    <span
                        className="start-btn"
                        onClick={() => navigate("/blogs")}
                    >
                        Get started
                    </span>
                </p>
                <div className="social">
                    <a
                        href="https://www.facebook.com/imade.rouah"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="facebook"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.instagram.com/the_mad_visionary"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
            <img
                src={welcome}
                alt="Welcome"
                onClick={() => navigate("/admin")}
                loading="lazy"
            />
        </div>
    );
};

export default Home;
