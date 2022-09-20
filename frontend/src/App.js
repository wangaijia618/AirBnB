import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
// import SpotsBrowser from "./components/Spots/SpotsBrowser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>

        {/* <Route exact path="/">
            <SpotsBrowser />
          </Route> */}

      {/*     <Route exact path="/spots/current">
            <SpotOwner />
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route> */}

          {/* <Route exact path="/spots" component={CreateSpotForm}/> */}
            {/* <CreateSpotForm />
          </Route> */}

          {/* <Route exact path="/spots/:spotId/edit" component={EditSpotForm}/>
            {/* <EditSpotForm />
          </Route> */}
{/*
          <Route exact path={'/reviews/current'}>
            <ReviewsUser />
          </Route> */}
      </Switch>
    )}
  </>
);
}

export default App;
