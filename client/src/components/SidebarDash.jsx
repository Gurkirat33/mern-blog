import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../app/user/UserSlics";
import { useSelector } from "react-redux";
import { HiDocumentText } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegComment } from "react-icons/fa";

const SidebarDash = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
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
      <Link
        to={`/dashboard?tab=profile`}
        className={`${styles.profile} ${
          tab === "profile" ? styles.active : ""
        }`}
      >
        <FaUser />
        <p>Profile</p>
      </Link>
      {currentUser.isAdmin && (
        <>
          <Link
            to={`/dashboard?tab=posts`}
            className={`${styles.admin} ${
              tab === "posts" ? styles.active : ""
            }`}
          >
            <HiDocumentText />
            <p>Posts</p>
          </Link>
          <Link
            to={`/dashboard?tab=users`}
            className={`${styles.admin} ${
              tab === "users" ? styles.active : ""
            }`}
          >
            <HiOutlineUserGroup />
            <p>Users</p>
          </Link>
          <Link
            to={`/dashboard?tab=comments`}
            className={`${styles.admin} ${
              tab === "comments" ? styles.active : ""
            }`}
          >
            <FaRegComment />
            <p>Comments</p>
          </Link>
        </>
      )}
      <Link className={styles.signOut}>
        <FaArrowRight />
        <p onClick={handleSignOut}>Sign Out</p>
      </Link>
    </div>
  );
};

export default SidebarDash;
