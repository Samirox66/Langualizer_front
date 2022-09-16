import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userActions } from '../store/user';

import './Header.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOnSignOutClick = (e) => {
    e.preventDefault();
    dispatch(userActions.signOut());
    navigate('/login');
  };
  const email = useAppSelector((state) => state.user.email);
  const userInfo =
    email == '' ? (
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
        <li className="header_item">
          <p className="header_user">{email}</p>
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
        <li className="header__item">
          <input className="header__find-deck" />
        </li>
        {userInfo}
      </ul>
    </header>
  );
};

export default Header;
