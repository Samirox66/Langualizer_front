import { Form, Button, Stack } from 'react-bootstrap';
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
    if (deckName) {
      dispatch(
        decksActions.changeLang({
          deckName,
          phraseIndex,
          langIndex,
          changedValue: language,
        })
      );

      setFilterLangs([language]);
      setLanguageFocused(false);
    }
  };
  const peekLanguageElement = filterLangs.map((language, index) => {
    return (
      <Button
        variant="light"
        onClick={(e) => handleOnPeekLangButtonClick(e, language)}
        key={index}
        type="button"
        className="language__peek-language"
      >
        {language}
      </Button>
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
      <Stack>
        <section className="language__language">
          <label className="language__label" htmlFor="language">
            Choose language:
          </label>
          <section className="language__peek">
            <Form.Control
              onChange={handleOnChangeLang}
              onFocus={(e) => setLanguageFocused(true)}
              id="language"
              name="language"
              value={language}
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
          <Form.Control
            onChange={handleOnChangeText}
            id="language"
            name="language"
            value={text}
          />
        </section>
        <Button variant="danger" onClick={handleOnDeleteLangButtonClick}>
          X
        </Button>
      </Stack>
    </section>
  );
};

export default Language;
