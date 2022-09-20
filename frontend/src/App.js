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

        <Route exact path="/">
            <SpotBrowser />
          </Route>

      </Switch>
    )}
  </>
);
}

export default App;
