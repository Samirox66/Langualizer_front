import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { IDeck } from '../store/decks';
import './SharedDecks.scss';

const SharedDecks = () => {
  const [decks, setDecks] = useState(Array<IDeck>);
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
    return <div key={index}>{deck.name}</div>;
  });

  return (
    <section className="shared-decks">
      <section className="shared-decks__container">{publishedDecks}</section>
    </section>
  );
};

export default SharedDecks;
