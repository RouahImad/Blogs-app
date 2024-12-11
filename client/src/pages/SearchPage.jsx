import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { getAll } from "../utils/api";
import soon from "../assets/work-in-progress.png";
import "../styles/search.css";
import Blog from "../components/Blog";
import { useTools } from "../utils/toolsStore";

const SearchPage = () => {
    const handleSearch = () => {
        if (search) {
            getAll(search)
                .then((res) => {
                    setResults(res.data);
                })
                .catch((err) => {
                    throw err;
                });
        }
    };

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const { setIsLoading, setProgress, likedBlogsId, handleLike, handleShare } =
        useTools();

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
        <div className="search ">
            <div className="searchBar">
                <input
                    type="search"
                    placeholder="Search for a blog"
                    value={search}
                    onKeyUp={(e) =>
                        e.target.value && e.key === "Enter" && handleSearch()
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="input blogs search"
                />
                <button onClick={handleSearch} aria-label="search blogs">
                    <IoSearchSharp />
                </button>
            </div>
            <div className="searchResults blogs">
                {results.length ? (
                    results.map((result) => (
                        <Blog
                            key={result.id}
                            title={result.title}
                            content={result.content}
                            posted={result.post_date}
                            liked={likedBlogsId.includes(result.id)}
                            handleLike={() => handleLike(result.id)}
                            handleShare={() =>
                                handleShare(
                                    result.id,
                                    result.title,
                                    result.content
                                )
                            }
                        />
                    ))
                ) : (
                    <div className="emptyBlogs">
                        <img src={soon} alt="work in progress" loading="lazy" />
                        <span>
                            No blog found. Please try another search term.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
