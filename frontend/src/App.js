import React, { useState, useCallback } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AddBook from './addbook/AddBook';
import Welcome from './welcome/Welcome';
import ViewBooks from './viewbook/ViewBooks';
import Register from './register/Register.js';
import BookRequests from './bookrequest/BookRequests.js';
import { AuthContext } from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');

  const login = useCallback((userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const setUName = useCallback((userName) => {
    setUserName(userName);
  })


  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      isAdmin: role === 'admin' ? true : false,
      userName: userName,
      login: login,
      logout: logout,
      setUserName: setUName
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={HomePage} />

          <Route path="/welcome" exact component={Welcome} />

          <Route path="/addbook" exact component={AddBook} />

          <Route path="/viewbooks" exact component={ViewBooks} />

          <Route path="/register" exact component={Register} />

          <Route path="/bookrequest" exact component={BookRequests} />

          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
