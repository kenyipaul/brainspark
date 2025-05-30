import { Link, Outlet, useLocation } from "react-router-dom";
import "../sass/user-dashboard.scss";

export default function UserDashboard() {
    const location = useLocation();

    return (
        <div className="user-dashboard">
          <aside className="user-dashboard-content">
              <ul>
                <li className={location.pathname == "/user" ? "active" : ""}><Link to="/user/">Account</Link></li>
                <li className={location.pathname == "/user/mycourses" ? "active" : ""}><Link to="/user/mycourses">My Courses</Link></li>
                <li className={location.pathname == "/user/security" ? "active" : ""}><Link to="/user/security">Security</Link></li>
                <li className={location.pathname == "/user/logout" ? "active" : ""}><Link to="/user/logout">Logout</Link></li>
              </ul>
          </aside>
          <main className="user-dashboard-main">
            <Outlet />
          </main>
      </div>
    )
}
