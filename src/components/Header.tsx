import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userActions } from '../store/user';

import './Header.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.username);
  const email = useAppSelector((state) => state.user.email);
  const handleOnSaveDecks = (e) => {
    e.preventDefault();
    dispatch(decksActions.saveDecksToDb({ email }));
  };
  const handleOnSignOutClick = (e) => {
    e.preventDefault();
    dispatch(userActions.signOut());
    dispatch(decksActions.saveDecksToDb({ email }));
    dispatch(decksActions.clearState());
    navigate('/login');
  };

  const handleOnSearchDeckChange = (e) => {};

  const userInfo =
    userName == '' ? (
      <>
        <li className="header__item">
          <Link to={'/login'} className="header__home">
            Sign in
          </Link>
        </li>
        <li className="header__item">
          <Link to={'/register'} className="header__home">
            Sign up
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="header__item">
          <input className="header__find-deck" />
        </li>
        <li className="header_item">
          <form onSubmit={handleOnSaveDecks}>
            <button>Save decks</button>
          </form>
        </li>
        <li className="header_item">
          <p className="header_user">{userName}</p>
        </li>
        <li className="header__item">
          <button onClick={handleOnSignOutClick} className="header__home">
            Sign out
          </button>
        </li>
      </>
    );
  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__item">
          <Link to={'/'} className="header__home">
            Home
          </Link>
        </li>
        <li className="header__item">
          <Link to={'/play'} className="header__home">
            Play
          </Link>
        </li>
        {userInfo}
      </ul>
    </header>
  );
};

export default Header;
