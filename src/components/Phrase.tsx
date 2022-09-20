import React from 'react';
import { useParams } from 'react-router-dom';
import { decksActions, ILanguage } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import Language from './Language';
import './Phrase.scss';

interface IPhraseProps {
  phrase: Array<ILanguage>;
  phraseIndex: number;
}

const Phrase = ({ phrase, phraseIndex }: IPhraseProps) => {
  const { deckName } = useParams();
  const phraseElements = phrase.map((language, langIndex) => {
    return (
      <Language
        language={language.language}
        text={language.text}
        key={phraseIndex}
        phraseIndex={phraseIndex}
        langIndex={langIndex}
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
        <button
          onClick={handleOnAddLangButtonClick}
          className="phrase__add-lang-button"
        >
          Add language
        </button>
        {phraseElements}
        <button
          className="phrase__delete-button"
          onClick={handleOnDeletePhraseButtonClick}
        >
          X
        </button>
      </section>
    </section>
  );
};

export default Phrase;
