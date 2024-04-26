import styles from "../styles/signup.module.css";
import SignUpImg from "../assets/images/signup.png";
import ButtonInvert from "../components/ButtonInvert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInstart,
} from "../app/user/UserSlics.js";
import { MdError } from "react-icons/md";
import GoogleBtn from "../components/GoogleBtn.jsx";

const SignIn = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleFormValue = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userData.password || !userData.email) {
      return dispatch(signInFailure("All fields are required!"));
    }
    try {
      dispatch(signInstart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className={styles.form}>
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
            <GoogleBtn />
          </div>
          <p className={styles.signin}>
            Dont Have an account?
            <span>
              <Link to="/sign-up">Sign up</Link>
            </span>
          </p>
        </form>
        {error && (
          <p className="error">
            {<MdError />}
            {error}
          </p>
        )}
      </div>
      <div className={styles.formRight}>
        <img src={SignUpImg} alt="SignIn-image" />
      </div>
    </div>
  );
};

export default SignIn;
