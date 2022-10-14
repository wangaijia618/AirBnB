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
     <NavLink to={'/newspot'} className='Nav_become_host_link'> Become Host? </NavLink>

      <button onClick={openMenu} className='profile-button'>
      <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
     </span>
      {showMenu && (
        <ul className="profile-dropdown">
         <li className="username"><i className="fa-solid fa-user-check"></i> {user.username}</li>
          <li className="email"><i className="fa-regular fa-envelope"></i> {user.email}</li>
          <li>
            <NavLink to={'/spots/current'} className="Nav_Link"><i className="fa-solid fa-house"></i> Your Spot</NavLink>
          </li>

          <li>
            <NavLink to={'/reviews/current'} className="Nav_Link"><i className="fa-solid fa-pen"></i> Your Review</NavLink>
          </li>
          <li>
          <button className="Logout_button" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log Out</button>
          </li>
        </ul>


        )
      }
    </>
  );

    }
export default ProfileButton;
