import "./sass/main.scss";
import About from "./views/about";
import Home from "./views/home";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import AdminDashboard from "./views/admin-dashboard";
import UserDashboard from "./views/user-dashboard";

export default function App() {

    return (
        <div id="app">

            <Router>
                <Navbar />
                <main id="main-page-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About /> } />
                    <Route path="/login" element={<Login /> } />
                    <Route path="/register" element={<Register /> } />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Routes>
                </main>
            </Router>
            

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

    return (
        <nav id="navbar">
            <section>
                <h1>BRAIN<span>SPARK</span></h1>
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