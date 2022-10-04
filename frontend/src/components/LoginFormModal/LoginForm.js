import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector} from "react-redux";
import "./LoginForm.css"
// import {Redirect} from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
//?????
  // const sessionUser = useSelector(state => state.session.user);
  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
  const demoUserLogin = (e) => {
    e.preventDefault();
    const demoUser = { credential: 'FakeUser1', password: 'password1' };
    dispatch(sessionActions.login(demoUser));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>

        <div className="website_title">
        <i class="fa-solid fa-bug"></i>
        AirDnd
        </div>
        <div className="login_error_container">
      <ul>
        {errors.map((error, idx) => (
          <li div className="login_errors" key={idx}>{error}</li>
        ))}
      </ul>
      </div>
      <div className="login_container">
        <div className="username_email">
      <label>

        <input
        className="userInput"
        placeholder="Username/Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
       </div>
         <div className="password">
      <label>

        <input
        className="passwordInput"
        placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <button className="login_button" type="submit">Log In</button>
      </div>
      <div>
      <button className="demo_button" onClick={demoUserLogin}>Log in as demo user</button>
       </div>
</div>
    </form>
  );
}

export default LoginForm;
