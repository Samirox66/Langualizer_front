import React from 'react';
import { useParams } from 'react-router-dom';
import { decksActions, ILanguage } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import Language from './Language';
import './Phrase.scss';

interface IPhraseProps {
  phrase: Array<ILanguage>;
  index: number;
}

const Phrase = ({ phrase, index }: IPhraseProps) => {
  const { deckName } = useParams();
  const phraseElements = phrase.map((language, langIndex) => {
    return (
      <Language
        language={language.language}
        text={language.text}
        key={index}
        phraseIndex={index}
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
      dispatch(decksActions.addNewLang({ deckName: deckName, index: index }));
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
      </section>
    </section>
  );
};

export default Phrase;
