import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import './Decks.scss';

const Decks = () => {
  const decks = useAppSelector((state) => state.decks);
  console.log(decks);

  const decksElements = decks.map((deck, index) => {
    return (
      <Link key={index} to={`deck/${deck.name}`}>
        <button className="decks__deck-button">{deck.name}</button>
      </Link>
    );
  });
  return (
    <section className="decks">
      <section className="decks__container">{decksElements}</section>
    </section>
  );
};

export default Decks;
