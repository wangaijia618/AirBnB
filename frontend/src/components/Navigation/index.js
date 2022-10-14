

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
}
export default Navigation;
