import Loading from "../assets/images/loading.gif";
import styles from "../styles/Spinner.module.css";
const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <img src={Loading} alt="Spinner" />
    </div>
  );
};

export default Spinner;
