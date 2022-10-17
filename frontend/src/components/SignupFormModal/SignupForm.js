import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage({onClose}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

//  if(sessionUser) return <Redirect to="/" />;


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
         <button className='signup-form-close-btn' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
         <h3 className="sign_up_words">Sign up</h3>
         <form className ="sign_up_container" onSubmit={handleSubmit}>

         <ul className="sign_up_errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="firstname">
      <label>

        <input
          id="firstname-input"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="lastname">
      <label>

        <input
          id="lastname-input"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="email_signup">
      <label>

        <input
          id="email-input"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="username_signup">
      <label>

        <input
          id="username-input"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="password_signup" >
      <label>

        <input
          id="password-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div className="confirm_password">
      <label>

        <input
          id="confirm-password-input"
          placeholder="Confirm Your Password"
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
