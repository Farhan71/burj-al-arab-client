import './App.css';
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"

import Book from './Components/Book/Book';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const userContext = createContext()

function App() {
  
   const [loggedInUser, setLoggedInUser] = useState({})
  return (
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <p>name: {loggedInUser.name}</p>
          <Router>
            <Header></Header>

            <Switch>
            
              <Route path="/home">
                  <Home />
                </Route>

                <Route path="/login">
                  <Login />
                </Route>

                <PrivateRoute path="/book/:bedType">
                  <Book />
                </PrivateRoute>

                <Route exact path="/">
                  <Home />
                </Route>

              <Route path="*"> 
                  <NotFound />
              </Route>

            </Switch>
          </Router>
      </userContext.Provider>
      
  );
}

export default App;
