import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import styles from "../styles/Home.module.css";
import PostCard from "../components/PostCard";

const Blog = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, []);
  return (
    <div className={styles.Container}>
      <h2 className={styles.Heading}>
        Explore Insights, Tips, and Stories for Everyday Life
      </h2>
      <p className={styles.Description}>
        Welcome to our Blog Hub, where captivating content awaits! From
        lifestyle tips to trending stories, we've got you covered. Our goal is
        to inform, inspire, and entertain with diverse articles tailored to your
        interests. Join our community for a journey of discovery. Explore,
        enjoy, and stay informed!
      </p>
      <div className={styles.ButtonContainer}>
        <button className={`${styles.Button} btn`}>Explore blogs</button>
      </div>

      <div className={styles.recent}>
        <p className={styles.commentHead}>Recent articles</p>
        <div className={styles.recentPosts}>
          {posts &&
            posts?.posts?.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
        </div>
      </div>
      <CallToAction />
    </div>
  );
};

export default Blog;
