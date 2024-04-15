import styles from "../styles/signup.module.css";
import SignUpImg from "../assets/images/signup.png";
import ButtonInvert from "../components/ButtonInvert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormValue = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userData.password || !userData.email) {
      setLoading(false);
      return toast.error("All fields are required!");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return toast.error("Username/Email is invalid!");
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className={styles.form}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.formLeft}>
        <div className={styles.content}>
          <p className={styles.mainHead}>SignIn Now</p>
          <p className={styles.secondaryHead}>
            Access Your Account to Get Started
          </p>
        </div>
        <form onSubmit={handleFormSubmit} className={styles.formInput}>
          <div className={styles.row}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="you@email.com"
              onChange={handleFormValue}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*********"
              onChange={handleFormValue}
            />
          </div>
          <div className={styles.button}>
            <ButtonInvert>{loading ? "Loading..." : "Sign In"}</ButtonInvert>
            <button className={styles.google}>Google</button>
          </div>
          <p className={styles.signin}>
            Dont Have an account?
            <span>
              <Link to="/sign-up">Sign up</Link>
            </span>
          </p>
        </form>
      </div>
      <div className={styles.formRight}>
        <img src={SignUpImg} alt="SignIn-image" />
      </div>
    </div>
  );
};

export default SignIn;
