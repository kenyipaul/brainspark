import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div id="form-container">

            <div className="form">
                <h1>Create Account</h1>

                <div className="input-area-group">
                    <div className="input-area">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input-area">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="" id="" />
                    </div>
                </div>

                <div className="input-area">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="" />
                </div>

                <div className="input-area">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" id="" />
                </div>

                <p>I already have an account? <Link to="/login">login here</Link></p>
            
                <button>Sign Up</button>
            </div>

        </div>
    )
}