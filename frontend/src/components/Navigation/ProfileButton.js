import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { useHistory, NavLink } from "react-router-dom";
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
       <span className='Nav_become_host_and_Home_link'>
     <NavLink to={'/newspot'} className='Nav_become_host_link'> Become a Host? </NavLink>

      <button onClick={openMenu} className='profile-button'>
      <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
     </span>
      { showMenu && (
        <div className="profile-dropdown">
         <div className="profile_username">{user.username}</div>
          <div className="profile_email">{user.email}</div>
          <div>
            <NavLink to={'/spots/current'} className="current_spot_link">Your Spot</NavLink>
          </div>

          <div>
            <NavLink to={'/reviews/current'} className="current_review_link"> Your Review</NavLink>
          </div>
          <div className="logout_button">
          <button className="Logout_button" onClick={logout}>Log Out</button>
          </div>
        </div>
      )

        // : showMenu && (
        //   <ul>
        //     <div>
        //       <li className="list"><i className="fa-solid fa-user"></i><button className="button" onClick={() => setShowModal(true)}>Log In</button></li>
        //       {/* <li><NavLink to="/signup">Sign Up</NavLink></li> */}
        //       {/* <li className="list"><i className="fa-solid fa-user-plus"></i><button className="button" onClick={() => setShowModal(true)}>Sign Up</button></li> */}
        //       <li className="list"><i className="fa-solid fa-user-astronaut"></i><button className="button" onClick={() => dispatch(login({ credential: "Demo-lition", password: "password", }))}>Demo User</button></li>
        //     </div>
        //   </ul>
        // )
      }
    </>
  );

    }
export default ProfileButton;
