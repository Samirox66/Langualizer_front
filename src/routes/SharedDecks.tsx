import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const SharedDecks = () => {
  const [decks, setDecks] = useState('');
  useEffect(() => {
    axios
      .get(`/home/sharedDecks`, {
        withCredentials: true,
      })
      .then((response) => {
        setDecks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>{decks}</div>;
};

export default SharedDecks;
