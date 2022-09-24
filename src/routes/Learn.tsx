import React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Decks from '../components/Decks';
import { decksActions } from '../store/decks';
import './Learn.scss';

interface IDeckData {
  name: string;
}

const Learn = () => {
  const [newDeck, setNewDeck] = useState('');
  const email = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  const handleOnSearchDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(decksActions.filterDecks({ deckRegex: e.currentTarget.value }));
  };
  const handleOnSaveDecks = (e) => {
    e.preventDefault();
    dispatch(decksActions.saveDecksToDb({ email }));
  };
  const handleOnAddDeck = (event) => {
    event.preventDefault();
    if (newDeck == '') {
      return;
    }
    dispatch(decksActions.addNewDeck(newDeck));
  };
  return (
    <section className="learn">
      <section className="learn__container">
        <section className="learn__buttons">
          <form onSubmit={handleOnAddDeck} className="learn__new-deck-from">
            <label className="learn__label" htmlFor="newDeck">
              New deck name:
            </label>
            <input
              id="newDeck"
              className="learn__new-deck-input"
              value={newDeck}
              type="text"
              onChange={(e) => {
                setNewDeck(e.target.value);
              }}
            />
            <button>Add deck</button>
          </form>
          <form className="learn__search-form">
            <label className="learn__label" htmlFor="searchDeck">
              Search:
            </label>
            <input
              id="searchDeck"
              className="learn__find-deck"
              onChange={handleOnSearchDeckChange}
            />
          </form>
          <form onSubmit={handleOnSaveDecks}>
            <button>Save decks</button>
          </form>
        </section>
        <Decks />
      </section>
    </section>
  );
};

export { IDeckData };
export default Learn;
