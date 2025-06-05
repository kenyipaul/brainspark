import { Link, Outlet, useLocation } from "react-router-dom"
import "../sass/admin.scss";
import "../sass/user-dashboard.scss";
import { useState } from "react";

export default function AdminDashboard() {
    const location = useLocation();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logout = () => {
        sessionStorage.removeItem("_user_data")
        window.location.href = "/"
    }

    return (
        <div id="admin_dashboard" >
            <aside>
                <ul>
                    <li className={location.pathname == "/admin" ? "active" : ""}><Link to="/admin/">Account</Link></li>
                    <li className={location.pathname == "/admin/courses" ? "active" : ""}><Link to="/admin/courses">Courses</Link></li>
                    <li className={location.pathname == "/admin/students" ? "active" : ""}><Link to="/admin/students">Students</Link></li>
                    <li className={location.pathname == "/admin/security" ? "active" : ""}><Link to="/admin/security">Security</Link></li>
                    <li className={location.pathname == "/user/logout" ? "active" : ""} onClick={() => setIsLoggedOut(true)}>Log Out</li>
                    {
                        isLoggedOut && (
                            <div className="logout-message">
                            <h1>Are you sure you want to log out?</h1>
                            <div className="answer-buttons">
                                <button onClick={logout}>Yes</button>
                                <button onClick={() => setIsLoggedOut(false)}>No</button>
                            </div>
                            </div>
                        )
                    }
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    )
}