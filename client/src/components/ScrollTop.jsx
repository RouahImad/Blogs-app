import { useEffect, useState, useCallback } from "react";
import { GoArrowUp } from "react-icons/go";

const ScrollTop = () => {
    const [visible, setVisible] = useState(false);

    const scrollToTop = useCallback(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        let timeoutId;

        const scrollHandler = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const limit = window.innerHeight / 2;
                setVisible(window.scrollY >= limit);
            }, 100);
        };

        window.addEventListener("scroll", scrollHandler, { passive: true });
        return () => {
            window.removeEventListener("scroll", scrollHandler);
            clearTimeout(timeoutId);
        };
    }, []);

    if (!visible) return;

    return (
        <button
            className="scroll-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            type="button"
        >
            <GoArrowUp aria-hidden="true" />
        </button>
    );
};

export default ScrollTop;
