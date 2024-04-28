import { useState } from "react";
import styles from "../styles/CreatePost.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadtask = uploadBytesResumable(storageRef, file);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed!");
      setImageUploadProgress(null);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.createPostContainer}>
        <p className={styles.head}>Create Post</p>
        <div className={styles.input}>
          <input type="text" placeholder="Title" />
          <select>
            <option value="noCatagory">Select a catagory</option>
            <option value="Demo1">Demo1</option>
            <option value="Demo2">Demo2</option>
          </select>
        </div>
        <div className={styles.fileInput}>
          <input
            type="file"
            accept="img/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={imageUploadProgress}
          />
          <button onClick={handleUploadImage}>
            {imageUploadProgress ? (
              <div style={{ width: "3rem", height: "3rem" }}>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {imageUploadError && <p className="error">{imageUploadError}</p>}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded Image"
            style={{ width: "100%", height: "8rem", objectFit: "contain" }}
          />
        )}
        <ReactQuill
          theme="snow"
          className={styles.quill}
          placeholder="Enter some text"
        />
        <div>
          <button className="btn" type="submit">
            Publish
          </button>
        </div>
      </div>
      <div className={styles.previewPostContainer}>
        <div className={styles.head}>Preview</div>
      </div>
    </div>
  );
};

export default CreatePost;
