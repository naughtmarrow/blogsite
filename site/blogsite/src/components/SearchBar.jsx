import icon from "../assets/search.svg";

function SearchBar() {
    return (
        <form className="search-bar">
            <label htmlFor="search-input">
                <img src={icon} alt="Search Bar" className="icon" />
            </label>
            <input
                type="text"
                id="search-input"
                value="Search..."
                className="search-input"
            />
        </form>
    );
}

export default SearchBar;
