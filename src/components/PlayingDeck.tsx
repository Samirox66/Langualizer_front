import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface IPlayingDeckProp {
  firstLang: string;
  secondLang: string;
}

const PlayingDeck = ({ firstLang, secondLang }: IPlayingDeckProp) => {
  const handleCheckTranslationButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const { deckName } = useParams();
  if (!deckName) {
    return <div>No such deck</div>;
  }
  console.log(deckName);

  const deck = useAppSelector((state) =>
    state.decks.decks.find((deck) => deck.name == deckName.toString())
  );

  if (!deck) {
    return <div>NO such deck</div>;
  }

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [translation, setTranslation] = useState('');

  return (
    <Stack gap={3}>
      <p>{firstLang}</p>
      <p>
        {
          deck.phrases[currentPhraseIndex].find(
            (lang) => lang.language == firstLang
          )?.text
        }
      </p>
      <p>{secondLang}</p>
      <input
        value={translation}
        onChange={(e) => setTranslation(e.currentTarget.value)}
      />
      <Button onClick={handleCheckTranslationButtonClick}>Check</Button>
    </Stack>
  );
};

export default PlayingDeck;
