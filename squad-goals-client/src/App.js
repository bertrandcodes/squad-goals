import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import friends from './pages/friends';
import challenge from './pages/challenge';
import create from './pages/create';
import axios from 'axios';

axios.defaults.baseURL = 'https://us-central1-accountability-tracker-friends.cloudfunctions.net/api';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d22e2e'
    },
    secondary: {
      main: '#F3DB74FF'
    }
  },
  typography: {
    fontFamily: 'Dekko'
  },
  form: {
    textAlign: 'center'
  },
  image: {
    height: '150px',
    width: '150px',
    margin: '10px auto 10px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
})

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/create" component={create} />
                <Route exact path="/friends" component={friends} />
                <Route exact path="/challenge/:challengeId" component={challenge} />
              </Switch>
            </div>
          </Router>
        </Provider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          limit={1}
        />


      </MuiThemeProvider>
    );
  }
}

export default App;
