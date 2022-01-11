import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up-body">
      <div className="sign-up-left">
        <img className="sign-up-image" src=""></img>
      </div>
      <div className="sign-up-right">
        <h1 className="sign-up-title">Gamestagram</h1>
        <form className="sign-up-form" onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
          ></input>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            placeholder="Password"
          ></input>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder="Confirm Password"
          ></input>
          <button type="submit">Sign Up</button>
        </form>
        <div className="sign-up-login-con">
          Have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;