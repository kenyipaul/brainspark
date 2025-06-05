import Axios from "axios";
import { useRef, useEffect, useState } from "react";
import "../../sass/user-dashboard.scss";
import { useLocation } from "react-router-dom";

interface UserType {
  authorized: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function Security() {
  const location = useLocation();
  const newPasswordRef = useRef<HTMLInputElement | null>(null);

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

  interface UpdateDataEvent extends React.MouseEvent<HTMLButtonElement> {
    target: HTMLButtonElement & {
      form: HTMLFormElement & {
        confirmPassword: HTMLInputElement;
      };
    };
  }

  const updateData = (e: UpdateDataEvent) => {
    const newPassword = newPasswordRef.current!.value;
    const confirmPassword = e.target.form.confirmPassword.value;

    if (!newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword.length > 20) {
      alert("Password must be less than 20 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    Axios({
      method: "PUT",
      url: `http://localhost:5112/users/${user.data.id}/password`,
      data: {
        NewPassword: newPassword,
      },
    }).then((response: { data: string }) => {
      alert(response.data);
      window.location.reload();
    });
  };

  return (
    <div id="account">
      <div className="account-info">
        <div className="account-profile"></div>
        <div className="account-names">
          <h2>{user.data.firstName + " " + user.data.lastName}</h2>
          <h3>{user.data.email}</h3>
        </div>
      </div>

      <div className="form-input2">
        <form action="">
          <h2>Change password</h2>
          <div className="group">
            <div className="form-group">
              <label htmlFor="old password">New Password</label>
              <input
                type="password"
                id="password"
                ref={newPasswordRef}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" />
          </div>
          <button type="button" onClick={updateData}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
