import React from 'react';
// import {useState} from 'react'
// import {useHistory} from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const [showModal, setShowModal] = useState(false);
  // const history = useHistory();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   history.push("/signup")

  // };


  // const openMenu = () => {

  // };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        {/* <ProfileButton user={sessionUser} setShowModal={setShowModal} showModal={showModal}/>
        <LoginFormModal setShowModal={setShowModal} showModal={showModal}/> */}
      </>
    );
  }

  return (
    <div className='Parent_navbar'>
    <ul className='Navbar_container'>
      <div className='Airbnb_logo'>
        <li className='li'>
        <i className="fa-solid fa-bug"></i> <NavLink className='home_link' to={'/'}> AirDnd</NavLink>
        </li>
      </div>

      <div className='Nav_become__host_and_Home_link'>
        <li><Link to={'/spots'} className='Nav_become__host_link'> Become Host? </Link></li>
        <li>
      <div className='Nav_Home_button'>
        {/* <NavLink exact to="/">Home</NavLink> */}
        {isLoaded && sessionLinks}
        </div>
      </li>
      </div>
    </ul>
    </div>
  );
}

export default Navigation;
