import styles from "../styles/CreatePost.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
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
          <input type="file" accept="img/*" />
          <button>Upload Image</button>
        </div>
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
