import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../styles/PostDash.module.css";
import Modal from "./Modal";
import { FaCheck, FaTimes } from "react-icons/fa";

const UserDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${styles.container} table-container`}>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Date created</th>
                <th>User image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.map((user) => (
                <tr key={user._id} className={styles.row}>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      style={{
                        width: "2.8rem",
                        borderRadius: "50%",
                        aspectRatio: 1,
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="var(--error-color)" />
                    )}
                  </td>
                  <td style={{ color: "var(--error-color)" }}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
          <p>No Users yet!</p>
        </div>
      )}
      {showModal && (
        <Modal handleShowModal={setShowModal} handleClick={handleDeleteUser}>
          Are you sure you want to delete this user?
        </Modal>
      )}
    </div>
  );
};

export default UserDash;
