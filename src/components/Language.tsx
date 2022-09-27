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
  const [filterLangs, setFilterLangs] = useState(languages);
  const handleOnPeekLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    language: string
  ) => {
    event.preventDefault();
    console.log(language);
    if (deckName) {
      dispatch(
        decksActions.changeLang({
          deckName,
          phraseIndex,
          langIndex,
          changedValue: language,
        })
      );

      setLanguageFocused(false);
    }
  };
  const peekLanguageElement = filterLangs.map((language, index) => {
    return (
      <button
        className="language__peek-language"
        onClick={(e) => handleOnPeekLangButtonClick(e, language)}
        key={index}
        type="button"
      >
        {language}
      </button>
    );
  });
  const handleOnChangeLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (deckName) {
      dispatch(
        decksActions.changeLang({
          deckName,
          phraseIndex,
          langIndex,
          changedValue: event.currentTarget.value,
        })
      );
    }
    if (languageFocused) {
      setFilterLangs(
        languages.filter((language) => {
          return language
            .toLowerCase()
            .includes(event.currentTarget.value.toLowerCase());
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
              id="language"
              name="language"
              value={language}
              className="language__input"
            />
            {languageFocused && (
              <section className="language__peek-languages">
                {peekLanguageElement}
              </section>
            )}
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
