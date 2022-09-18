import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { decksActions, loadDecksFromDb } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import { userActions } from '../store/user';

import './SignIn.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    let decks = null;
    axios
      .post(
        '/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(
          userActions.setUsernameAndEmail({ username: response.data, email })
        );
        dispatch(loadDecksFromDb(email));
        navigate('/');
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data);
        else console.log(error);
      });
  };

  return (
    <main className="sign-in">
      <section className="sign-in__container">
        <h1 className="sing-in__title">Authorization</h1>
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
