import SearchBar from "./SearchBar";
import home_icon from '../assets/home.svg';
import user_icon from '../assets/user.svg';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><img src={home_icon} className="icon navicon"/></li>
                <div className="nav-right">
                    <li><SearchBar></SearchBar></li>
                    <li><img src={user_icon} className="icon navicon"/></li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
