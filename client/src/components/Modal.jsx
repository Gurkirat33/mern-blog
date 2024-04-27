import styles from "../styles/Modal.module.css";
import { ImCross } from "react-icons/im";
import { PiWarningCircleBold } from "react-icons/pi";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../app/user/UserSlics";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ showModal, handleShowModal }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteUser = async () => {
    handleShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
        <p>Are you sure you want to delete your account?</p>
        <div className={styles.btns}>
          <button className={styles.confirm} onClick={handleDeleteUser}>
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
