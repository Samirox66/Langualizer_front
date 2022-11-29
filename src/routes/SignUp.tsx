import { Button, Form } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { decksActions, loadDecksFromDb } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import { userActions } from '../store/user';

import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({ has: false, what: '' });
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
        dispatch(userActions.setUsernameAndEmail({ username, email }));
        dispatch(loadDecksFromDb(email));
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setError({ has: true, what: error.response.data });
        } else {
          console.log(error);
          setError({ has: true, what: 'Erorr' });
        }
      });
  };

  return (
    <main className="sign-up">
      <section className="sign-up__container">
        <h1 className="sing-up__title">Registration</h1>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="signUpUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button type="submit">Sing up</Button>
          {error.has && <p className="sign-up__error">{error.what}</p>}
        </Form>
        <p className="sign-up__text">Already signed in?</p>
        <Link className="sign-up__link" to="/login">
          Sign in
        </Link>
      </section>
    </main>
  );
};

export default SignUp;
