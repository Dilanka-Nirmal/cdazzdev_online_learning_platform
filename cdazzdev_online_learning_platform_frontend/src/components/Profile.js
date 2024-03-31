import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3 className="display-4">
          <strong>{currentUser.username}</strong>'s User Profile
        </h3>
      </header>
      <div className="row">
        <div className="col-md-6">
          <p className="lead">
            <strong>User ID:</strong> {currentUser.id}
          </p>
          <p className="lead">
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p className="lead">
            <strong>User's Role: </strong>{currentUser.role}
          </p>
          <ul className="list-group">
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
