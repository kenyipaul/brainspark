import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "../sass/user-dashboard.scss";

export default function UserDashboard() {
    const location = useLocation();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logout = () => {
      sessionStorage.removeItem("_user_data")
      window.location.href = "/"
    }

    return (
        <div className="user-dashboard">
          <aside className="user-dashboard-content">
              <ul>
                <li className={location.pathname == "/user" ? "active" : ""}><Link to="/user/">Account</Link></li>
                <li className={location.pathname == "/user/mycourses" ? "active" : ""}><Link to="/user/mycourses">My Courses</Link></li>
                <li className={location.pathname == "/user/security" ? "active" : ""}><Link to="/user/security">Security</Link></li>
                <li className={location.pathname == "/user/logout" ? "active" : ""}><p onClick={() => setIsLoggedOut(true)}>Log Out</p></li>
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
          <main className="user-dashboard-main">
            <Outlet />
          </main>
      </div>
    )
}
