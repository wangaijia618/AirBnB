import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
function ProfileButton({ user}) {
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
       <span className='Nav_become_host_and_Home_link'>
     <NavLink to={'/newspot'} className='Nav_become_host_link'> Become a Host? </NavLink>

      <button onClick={openMenu} className='profile-button'>
      <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
     </span>
      { showMenu && (
        <div className="profile-dropdown">
         <li className="profile_username">{user.username}</li>
          <li className="profile_email">{user.email}</li>
          <li>
            <NavLink to={'/spots/current'} className="current_spot_link">Your Spot</NavLink>
          </li>

          <li>
            <NavLink to={'/reviews/current'} className="current_review_link"> Your Review</NavLink>
          </li>
          <li className="logout_button">
          <button className="Logout_button" onClick={logout}>Log Out</button>
          </li>
        </div>
      )


        )
      }
    </>
  );

    }
export default ProfileButton;
