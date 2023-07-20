import React, { Fragment, useEffect } from "react";
import {  useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useAlert } from "react-alert";
const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  
  const alert = useAlert();

  const handleClick = () => {
    alert.success("Comming Soon!");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.avatar.name} />
              <Link className="link" to="/me/update">
                Edit Profile
              </Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link className="link" onClick={handleClick}>
                  My Orders
                </Link>
                <Link className="link" to="/password/update">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
