import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import ProfileDash from "../components/ProfileDash";
import styles from "../styles/Dashboard.module.css";
import PostsDash from "../components/PostsDash";
import UserDash from "../components/UserDash";
import CommentsDash from "../components/CommentsDash";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("profile");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl !== null && tabUrl !== undefined) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <div className={styles.Dashboard}>
      <div
        className="sidebar"
        style={{ borderRight: "   3px var(--grey-light) solid" }}
      >
        <SidebarDash />
      </div>
      {tab === "profile" && <ProfileDash />}
      {tab === "posts" && <PostsDash />}
      {tab === "users" && <UserDash />}
      {tab === "comments" && <CommentsDash />}
    </div>
  );
};

export default Dashboard;
