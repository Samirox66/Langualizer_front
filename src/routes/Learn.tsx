import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Decks from '../components/Decks';
import { decksActions, saveDeckToDb } from '../store/decks';
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

  const handleOnAddDeck = (event) => {
    event.preventDefault();
    if (newDeck == '') {
      return;
    }
    dispatch(saveDeckToDb({ deckName: newDeck, email }));
  };
  return (
    <section className="learn">
      <section className="learn__container">
        <section className="learn__buttons">
          <Form onSubmit={handleOnAddDeck}>
            <Form.Group className="mb-3" controlId="newDeck">
              <Form.Label>New deck name:</Form.Label>
              <Form.Control
                value={newDeck}
                type="text"
                onChange={(e) => {
                  setNewDeck(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add deck
            </Button>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="searchDeck">
              <Form.Label>Search:</Form.Label>
              <Form.Control onChange={handleOnSearchDeckChange} />
            </Form.Group>
          </Form>
          {/* <Form onSubmit={handleOnSaveDecks}>
            <Stack>
              <Form.Label>Save decks:</Form.Label>
              <Button variant="primary" type="submit">
                &#10003;
              </Button>
            </Stack>
          </Form> */}
        </section>
        <Decks />
      </section>
    </section>
  );
};

export { IDeckData };
export default Learn;
