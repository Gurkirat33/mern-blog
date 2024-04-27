import { useEffect, useRef, useState } from "react";
import styles from "../styles/ProfileDash.module.css";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signOutSuccess,
} from "../app/user/UserSlics";
import { useDispatch } from "react-redux";
import Modal from "./Modal.jsx";
const ProfileDash = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();

  const filePickerRef = useRef();
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made!");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload!");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateUserError(data.message);
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(data.message);
    }
  };
  return (
    <div className={styles.profile}>
      <p className={styles.head}>Profile</p>
      <input
        type="file"
        accept="img/*"
        onChange={handleImageInput}
        ref={filePickerRef}
        hidden
      />
      <div className={styles.img} onClick={() => filePickerRef.current.click()}>
        {imageFileUploadProgress && (
          <CircularProgressbar
            value={imageFileUploadProgress || 0}
            text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(60,150,200,${imageFileUploadProgress / 100})`,
              },
            }}
          />
        )}
        <img
          src={imageFileUrl || currentUser.profilePicture}
          alt="profileImg"
        />
      </div>
      {imageFileUploadError && (
        <div className="error">{imageFileUploadError}</div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleFormChange}
          id="username"
        />
        <input
          type="text"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleFormChange}
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          onChange={handleFormChange}
          id="password"
        />
        <button className={styles.updateBtn}>Update</button>
        <div className={styles.btnRow}>
          <p onClick={() => setShowModal(true)}>Delete Account</p>
          <p onClick={handleSignOut}>Sign out</p>
        </div>
      </form>
      {updateUserSuccess && <div className="success">{updateUserSuccess}</div>}
      {updateUserError && <div className="error">{updateUserError}</div>}
      {error && <div className="error">{error}</div>}
      {showModal && (
        <Modal showModal={showModal} handleShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ProfileDash;
