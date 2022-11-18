import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import axios from '../api/axios';
import { IDeck } from '../store/decks';
import SharedDeck from './SharedDeck';
import './SharedDecks.scss';

interface ISharedDeck extends IDeck {
  description: string;
}

const SharedDecks = () => {
  const [decks, setDecks] = useState(Array<ISharedDeck>);
  useEffect(() => {
    axios
      .get(`/home/sharedDecks`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        setDecks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const publishedDecks = decks.map((deck, index) => {
    return (
      <SharedDeck
        key={index}
        description={deck.description}
        name={deck.name}
        phrase={deck.phrases[0]}
      />
    );
  });

  return (
    <section className="shared-decks">
      <section className="shared-decks__container">
        <Stack gap={3}>
          <h1>Shared decks:</h1>
          {publishedDecks}
        </Stack>
      </section>
    </section>
  );
};

export default SharedDecks;
