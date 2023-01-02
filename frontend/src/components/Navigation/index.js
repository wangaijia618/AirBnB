import React from 'react';
 import {useState, useEffect} from 'react'
 import {useHistory} from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from "../../images/airdnd-logo.png"

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

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


import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import  ProfileButton  from "./ProfileButton"
import { LoginButton } from "./LoginButton";


import './Navigation.css'

 const Navigation = () => {

    const currentUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <ProfileButton user={currentUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginButton />
            </>
        );
    }

    return (

        <>

            <ul>
                <li className='session'>
                    <NavLink style={{ 'textDecoration': 'none', 'color': '#45454599' }} exact to="/">
                        <img className='logo' alt='logo'  />
                    </NavLink>
                    <div className='sessionlinks'>
                        {sessionLinks}
                    </div>
                </li>
            </ul>
            <div className='headerbreak'>
            </div>

        </>
    );
<<<<<<< HEAD
=======
  } else {
    sessionLinks = (
      <>
      <div className='loginSignUp'>
      <span className='loginModal'>
        <LoginFormModal />
      </span>
      <span className='signUpModal'>
        <SignupFormModal />
      </span>

      </div>

     </>


//      <>
//         <button onClick={openMenu} className='profile-button'>
//       <i className="fa-solid fa-bars"></i>
//         <i className="fas fa-user-circle" />
//         </button>
//          <div className='loginSignUp'>
//          <div className='loginModal'>
//            <Link to={LoginFormModal/}>Login</Link>
//          </div>
//          <div className='signUpModal'>
//            <SignupFormModal />
//          </div>
// </div>
//          </>
    );
  }

  return (
  <>
    <div className='Parent_navbar'>
    <div className='Navbar_container'>
      <div className='home_logo'>
      <NavLink exact to='/' className='home_link' >
        {/* <div className="fa-solid fa-bug"></div> */}
        <img className="logoD" src={logo}></img>
        <span className="airdnd">AirDnD</span>
        </NavLink>
      </div>
        {sessionLinks}
</div>
        {/* <div className='Nav_become_host_and_Home_link'>
     <Link to={'/newspot'} className='Nav_become_host_link'> Become Host? </Link>
      </div> */}
    </div>

  </>
  );
>>>>>>> origin
}
export default Navigation;
