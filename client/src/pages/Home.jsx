import { useNavigate } from "react-router-dom";
import welcome from "../assets/welcome.png";
import "../styles/home.css";
import { useEffect } from "react";
import { useTools } from "../utils/toolsStore";

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
                <h1>
                    Welcome to <span>iMadLog</span> 👋
                </h1>
                <p>
                    This is a simple blog app where you can read and like my
                    blogs. You can also share the blogs with your friends.
                </p>
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
