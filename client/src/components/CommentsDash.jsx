import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../styles/PostDash.module.css";
import Modal from "./Modal";
import Spinner from "./Spinner";

const CommentsDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomment");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setLoading(false);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomment?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className={`${styles.container} table-container`}>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Date updated</th>
                <th>Comment content</th>
                <th>Number of likes</th>
                <th>PostId</th>
                <th>UserId</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {comments.map((comment) => (
                <tr key={comment._id} className={styles.row}>
                  <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td>{comment.content}</td>
                  <td>{comment.numberOfLikes}</td>
                  <td>{comment.postId}</td>
                  <td>{comment.userId} </td>
                  <td style={{ color: "var(--error-color)" }}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                className="btn"
                style={{ width: "6rem" }}
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.noPost}>
          <p>No Comments yet!</p>
        </div>
      )}
      {showModal && (
        <Modal handleShowModal={setShowModal} handleClick={handleDeleteComment}>
          Are you sure you want to delete this comment?
        </Modal>
      )}
    </div>
  );
};

export default CommentsDash;
