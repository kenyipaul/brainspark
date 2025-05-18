import { Outlet } from "react-router-dom"

export default function AdminDashboard() {
    return (
        <div id="admin_dashboard">
            <h1>Admin Dashboard</h1>
            <Outlet />
        </div>
    )
}