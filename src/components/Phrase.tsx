import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { decksActions, ILanguage } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import Language from './Language';
import './Phrase.scss';

interface IPhraseProps {
  phrase: Array<ILanguage>;
  phraseIndex: number;
  notFilteredLanguages: Array<string>;
}

const Phrase = ({
  phrase,
  phraseIndex,
  notFilteredLanguages,
}: IPhraseProps) => {
  const { deckName } = useParams();
  const phraseElements = phrase
    .filter((language) => !notFilteredLanguages.includes(language.language))
    .map((language) => {
      return (
        <Language
          language={language.language}
          text={language.text}
          key={language.key}
          phraseIndex={phraseIndex}
          langIndex={language.key}
        />
      );
    });
  const dispatch = useAppDispatch();

  const handleOnAddLangButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (deckName) {
      dispatch(decksActions.addNewLang({ deckName: deckName, phraseIndex }));
    }
  };

  const handleOnDeletePhraseButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (deckName) {
      dispatch(decksActions.deletePhrase({ deckName, phraseIndex }));
    }
  };

  return (
    <section className="phrase">
      <section className="phrase__container">
        <Button onClick={handleOnAddLangButtonClick} variant="success">
          Add translation
        </Button>
        {phraseElements}
        <Button onClick={handleOnDeletePhraseButtonClick} variant="danger">
          X
        </Button>
      </section>
    </section>
  );
};

export default Phrase;
