import React, { useState, useCallback, useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AddBook from './addbook/AddBook';
import Welcome from './welcome/Welcome';
import ViewBooks from './viewbook/ViewBooks';
import Register from './register/Register.js';
import BookRequests from './bookrequest/BookRequests.js';
import ReturnBook from './returnbook/ReturnBook.js';
import { AuthContext } from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');

  const auth = useContext(AuthContext);

  const login = useCallback((userRole, userName) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUserName(userName);
    storeInSession(userRole,userName);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    clearSession();
  }, []);

  const storeInSession = (sessionRole,SessionName) => {
    sessionStorage.setItem("userName", SessionName);
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("role", sessionRole);
  }

  const clearSession = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
  }

  useEffect(() => {
    let sessionIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    let sessionRole = sessionStorage.getItem("role");
    let sessionUserName = sessionStorage.getItem("userName");

    if (sessionIsLoggedIn && sessionRole && sessionUserName) {
      setIsLoggedIn(sessionIsLoggedIn);
      setRole(sessionRole);
      setUserName(sessionUserName);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      isAdmin: role === 'admin' ? true : false,
      userName: userName,
      login: login,
      logout: logout
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={HomePage} />

          <Route path="/welcome" exact component={Welcome} />

          <Route path="/addbook" exact component={AddBook} />

          <Route path="/viewbooks" exact component={ViewBooks} />

          <Route path="/register" exact component={Register} />

          <Route path="/bookrequest" exact component={BookRequests} />

          <Route path="/returnBook" exact component={ReturnBook} />

          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
