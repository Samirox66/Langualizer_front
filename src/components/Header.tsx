import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userActions } from '../store/user';

import './Header.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.username);
  const email = useAppSelector((state) => state.user.email);
  const handleOnSignOutClick = (e) => {
    e.preventDefault();
    dispatch(userActions.signOut());
    dispatch(decksActions.saveDecksToDb({ email }));
    dispatch(decksActions.clearState());
    navigate('/login');
  };

  const userInfo =
    userName == '' ? (
      <>
        <Nav.Link>
          <Link to={'/login'} className="header__link">
            Sign in
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={'/register'} className="header__link">
            Sign up
          </Link>
        </Nav.Link>
      </>
    ) : (
      <>
        <Nav.Link>
          <Link to={'/decks/shared'} className="header__link">
            Load decks
          </Link>
        </Nav.Link>
        <p className="header__user">{userName}</p>
        <Nav.Link>
          <Button onClick={handleOnSignOutClick} variant="primary">
            Sign out
          </Button>
        </Nav.Link>
      </>
    );
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} className="header__link">
            Langualizer
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">{userInfo}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
