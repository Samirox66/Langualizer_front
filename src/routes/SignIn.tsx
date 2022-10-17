import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
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
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="signInEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signInPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sing in
          </Button>
        </Form>
        <p>Do not have an account yet?</p>
        <Link to="/registration">Sign up</Link>
      </section>
    </main>
  );
};

export default SignIn;
