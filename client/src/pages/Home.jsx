import { useNavigate } from "react-router-dom";
import welcome from "../assets/welcome.png";
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="content">
                <h1>Welcome to Blogo 👋</h1>
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
