import { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";

const ScrollTop = () => {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const scrollHandler = () => {
            const limit = window.innerHeight / 2;
            if (window.scrollY >= limit) {
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        };
        scrollHandler();
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    if (!display) return;

    return (
        <div className="scroll-top">
            <button
                className="scrollTop"
                onClick={() => window.scrollTo(0, 0)}
                aria-label="Scroll to top"
            >
                <GoArrowUp />
            </button>
        </div>
    );
};

export default ScrollTop;
