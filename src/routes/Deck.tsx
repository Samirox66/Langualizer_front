import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Phrase from '../components/Phrase';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Deck = () => {
  const { deckName } = useParams();
  const deck = useAppSelector((state) => {
    return state.decks.find((phrase) => phrase.name == deckName);
  });
  const deckPhrases = deck?.phrases?.map((phrase, index) => {
    return <Phrase phrase={phrase} key={index} index={index} />;
  });
  const dispatch = useAppDispatch();
  const handleOnAddPhraseButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (deckName) {
      dispatch(decksActions.addNewPhrase(deckName));
    }
  };
  return (
    <section className="deck">
      <section className="deck__container">
        <button onClick={handleOnAddPhraseButtonClick}>Add phrase</button>
        {deckPhrases}
      </section>
    </section>
  );
};

export default Deck;
