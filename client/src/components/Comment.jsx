import moment from "moment";
import { useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";
const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className={styles.comment}>
      <div className={styles.img}>
        <img src={user?.profilePicture} alt="user pic" />
      </div>
      <div className={styles.user}>
        <div className={styles.created}>
          <p className={styles.username}>@{user?.username}</p>
          <p className={styles.date}>{moment(comment.createdAt).fromNow()}</p>
        </div>
        <p className={styles.content}>{comment.content}</p>
      </div>
      <div className={styles.days}></div>
    </div>
  );
};

export default Comment;
