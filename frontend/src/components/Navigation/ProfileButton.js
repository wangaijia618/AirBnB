
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';
import { useHistory, Link } from "react-router-dom";
import { login } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };


    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />

      </button>
      { showMenu && (
        <ul className="profile-dropdown">
         <li className="username"><i className="fa-solid fa-user-check"></i> {user.username}</li>
          <li className="email"><i className="fa-solid fa-at"></i> {user.email}</li>
          <li>
          <button className="Logout_button" onClick={logout}><i className="fa-solid fa-plug-circle-xmark"></i>Log Out</button>
          </li>
        </ul>
      )
    }
    </>
  );
}

export default ProfileButton;
