import "../../sass/user-dashboard.scss";

export default function Security() {
  return (
    <div id="account">
      <div className="account-info">
        <div className="account-profile"></div>
        <div className="account-names">
          <h2>John Doe</h2>
          <h3>John@gmail.com</h3>
        </div>
      </div>

      <div className="form-input2">
        <form action="">
          <h2>Change password</h2>
          <div className="group">
            <div className="form-group">
              <label htmlFor="old password">Old Password</label>
              <input type="text" id="first-name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="new password">New Password</label>
            <input type="email" id="email" />
          </div>
          <button type="submit">Change Password</button>

       
        </form>
      </div>
    </div>
  );
}
