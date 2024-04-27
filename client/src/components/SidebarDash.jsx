import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../app/user/UserSlics";

const SidebarDash = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(data.message);
    }
  };
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
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
    </div>
  );
};

export default SidebarDash;
