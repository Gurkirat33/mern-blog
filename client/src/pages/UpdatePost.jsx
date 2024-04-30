import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.createPostContainer}>
        <p className={styles.head}>Update Post</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, catagory: e.target.value })
              }
              value={formData.catagory}
            >
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
            <button type="button" onClick={handleUploadImage}>
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
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            value={formData.content}
          />
          <div>
            <button className="btn" type="submit">
              Update post
            </button>
          </div>
          {publishError && <p className="error">{publishError}</p>}
        </form>
      </div>
      <div className={styles.previewPostContainer}>
        <div className={styles.head} style={{ marginBottom: ".8rem" }}>
          Preview
        </div>
        {Object.keys(formData).length === 0 ? (
          <p className={styles.title}>This is previw section for your post</p>
        ) : null}
        {formData.title && <p className={styles.title}>{formData.title}</p>}
        {formData.catagory && (
          <span className={styles.catagory}>
            Catagory - {formData.catagory}
          </span>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded Image"
            style={{ height: "10rem", objectFit: "contain" }}
          />
        )}
        {formData.content && (
          <div dangerouslySetInnerHTML={{ __html: formData.content }} />
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
