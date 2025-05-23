import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Home from "../views/home";
import Login from "../views/login";
import Register from "../views/register";
import About from "../views/about";
import Courses from "../views/courses";
import UserDashboard from "../views/user-dashboard";
import AdminDashboard from "../views/admin-dashboard";
import Account from "../views/user-dashboard/account";
import Mycourses from "../views/user-dashboard/myCourses";
import Security from "../views/user-dashboard/security";
import ModuleContent from "../views/user-dashboard/Modules";

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
                        element: <Account/>
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
                        element: <Security/>
                    }
                ]
            },
            {
                path: "/user",
                element: <UserDashboard />,
                children: [
                    {
                        path: "/user/",
                        element: <Account/>
                    },
                    {
                        path: "/user/mycourses",
                        element: <Mycourses/>
                    },
                    {
                        path: "/user/security",
                        element: <Security/>
                    }
                ]
            },
            {
                path: "/Course/vidoes",
                element: <ModuleContent/>
            }
        ]
    }
])
