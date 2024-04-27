import { useState, useEffect } from "react";
import styles from "../styles/DropdownInfo.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../app/user/UserSlics";
const DropdownInfo = ({ user }) => {
  const dispatch = useDispatch();
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
          <Link to="/dashboard?tab=profile" onClick={() => setDropdown(false)}>
            Profile
          </Link>
          <p onClick={handleSignOut}>Sign out</p>
        </div>
      )}
    </div>
  );
};

export default DropdownInfo;
