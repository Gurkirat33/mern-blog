import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/CommentSection.module.css";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const navigate = useNavigate();
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
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {currentUser ? (
        <div>
          <div className={styles.userInfo}>
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt="" />
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
          <div className={styles.commentCount}>
            {comments.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              <div>
                <p>
                  {comments.length === "1" ? "Comment " : "Comments "}
                  {comments.length}
                </p>
              </div>
            )}
          </div>
        </>
      )}
      <div className={styles.comments}>
        {comments &&
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} onLike={handleLike} />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
