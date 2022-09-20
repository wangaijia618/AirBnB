import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormModal/LoginForm";
// import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import SpotBrowser from "./components/SpotBrowser";


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
        {/* no need signup, already using modal */}
        {/* <Route path="/signup">
          <SignupFormModal />
        </Route> */}

        <Route path="/">
            <SpotBrowser />
          </Route>

      {/*     <Route exact path="/spots/current">
            <SpotOwner />
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route> */}

          {/* <Route exact path="/spots" component={CreateSpotForm}/>
           <CreateSpotForm />
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
