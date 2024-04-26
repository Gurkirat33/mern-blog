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

const ProfileDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

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
        });
      }
    );
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
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <input
          type="text"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <input type="text" placeholder="password" defaultValue="**********" />
        <button className={styles.updateBtn}>Update</button>
        <div className={styles.btnRow}>
          <p>Delete Account</p>
          <p>Sign out</p>
        </div>
      </form>
    </div>
  );
};

export default ProfileDash;
