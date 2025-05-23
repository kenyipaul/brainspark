import { Link, Outlet, useLocation } from "react-router-dom"
import "../sass/admin.scss";

export default function AdminDashboard() {
    const location = useLocation();
    return (
        <div id="admin_dashboard" >
            <aside>
                <ul>
                    <li className={location.pathname == "/admin" ? "active" : ""}><Link to="/admin/">Account</Link></li>
                    <li className={location.pathname == "/admin/courses" ? "active" : ""}><Link to="/admin/courses">Courses</Link></li>
                    <li className={location.pathname == "/admin/students" ? "active" : ""}><Link to="/admin/students">Students</Link></li>
                    <li className={location.pathname == "/admin/security" ? "active" : ""}><Link to="/admin/security">Security</Link></li>
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    )
}