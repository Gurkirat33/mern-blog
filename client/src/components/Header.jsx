import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { IoIosSearch } from "react-icons/io";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import DropdownInfo from "./DropdownInfo";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
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
            {currentUser ? (
              <DropdownInfo user={currentUser} />
            ) : (
              <NavLink to="/sign-in">Sign in</NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
