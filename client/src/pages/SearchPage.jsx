import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { getAll } from "../utils/api";
import soon from "../assets/work-in-progress.png";
import "../styles/search.css";
import Blog from "../components/Blog";

const SearchPage = () => {
    const handleSearch = () => {
        if (search) {
            console.log(search);

            getAll(search)
                .then((res) => {
                    console.log(res.data);
                    setResults(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    return (
        <div className="search blogs">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search for a blog"
                    onSubmit={handleSearch}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <IoSearchSharp />
                </button>
            </div>
            <div className="searchResults">
                {results.length ? (
                    results.map((result) => (
                        <Blog key={result.id} {...result} />
                    ))
                ) : (
                    <div className="emptyBlogs">
                        <img src={soon} alt="work in progress" loading="lazy" />
                        <span>More blogs are coming stay tunned!</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
