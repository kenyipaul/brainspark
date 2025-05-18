import "./sass/main.scss";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";


export default function App() {

    return (
        <div id="app">
            <Navbar />
            <main id="main-page-content">
                <Outlet />
            </main>
        </div>
    )
}

export function Footer() {
    return (
        <footer>
            <p>© 2025 Galtia SynergyTech. All Rights Reserved.</p>
        </footer>
    )
}

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <nav id="navbar">
            <section>
                <h1 onClick={() => navigate("/")}>BRAIN<span>SPARK</span></h1>
                <ul>
                    <li className={location.pathname == "/" ? "active" : ""}><Link to="/">Home</Link></li>
                    <li className={location.pathname == "/courses" ? "active" : ""}><Link to="/courses">Courses</Link></li>
                    <li className={location.pathname == "/about" ? "active" : ""}><Link to="/about">About Us</Link></li>
                </ul>
            </section>

            <section>
                <button><Link to="/login">Sign In</Link></button>
                <button><Link to="/register">Register</Link></button>
            </section>
        </nav>
    )
}