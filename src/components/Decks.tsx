import React from 'react';
import { Link } from 'react-router-dom';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Decks.scss';

const Decks = () => {
  const decks = useAppSelector((state) => state.decks);
  const dispatch = useAppDispatch();

  const decksElements = decks.map((deck, index) => {
    const handleOnDeleteDeckButtonClick = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      dispatch(decksActions.deleteDeck(deck.name));
    };
    return (
      <section className="decks__deck" key={index}>
        <Link to={`/deck/${deck.name}`}>
          <button className="decks__deck-button">
            {deck.name.toUpperCase()}
          </button>
        </Link>
        <button
          onClick={handleOnDeleteDeckButtonClick}
          className="decks__delete-button"
        >
          X
        </button>
      </section>
    );
  });
  return (
    <section className="decks">
      <section className="decks__container">{decksElements}</section>
    </section>
  );
};

export default Decks;
