import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import ProfileDash from "../components/ProfileDash";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("profile");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <div className={styles.Dashboard}>
      <div className="sidebar">
        <SidebarDash />
      </div>
      {tab === "profile" && <ProfileDash />}
    </div>
  );
};

export default Dashboard;
