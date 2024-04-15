import Logo from "./Logo";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className={styles.logoCol}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.features}>
          <Link to="/">Home |</Link>
          <Link to="/">About |</Link>
          <Link to="/">Projects |</Link>
          <Link to="/">Signin |</Link>
        </div>
        <div className={styles.copyright}>
          {/* KiratBlog © 2024 - Testing pending */}
        </div>
      </div>
      <div className={styles.navigationLinks}>
        <div className={styles.linkRow}>
          <div className={styles.linkLogo}>
            <FaMapMarkerAlt />
          </div>
          <div className={styles.linkInfo}> Ludhiana,Punjab,India</div>
        </div>
        <div className={styles.linkRow}>
          <div className={styles.linkLogo}>
            <FaPhone />
          </div>
          <div className={styles.linkInfo}> +91 7696409799</div>
        </div>
        <div className={styles.linkRow}>
          <div className={styles.linkLogo}>
            <MdEmail />
          </div>
          <div className={styles.linkInfo}>
            <a href="mailto:gurkiratsingh12a@gmail.com">
              gurkiratsingh12a@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className={styles.socialLinks}>
        <div className="socialDescription">
          Welcome to our vibrant community! Explore captivating stories,
          insightful articles, and the latest in tech. Join our journey of
          discovery and inspiration. Follow us for updates!
        </div>
        <div className={styles.socialMediaLinks}>
          <div className={styles.linkLogo}>
            <a href="http://facebook.com">
              <FaFacebookF />
            </a>
          </div>
          <div className={styles.linkLogo}>
            <a href="">
              <FaInstagram />
            </a>
          </div>
          <div className={styles.linkLogo}>
            <a href="">
              <FaLinkedinIn />
            </a>
          </div>
          <div className={styles.linkLogo}>
            <a href="">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
