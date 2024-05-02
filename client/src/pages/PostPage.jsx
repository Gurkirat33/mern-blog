import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import styles from "../styles/PostPage.module.css";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (loading) return <Spinner />;
  return (
    <>
      <div className={styles.container}>
        <p className={styles.head}>{post && post.title}</p>
        <Link className={styles.catagory} to="/">
          {post && post.catagory}
        </Link>
        <img className={styles.image} src={post && post.image} />
        <div className={styles.postInfo}>
          <p className={styles.date}>
            {post && new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="time">
            {post && (post.content.length / 800).toFixed(0)} min read
          </p>
        </div>
        <p
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></p>
      </div>
      <CallToAction />
      <CommentSection postId={post && post._id} />
    </>
  );
};

export default PostPage;
