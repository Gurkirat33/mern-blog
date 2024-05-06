import moment from "moment";
import { useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
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
        <p className={styles.like}>
          <BiSolidLike
            onClick={() => onLike(comment._id)}
            type="button"
            style={{
              color:
                currentUser && comment.likes.includes(currentUser?._id)
                  ? "var(--primary-color)"
                  : "black",
              cursor: "pointer",
            }}
          />
          {comment.numberOfLikes > 0 &&
            comment.numberOfLikes +
              " " +
              (comment.numberOfLikes === 1 ? "like" : "likes")}
        </p>
      </div>
    </div>
  );
};

export default Comment;
