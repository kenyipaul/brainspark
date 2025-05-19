import "../../sass/user-dashboard.scss";

export default function Account() {
  return (
    <div id="account">
      <div className="account-info">
        <div className="account-profile"></div>
        <div className="account-names">
          <h2>John Doe</h2>
          <h3>John@gmail.com</h3>
        </div>
      </div>

      <div className="form-input">
        <form action="">
          <div className="group">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <button type="submit">Update Profile</button>

          <div className="delete-account">
            <p>I want to delete my account</p>
            <p>Delete</p>
          </div>
        </form>
      </div>
    </div>
  );
}
