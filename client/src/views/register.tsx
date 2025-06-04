import Axios from "axios"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate();
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const register = () => {

        const firstName = firstNameRef.current!.value;
        const lastName = lastNameRef.current!.value;
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        Axios({
            method: "POST",
            url: "http://localhost:5112/signup",
            data: {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password
            }
        }).then(() => {
            if (confirm("Signup was successful, would you like to proceed to login?")) {
                navigate("/login")
            } else {
                firstNameRef.current!.value = ""
                lastNameRef.current!.value = ""
                emailRef.current!.value = ""
                passwordRef.current!.value = ""
            }
        })
    }

    return (
        <div id="form-container">

            <div className="form">
                <h1>Create Account</h1>

                <div className="input-area-group">
                    <div className="input-area">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" ref={firstNameRef} id="" />
                    </div>
                    <div className="input-area">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" ref={lastNameRef} id="" />
                    </div>
                </div>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={emailRef} id="" />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} id="" />
                </div>

                <p>I already have an account? <Link to="/login">login here</Link></p>
            
                <button onClick={register}>Sign Up</button>
            </div>

        </div>
    )
}