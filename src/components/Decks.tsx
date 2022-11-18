import { Button, Stack } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Decks.scss';

const Decks = () => {
  const decks = useAppSelector((state) => state.decks.decks);
  const dispatch = useAppDispatch();

  const decksElements = decks
    .filter((deck) => {
      return deck.visible == true;
    })
    .map((deck, index) => {
      const handleOnDeleteDeckButtonClick = (
        e: React.MouseEvent<HTMLButtonElement>
      ) => {
        e.preventDefault();
        dispatch(decksActions.deleteDeck(deck.name));
      };
      return (
        <Stack direction="horizontal" gap={2} key={index}>
          <Link to={`/deck/${deck.name}`}>
            <Button variant="success">{deck.name.toUpperCase()}</Button>
          </Link>
          <Button onClick={handleOnDeleteDeckButtonClick} variant="danger">
            X
          </Button>
        </Stack>
      );
    });
  return (
    <section className="decks">
      <Stack gap={3}>{decksElements}</Stack>
    </section>
  );
};

export default Decks;
