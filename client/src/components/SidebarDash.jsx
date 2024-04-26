import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SidebarDash = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <div className={styles.sidebar}>
      <div
        className={`${styles.profile} ${
          tab === "profile" ? styles.active : ""
        }`}
      >
        <FaUser />
        <Link to={`/dashboard?tab=profile`}>Profile</Link>
      </div>
      <div className={styles.signOut}>
        <FaArrowRight />
        <Link to="/">Sign Out</Link>
      </div>
    </div>
  );
};

export default SidebarDash;
