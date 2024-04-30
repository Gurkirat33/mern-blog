import styles from "../styles/Modal.module.css";
import { ImCross } from "react-icons/im";
import { PiWarningCircleBold } from "react-icons/pi";

const Modal = ({ handleShowModal, handleClick, children }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <ImCross
          className={styles.crossIcon}
          onClick={() => handleShowModal(false)}
        />
        <div className={styles.warning}>
          <PiWarningCircleBold />
        </div>
        <p>{children}</p>
        <div className={styles.btns}>
          <button className={styles.confirm} onClick={handleClick}>
            Yes,I'm sure
          </button>
          <button
            className={styles.cancel}
            onClick={() => handleShowModal(false)}
          >
            No,cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
