import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { IoIosSearch } from "react-icons/io";
import Logo from "./Logo";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleShowMenu = () => {
    showMobileMenu((s) => !s);
  };
  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.input}>
        <input type="text" placeholder="Search" />
        <span>
          <IoIosSearch />
        </span>
      </div>
      <div className={styles.navLinks}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li className={styles.btnGradient}>
            <NavLink to="/sign-in">Sign in</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
