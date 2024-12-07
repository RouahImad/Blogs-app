import "../styles/search.css";

const SearchPage = () => {
    return (
        <div className="search">
            <div className="searchBar">
                <input type="text" placeholder="Search for a blog" />
            </div>
            <div className="searchResults"></div>
        </div>
    );
};

export default SearchPage;
