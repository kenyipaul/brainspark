import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div id="form-container">

            <div className="form">
                <h1>Sign In</h1>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="" />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" id="" />
                </div>

                <p>I don't have an account yet? <Link to="/register">register here</Link></p>

                <button>Log In</button>
            </div>

        </div>
    )
}