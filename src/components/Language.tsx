import { Form, Button, Stack, Modal } from 'react-bootstrap';
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
  const [showDeleteLangModal, setShowDeleteLangModal] = useState(false);
  const { deckName } = useParams();
  const dispatch = useAppDispatch();
  const [languageFocused, setLanguageFocused] = useState(false);
  const [filterLangs, setFilterLangs] = useState(languages);

  const handleCloseDeleteLangModal = () => {
    setShowDeleteLangModal(false);
  };

  const handleShowDeleteLangModal = () => {
    setShowDeleteLangModal(true);
  };

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
    setShowDeleteLangModal(false);
    if (deckName) {
      dispatch(decksActions.deleteLang({ deckName, phraseIndex, langIndex }));
    }
  };
  return (
    <>
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
                className="language__input-lang"
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
              as="textarea"
              className="language__input-text"
            />
          </section>
          <Button
            className="language__delete-button"
            variant="danger"
            onClick={handleShowDeleteLangModal}
          >
            X
          </Button>
        </Stack>
      </section>
      <Modal show={showDeleteLangModal} onHide={handleCloseDeleteLangModal}>
        <Modal.Body>
          <Stack>
            <p>Do you want to delete {language} translation?</p>
            <Stack direction="horizontal" gap={3}>
              <Button onClick={handleCloseDeleteLangModal} variant="primary">
                Cancel
              </Button>
              <Button onClick={handleOnDeleteLangButtonClick} variant="primary">
                Delete
              </Button>
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Language;
