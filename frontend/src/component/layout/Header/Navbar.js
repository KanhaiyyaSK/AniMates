import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const alert = useAlert();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogut = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Ani<span className="mates">Mates</span>
        </Link>
        <div className="menu-icon" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleNavbar}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={toggleNavbar}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <Link className="nav-link" onClick={handleLogut}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>

          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                Profile
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link to="/cart" className="nav-link" onClick={toggleNavbar}>
              Cart
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/search">
              <button className="search-button" onClick={toggleNavbar}>
                Search
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
