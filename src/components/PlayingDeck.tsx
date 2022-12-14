import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import './PlayingDeck.scss';

interface IPlayingDeckProp {
  firstLang: string;
  secondLang: string;
}

const PlayingDeck = ({ firstLang, secondLang }: IPlayingDeckProp) => {
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [answerClassName, setAnswerClassName] = useState('');

  const { deckName } = useParams();
  if (!deckName) {
    return <div>No such deck</div>;
  }
  console.log(deckName);

  const deck = useAppSelector((state) =>
    state.decks.decks.find((deck) => deck.name == deckName.toString())
  );

  if (!deck) {
    return <div>No such deck</div>;
  }

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [translation, setTranslation] = useState('');

  const rightTranslation = deck.phrases[currentPhraseIndex].find(
    (lang) => lang.language == secondLang
  )?.text;
  if (rightTranslation == undefined) {
    return <div>Sorry, something went wrong</div>;
  }

  const handleCheckTranslationButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(translation, rightTranslation);

    if (translation == rightTranslation) {
      setAnswerClassName('playing-deck__right-translation');
      setShowRightAnswer(true);
    } else {
      setAnswerClassName('playing-deck__wrong-translation');
    }
  };

  return (
    <Stack gap={3} className="playing-deck">
      <p className="playing-deck__lang">{firstLang}:</p>
      <p className="playing-deck__text">
        {
          deck.phrases[currentPhraseIndex].find(
            (lang) => lang.language == firstLang
          )?.text
        }
      </p>
      <p className="playing-deck__lang">{secondLang}:</p>
      <Form.Control
        value={translation}
        onChange={(e) => setTranslation(e.currentTarget.value)}
        className={answerClassName}
        disabled={showRightAnswer}
      />
      {!showRightAnswer ? (
        <>
          <Button onClick={handleCheckTranslationButtonClick}>Check</Button>
          {answerClassName == 'playing-deck__wrong-translation' && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShowRightAnswer(true);
              }}
            >
              Show right answer
            </Button>
          )}
        </>
      ) : (
        <>
          {answerClassName == 'playing-deck__wrong-translation' && (
            <>
              <p className="playing-deck__lang">Answer:</p>
              <p>{rightTranslation}</p>
            </>
          )}
          <Button
            onClick={() => {
              setCurrentPhraseIndex((prev) => (prev + 1) % deck.phrases.length);
              setShowRightAnswer(false);
              setTranslation('');
            }}
          >
            Next
          </Button>
        </>
      )}
    </Stack>
  );
};

export default PlayingDeck;
