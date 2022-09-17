import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { decksActions } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import { userActions } from '../store/user';

import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return;
    }
    axios
      .post(
        '/register',
        {
          username: username,
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
          userActions.setUsernameAndEmail({ username: username, email: email })
        );
        //dispatch(decksActions.setDecksFromDb({ email: email }));
        navigate('/');
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data);
        else console.log(error);
      });
  };

  return (
    <main className="sign-up">
      <section className="sign-up__container">
        <h1 className="sing-up__title">Registration</h1>
        <form className="sign-up__form" onSubmit={handleOnSubmit}>
          <label className="sign-up__label" htmlFor="username">
            Username:
          </label>
          <input
            className="sign_up__input"
            id="username"
            type="text"
            value={username}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className="sign-up__label" htmlFor="email">
            Email:
          </label>
          <input
            className="sign-up__input"
            id="email"
            type="email"
            value={email}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="sign-up__label" htmlFor="password">
            Password:
          </label>
          <input
            className="sign-up__input"
            id="password"
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Sing up</button>
        </form>
        <p>Already signed in?</p>
        <Link to="/login">Sign up</Link>
      </section>
    </main>
  );
};

export default SignUp;
