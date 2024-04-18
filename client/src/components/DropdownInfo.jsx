import { useState, useEffect } from "react";
import styles from "../styles/DropdownInfo.module.css";
import { Link } from "react-router-dom";

const DropdownInfo = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest(`.${styles.profilePic}`)) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown]);
  const handleProfileClick = () => {
    setDropdown((s) => !s);
  };
  return (
    <div className={styles.profilePic}>
      <img
        src={user.profilePicture}
        alt="profile-pic"
        onClick={handleProfileClick}
      />
      {dropdown && (
        <div className={styles.dropdownContent}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <Link to="/dashboard?tab=profile">Profile</Link>
          <Link to="/">Sign out</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownInfo;
