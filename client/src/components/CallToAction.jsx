import styles from "../styles/CallToAction.module.css";
import webImg from "../assets/images/web.png";
const CallToAction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.head}>
          From Concept to Reality: Let's Bring Your Dream Website to Life!
        </div>
        <div className={styles.info}>
          Embark on a digital journey with us! Our expert team is dedicated to
          turning your website dreams into stunning reality. From
          conceptualization to execution, we're here to make your online vision
          shine.
        </div>
        <a href="http://google.com">Get Started</a>
      </div>
      <div className={styles.right}>
        <img src={webImg} alt="web" />
      </div>
    </div>
  );
};

export default CallToAction;
