import { Link } from "react-router-dom";
import styles from "../styles/PostCard.module.css";
const PostCard = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.img}>
        <img src={post.image} alt="post image" />
      </div>
      <p className={styles.head}>{post.title}</p>
      <p className={styles.catagory}>{post.catagory}</p>
      <Link className={styles.btn} to={`/post/${post.slug}`}>
        <p>Read More</p>
      </Link>
    </div>
  );
};

export default PostCard;
