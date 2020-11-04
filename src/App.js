import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import LandingPage from "./pages/landing-page/LandingPage";
import Private from "./pages/private";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./apiConfig/api";

// Jika di localstorage ada token  maka eksesusi fungsi setAuthToken untuk menaruh token di localstorage
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser(); //Setiap kali kita mangakses/merefres app kita maka fungsi loadUser akan dijalankan
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/admin" component={Private} />
          <PrivateRoute exact path="/home" component={Private} />
          <PrivateRoute exact path="/search-literatures" component={Private} />
          <PrivateRoute exact path="/profile" component={Private} />
          <PrivateRoute exact path="/add-literature" component={Private} />
          <PrivateRoute
            exact
            path="/detail-literature/:id"
            component={Private}
          />
          <PrivateRoute exact path="/my-collections" component={Private} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
