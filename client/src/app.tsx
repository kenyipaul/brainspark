import "./sass/main.scss";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


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


