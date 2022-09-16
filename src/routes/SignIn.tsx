import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

import './SignIn.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
  };

  return (
    <main className="sign-in">
      <section className="sign-in__container">
        <h1 className="sing-in__title">Registration</h1>
        <form className="sign-in__form" onSubmit={handleOnSubmit}>
          <label className="sign-in__label" htmlFor="email">
            Email:
          </label>
          <input
            className="sign-in__input"
            id="email"
            type="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="sign-in__label" htmlFor="password">
            Password:
          </label>
          <input
            className="sign-in__input"
            id="password"
            type="password"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Sing in</button>
        </form>
        <p>Do not have an account yet?</p>
        <Link to="/registration">Sign up</Link>
      </section>
    </main>
  );
};

export default SignIn;
