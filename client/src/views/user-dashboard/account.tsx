import { useState, useRef, useEffect } from "react";
import "../../sass/user-dashboard.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserType {
  authorized: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function Account() {
  const navigate = useNavigate()
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<UserType>({
    authorized: false,
    data: { id: "", firstName: "", lastName: "", email: "" },
  });
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setFirstName(user.data.firstName)
    setLastName(user.data.lastName)
    setEmail(user.data.email)
  }, [user, setUser])


  useEffect(() => {
    let storedData: unknown = sessionStorage.getItem("_user_data");

    if (storedData == null) {
      storedData = {} as object;
    } else {
      storedData = JSON.parse(storedData as string);
    }

    setUser(storedData);
  }, []);

  const updateData = () => {
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;
    const email = emailRef.current!.value;

    Axios({
      method: "PUT",
      url: `http://localhost:5112/users/${user.data.id}`,
      data: {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
      }
    }).then((response) => {
      sessionStorage.setItem("_user_data", JSON.stringify(response.data))
      window.location.reload();
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      Axios({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        url: `http://localhost:5112/users/${user.data.id}` 
      }).then(() => {
        sessionStorage.setItem("_user_data", JSON.stringify({authorized: false, data: { id: "", firstName: "", lastName: "", email: "" }}))
        navigate("/")
      });
    }
  };

  return (
    <div id="account">
      <div className="account-info">
        <div className="account-profile"></div>
        <div className="account-names">
          <h2>{user?.data.firstName + " " + user?.data.lastName}</h2>
          <h3>{user?.data.email}</h3>
        </div>
      </div>

      <div className="form-input">
        <form action="">
          <div className="group">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) =>setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                ref={lastNameRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="button" onClick={updateData}>
            Update Profile
          </button>

          <div className="delete-account">
            <p>I want to delete my account</p>
            <p onClick={handleDelete}>Delete</p>
          </div>
        </form>
      </div>
    </div>
  );
}
