import { hot } from "react-hot-loader";
import React, { useState, useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./app.scss";
import "./forms.scss";
import Dashboard from './components/dashboard/Dashboard';
import Login from "./components/login/Login";
import { StoreContext, Auth, initialState } from "./AppContext";
import Reducer from './AppReducer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500]
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

function RouteGuard({ children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.getToken() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const App = () => {

  const [state, dispatch] = useReducer(Reducer, initialState);



  return (<StoreContext.Provider value={



    [state, dispatch, Auth]
  }><Router>
      <ThemeProvider theme={theme}>


        <main className={`main-${location.pathname.slice(1)}`}>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/">
              <Dashboard></Dashboard>
            </Route>

          </Switch>
        </main>

      </ThemeProvider>

    </Router></StoreContext.Provider>);

};

export default hot(module)(App);