import styles from "../styles/ButtonInvert.module.css";
const ButtonInvert = ({ children }) => {
  return <button className={styles.btn}>{children}</button>;
};

export default ButtonInvert;
