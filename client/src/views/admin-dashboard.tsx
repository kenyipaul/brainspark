import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import "../sass/admin.scss";
import "../sass/user-dashboard.scss";
import { useEffect, useState } from "react";

interface UserType {
  authorized: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    // const [isLoggedOut, setIsLoggedOut] = useState(false);

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
        if (confirm("Are you sure you want to log out?")) {
            sessionStorage.removeItem("_user_data")
            window.location.href = "/"
        }
    }

    useEffect(() => {
        if (user && !user.authorized) {
            alert("You are not authorized to access this page. Redirecting to home page.");
            navigate("/")
        }
    }, [location, user]);

    return (
        <div id="admin_dashboard" >
            <aside>
                <ul>
                    <li className={location.pathname == "/admin" ? "active" : ""}><Link to="/admin/">Account</Link></li>
                    <li className={location.pathname == "/admin/courses" ? "active" : ""}><Link to="/admin/courses">Courses</Link></li>
                    <li className={location.pathname == "/admin/students" ? "active" : ""}><Link to="/admin/students">Students</Link></li>
                    <li className={location.pathname == "/admin/security" ? "active" : ""}><Link to="/admin/security">Security</Link></li>
                    <li className={location.pathname == "/user/logout" ? "active" : ""} onClick={logout}>Log Out</li>
                    {/* <li className={location.pathname == "/user/logout" ? "active" : ""} onClick={() => setIsLoggedOut(true)}>Log Out</li> */}
                    {/* {
                        isLoggedOut && (
                            <div className="logout-message">
                            <h1>Are you sure you want to log out?</h1>
                            <div className="answer-buttons">
                                <button onClick={logout}>Yes</button>
                                <button onClick={() => setIsLoggedOut(false)}>No</button>
                            </div>
                            </div>
                        )
                    } */}
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    )
}