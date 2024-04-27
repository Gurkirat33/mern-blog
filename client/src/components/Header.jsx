import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { IoIosSearch } from "react-icons/io";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import DropdownInfo from "./DropdownInfo";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMobileMenu((menu) => !menu);
  };
  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };
  return (
    <div style={{ marginBottom: "4.2rem" }}>
      <nav className={styles.navbar}>
        <Logo />
        <div className={styles.input}>
          <input type="text" placeholder="Search" />
          <Link to="/search">
            <IoIosSearch />
          </Link>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <div
              className={`${styles.remove} ${
                showMobileMenu ? styles.active : ""
              }`}
            >
              <li onClick={handleLinkClick}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li onClick={handleLinkClick}>
                <NavLink to="/about">About</NavLink>
              </li>
              <li onClick={handleLinkClick}>
                <NavLink to="/projects">Projects</NavLink>
              </li>
            </div>
            <li className={styles.btnGradient}>
              {currentUser ? (
                <DropdownInfo user={currentUser} />
              ) : (
                <NavLink to="/sign-in">Sign in</NavLink>
              )}
            </li>
            <span className={styles.hamburgerMenu} onClick={handleMenuClick}>
              {showMobileMenu ? <ImCross /> : <GiHamburgerMenu />}
            </span>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
