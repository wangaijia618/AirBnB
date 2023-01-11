import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal/LoginForm";
// import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import SpotBrowser from "./components/SpotBrowser";
import FindSpot from "./components/FindSpot";
import CreateNewSpot from "./components/CreateSpot";
import ReviewByUser from "./components/ReviewByUser";
import SpotByUser from "./components/SpotByUser";
import CurrentUserBookings from "./components/Booking/CurrentUserBooking";
import SearchedSpots from "./components/SearchedSpots";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

//   return isLoaded && (
//     <Switch>
//       <Route path="/login">
//         <LoginFormPage />
//       </Route>
//       <Route path="/signup">
//         <SignupFormPage />
//       </Route>
//     </Switch>
//   );
// }
return (
  <>
    <Navigation isLoaded={isLoaded} searchFunc={[searchTerm, setSearchTerm]}/>
    {isLoaded && (
      <Switch>
      <Route exact path='/spots/current'>
          <SpotByUser />
          </Route>
      <Route exact path='/reviews/current'>
          <ReviewByUser />
          </Route>
        <Route path={"/spots/search"} exact>
            <SearchedSpots searchFunc={[searchTerm, setSearchTerm]} />
        </Route>
        <Route exact path="/">
            <SpotBrowser />
          </Route>
          <Route exact path="/spots/:spotId">
            <FindSpot/>
          </Route>
          <Route exact path='/newspot'>
            <CreateNewSpot />
          </Route>
          <Route path={"/bookings/current"} exact>
            <CurrentUserBookings />
          </Route>
      </Switch>
    )}
  </>
);
}

export default App;
