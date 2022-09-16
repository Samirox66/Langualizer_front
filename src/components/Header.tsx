import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__item">
          <Link to={'/'} className="header__home">
            Home
          </Link>
        </li>
        <li className="header__item">
          <Link to={'/'} className="header__home">
            Play
          </Link>
        </li>
        <li className="header__item">
          <input className="header__find-deck" />
        </li>
        <li className="header__item">
          <Link to={'/'} className="header__home">
            Sign in
          </Link>
        </li>
        <li className="header__item">
          <Link to={'/register'} className="header__home">
            Sign up
          </Link>
        </li>
        <li className="header__item">
          <Link to={'/'} className="header__home">
            Sign out
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
