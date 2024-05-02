import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/CommentSection.module.css";
import { useState } from "react";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className={styles.container}>
      {currentUser ? (
        <div>
          <div className={styles.userInfo}>
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt="am ia here" />
            <Link to={"/dashboard?tab=profile"}>{currentUser.username}</Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.userInfo}>
            <p>Sign in to comment!</p>
            <Link to="/sign-in">Sign in</Link>
          </div>
        </div>
      )}
      {currentUser && (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              placeholder="Write a comment..."
              rows="3"
              maxLength="200"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <div className={styles.commentInfo}>
              <p>{200 - comment.length} words remaining</p>
              <button className={`btn ${styles.button}`}>Comment</button>
            </div>
          </form>
          {commentError && <div className="error">{commentError}</div>}
        </>
      )}
    </div>
  );
};

export default CommentSection;
