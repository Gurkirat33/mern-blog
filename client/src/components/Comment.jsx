import moment from "moment";
import { useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
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
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.comment}>
      {showModal && (
        <Modal
          handleShowModal={setShowModal}
          handleClick={() => onDelete(comment._id)}
        >
          Are you sure you want to delete the comment?
        </Modal>
      )}
      <div className={styles.img}>
        <img src={user?.profilePicture} alt="user pic" />
      </div>
      <div className={styles.user}>
        <div className={styles.created}>
          <p className={styles.username}>@{user?.username}</p>
          <p className={styles.date}>{moment(comment.createdAt).fromNow()}</p>
        </div>
        {isEditing ? (
          <>
            <textarea
              rows="3"
              className={styles.editContent}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className={styles.btns}>
              <button className="btn" onClick={handleSave}>
                Save
              </button>
              <button className="btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
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
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button className={styles.edit} onClick={handleEdit}>
                      Edit
                    </button>
                    <button
                      className={styles.edit}
                      onClick={() => setShowModal(true)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
