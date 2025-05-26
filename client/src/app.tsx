import "./sass/main.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    const [menuState, setMenuState] = useState(false);

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
                <div className="buttons">
                    <button><Link to="/login">Sign In</Link></button>
                    <button><Link to="/register">Register</Link></button>
                </div>

                <AnimatePresence>
                { menuState && <motion.div initial={{translateX: 300}} exit={{translateX: 300}} animate={{translateX: 0}} className="menu">
                    <div>
                        <svg onClick={() => setMenuState(false)} className="closeBtn" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path> </g></svg>
                        <h1>BRAIN<span>SPARK</span></h1>
                        <ul>
                            <li className={location.pathname == "/" ? "active" : ""}><Link to="/">Home</Link></li>
                            <li className={location.pathname == "/courses" ? "active" : ""}><Link to="/courses">Courses</Link></li>
                            <li className={location.pathname == "/about" ? "active" : ""}><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <button><Link to="/login">Sign In</Link></button>
                        <button><Link to="/register">Register</Link></button>
                    </div>
                </motion.div> }
                </AnimatePresence>
            </section>
            <svg onClick={() => setMenuState(!menuState)} className="menuBtn" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </nav>
    )
}