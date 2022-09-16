import React from 'react';
import { useParams } from 'react-router-dom';
import { decksActions, ILanguage } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import './Language.scss';

interface ILanguageProp extends ILanguage {
  phraseIndex: number;
  langIndex: number;
}

const Language = ({
  language,
  text,
  phraseIndex,
  langIndex,
}: ILanguageProp) => {
  const { deckName } = useParams();
  const dispatch = useAppDispatch();
  const handleOnChangeLang = (event) => {
    if (deckName) {
      dispatch(
        decksActions.changeLang({
          deckName: deckName,
          phraseIndex: phraseIndex,
          langIndex: langIndex,
          changedValue: event.target.value,
        })
      );
    }
  };
  const handleOnChangeText = (event) => {
    if (deckName) {
      dispatch(
        decksActions.changeText({
          deckName: deckName,
          phraseIndex: phraseIndex,
          langIndex: langIndex,
          changedValue: event.target.value,
        })
      );
    }
  };
  return (
    <section className="language">
      <section className="language__container">
        <section className="language__language">
          <label htmlFor="language">Choose language:</label>
          <input
            onChange={handleOnChangeLang}
            id="language"
            name="language"
            value={language}
          ></input>
        </section>
        <section className="language__text">
          <label htmlFor="language">Enter text:</label>
          <input
            onChange={handleOnChangeText}
            id="language"
            name="language"
            value={text}
          ></input>
        </section>
      </section>
    </section>
  );
};

export default Language;
