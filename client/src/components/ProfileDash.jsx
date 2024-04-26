import styles from "../styles/ProfileDash.module.css";
import { useSelector } from "react-redux";

const ProfileDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={styles.profile}>
      <p className={styles.head}>Profile</p>
      <div className={styles.img}>
        <img src={currentUser.profilePicture} alt="profileImg" />
      </div>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <input
          type="text"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <input type="text" placeholder="password" defaultValue="**********" />
        <button className={styles.updateBtn}>Update</button>
        <div className={styles.btnRow}>
          <p>Delete Account</p>
          <p>Sign out</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileDash;
