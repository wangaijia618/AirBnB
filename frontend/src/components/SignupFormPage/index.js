import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

 if(sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, lastName, firstName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div>
    <h3 className="sign_up_words">Please Sign up</h3>
    <form className ="sign_up_container" onSubmit={handleSubmit}>
      <ul className="sign_up_errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="firstname">
      <label>
        Firstname:
        <input
          className="firstname_input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="lastname">
      <label>
        Lastname:
        <input
          className="lastname_input"
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="email">
      <label>
        Email:
        <input
          className="email_input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="username">
      <label>
        Username:
        <input
          className="username_input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      </div>
      <div >
      <label>
        Password:
        <input
          className="password_input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="confirm_password">
      <label>
        Confirm Password:
        <input
          className="confirm_password_input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <button className="signup_button" type="submit">Sign Up</button>
    </form>
  </div>
  );
}

export default SignupFormPage;
