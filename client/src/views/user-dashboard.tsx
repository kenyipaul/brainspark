import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../sass/user-dashboard.scss";

interface UserType {
  authorized: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function UserDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

      const [user, setUser] = useState<UserType>({
          authorized: false,
          data: { id: "", firstName: "", lastName: "", email: "" },
      });
  
      useEffect(() => {
          let storedData: unknown = sessionStorage.getItem("_user_data");
  
          if (storedData !== null) {
          storedData = JSON.parse(storedData as string);
          setUser(storedData);
          }
      }, [location]);

    const logout = () => {
      sessionStorage.removeItem("_user_data")
      window.location.href = "/"
    }

     useEffect(() => {
        if (user && !user.authorized) {
            alert("You are not authorized to access this page. Redirecting to home page.");
            navigate("/")
        }
    }, [location, user]);

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
