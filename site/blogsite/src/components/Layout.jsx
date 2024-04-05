import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar></Navbar>
            {children}
        </div>
    );
}

export default Layout;
