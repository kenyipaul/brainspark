import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Home from "../views/home";
import Login from "../views/login";
import Register from "../views/register";
import About from "../views/about";
import Courses from "../views/courses";
import UserDashboard from "../views/user-dashboard";
import AdminDashboard from "../views/admin-dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/courses",
                element: <Courses />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/admin",
                element: <AdminDashboard />,
                children: [
                    {
                        path: "/admin/",
                        element: <>ACCOUNT</>
                    },
                    {
                        path: "/admin/courses",
                        element: <>COURSES</>
                    },
                    {
                        path: "/admin/students",
                        element: <>STUDENTS</>
                    },
                    {
                        path: "/admin/security",
                        element: <>SECURITY</>
                    }
                ]
            },
            {
                path: "/user",
                element: <UserDashboard />,
                children: [
                    {
                        path: "/user/",
                        element: <>ACCOUNT</>
                    },
                    {
                        path: "/user/mycourses",
                        element: <>MY COURSES</>
                    },
                    {
                        path: "/user/security",
                        element: <>SECURITY</>
                    }
                ]
            }
        ]
    }
])