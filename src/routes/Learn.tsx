import React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import Decks from '../components/Decks';
import { decksActions } from '../store/decks';

interface IDeckData {
  name: string;
}

const Learn = () => {
  const [newDeck, setNewDeck] = useState('');
  const dispatch = useAppDispatch();

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
        <form onSubmit={handleOnAddDeck}>
          <label htmlFor="newDeck">New deck name:</label>
          <input
            id="newDeck"
            value={newDeck}
            type="text"
            onChange={(e) => {
              setNewDeck(e.target.value);
            }}
          />
          <button>Add deck</button>
        </form>
        <Decks />
      </section>
    </section>
  );
};

export { IDeckData };
export default Learn;
