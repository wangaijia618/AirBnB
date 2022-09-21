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

        <Route exact path="/">
            <SpotBrowser />
          </Route>
          <Route path="/spots/:spotId">
            <FindSpot/>
          </Route>
          <Route exact path="/spots" component={CreateNewSpot}/>

      </Switch>
    )}
  </>
);
}

export default App;
