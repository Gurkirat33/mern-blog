import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PostDash.module.css";
const PostsDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Date updated</th>
                <th>Post Image</th>
                <th>Title</th>
                <th>Catagory</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {userPosts.map((post) => (
                <tr key={post._id} className={styles.row}>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <img
                      src={post.image}
                      style={{
                        width: "4.8rem",
                        aspectRatio: 1,
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.catagory}</td>
                  <td style={{ color: "var(--error-color)" }}>
                    <p style={{ cursor: "pointer" }}>Delete</p>
                  </td>
                  <td style={{ color: "green" }}>
                    <p style={{ cursor: "pointer" }}>Edit</p>
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
          <p>No posts yet!</p>
          <Link to="/create-post" className="btn btn-link">
            Create post
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsDash;
