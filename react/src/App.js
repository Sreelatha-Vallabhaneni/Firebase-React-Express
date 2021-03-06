import React, {createContext, useState, useEffect} from 'react';
import Header from "./components/Header.js"
import Main from "./components/Main.js"
import About from "./components/About.js"
import Login from "./components/Login.js"
import PrivateRoute from "./components/PrivateRoute.js"
import firebaseInst from "./helpers/firebase.js";
import UserMaker from "./components/CreateUser/UserMaker"
import MainContainer from "./components/MainContainer"
import ajaxContent from "./helpers/ajax.js"
import {ajaxUrls} from "./helpers/ajax.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const UserContext = createContext(null);

function App () {

   const [userState, setUserState] = useState(null);
   const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
      firebaseInst.init();
      firebaseInst.getAuth().onAuthStateChanged(function(user) {
        setUserFetched(true);
        if (user) {
          setUserState(user);
        } else {
          setUserState(null);
        }
      }); 
    }, []);

  if (!userFetched) {
    console.log("fetching user...")
    return <div>Loading...</div>
  }

  return (
    <Router>
      <UserContext.Provider value={userState}>
        <Header>
          <nav>
            <ul>
              <li>
                <Link to="/main">Main</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/new">Create user</Link>
              </li>
            </ul>
          </nav>
        </Header>
        <MainContainer>
          <Switch>
            <PrivateRoute path="/new" >
              <UserMaker />
            </PrivateRoute>
            <PrivateRoute path="/main">
              <Main />
            </PrivateRoute>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </MainContainer>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
export {
  UserContext
};


