import Axios from "axios"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const login = () => {
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.");
            return;
        }


        Axios({
            method: "POST",
            url: "http://localhost:5112/login",
            data: {
                Email: email,
                Password: password
            }
        }).then((response) => {
            sessionStorage.setItem("_user_data", JSON.stringify({authorized: true, data: response.data}))
            if (response.data.role === "Admin") {
                alert("Welcome Admin!");
                navigate("/admin")
            } else {
                navigate("/")
            }
        }).catch(() => {
            alert("Incorrect email or password")
        })
    }

    return (
        <div id="form-container">

            <div className="form">
                <h1>Sign In</h1>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={emailRef} id="" />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} id="" />
                </div>

                <p>I don't have an account yet? <Link to="/register">register here</Link></p>

                <button onClick={login}>Log In</button>
            </div>

        </div>
    )
}