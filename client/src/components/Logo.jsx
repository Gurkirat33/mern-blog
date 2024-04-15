import styles from "../styles/Header.module.css";

const Logo = ({ span = "Kirat's", normal = "Blogs" }) => {
  return (
    <p>
      <span className={styles.logo}> {span}</span> {normal}
    </p>
  );
};

export default Logo;
