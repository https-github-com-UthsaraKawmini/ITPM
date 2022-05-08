import React from 'react';
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createTheme, MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import { deepPurple, green } from '@material-ui/core/colors';

import SignUp from './components/customer/signup/SignUp';
import SignIn from './components/customer/signin/SignIn';
import HomeContainer from './components/home/HomeContainer';
import AdminContainer from './components/admin/AdminContainer';


const Theme = responsiveFontSizes(createTheme({
  palette: {
    primary: deepPurple,
    success: green
  }, typography: {
    button: {
      textTransform: 'none'
    }
  }
}));


function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Router>
        <Switch>

          <Route path="/EmployeeSignIn">

          </Route>

          <Route path="/admin">
            <AdminContainer />
          </Route>

          <Route path="/SignIn">
            <SignIn />
          </Route>

          <Route path="/SignUp">
            <SignUp />
          </Route>

          <Route path="/">
            <HomeContainer />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
