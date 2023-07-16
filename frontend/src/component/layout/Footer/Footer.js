import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {" "}
          Ani<span className="mates">Mates</span>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
        </div>
        <div className="footer-social">
          <a href="##">
            <FaFacebookF />
          </a>
          <a href="##">
            <FaTwitter />
          </a>
          <a href="##">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()}{" "}
        <span className="sk">
          {" "}
          Ani<span className="mates">Mates</span>
        </span>{" "}
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
