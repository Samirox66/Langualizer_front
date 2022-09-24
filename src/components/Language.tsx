import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import languages from '../data/languages';
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
  const [languageFocused, setLanguageFocused] = useState(false);
  const peekLanguageElement = languages.map((language, index) => {
    return (
      <div className="language__peek-language" key={index}>
        {language}
      </div>
    );
  });
  const handleOnChangeLang = (event) => {
    if (deckName) {
      dispatch(
        decksActions.changeLang({
          deckName,
          phraseIndex,
          langIndex,
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
  const handleOnDeleteLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (deckName) {
      dispatch(decksActions.deleteLang({ deckName, phraseIndex, langIndex }));
    }
  };
  return (
    <section className="language">
      <section className="language__container">
        <section className="language__language">
          <label className="language__label" htmlFor="language">
            Choose language:
          </label>
          <section className="language__peek">
            <input
              onChange={handleOnChangeLang}
              onFocus={(e) => setLanguageFocused(true)}
              onBlur={(e) => setLanguageFocused(false)}
              id="language"
              name="language"
              value={language}
              className="language__input"
            />
            {languageFocused && peekLanguageElement}
          </section>
        </section>
        <section className="language__text">
          <label className="language__label" htmlFor="language">
            Enter text:
          </label>
          <input
            onChange={handleOnChangeText}
            id="language"
            name="language"
            value={text}
            className="language__input"
          ></input>
        </section>
        <button
          className="language__delete-button"
          onClick={handleOnDeleteLangButtonClick}
        >
          X
        </button>
      </section>
    </section>
  );
};

export default Language;
