/* do npm install react-router-dom */
/* install material ui 
run npm install --save @material-ui/core */
/* run npm install --save redux react-redux redux-thunk*/


import React from 'react';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// import some items from react-router-dom for use in app.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// import MuiThemeProvider form material-ui 
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// import components
import NavBar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// import pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Axios from 'axios';


// creating the theme
const theme = createMuiTheme (themeFile);

// get the authentication token form  the local storage
const token = localStorage.FBIdToken;

// check if the token exists
// to decode token install jwt-decode library

if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


// for react router dom to work we need to wrap everything in a Router component
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home}/>
                  <AuthRoute
                   exact
                    path="/login"
                     component={login}
                      
                  />
                  
                  <AuthRoute
                   exact
                    path="/signup"
                     component={signup}
                  />
                </Switch>
              </div>
            </Router>
          
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
