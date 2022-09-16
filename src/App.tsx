import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import Deck from './routes/Deck';
import Learn from './routes/Learn';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Learn />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path="/deck/:deckName"
          element={
            <AuthRoute>
              <Deck />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
