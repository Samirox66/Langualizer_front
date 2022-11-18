import React, { useState } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { decksActions, ILanguage } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Language from './Language';
import './Phrase.scss';

interface IPhraseProps {
  phrase: Array<ILanguage>;
  phraseIndex: number;
  notFilteredLanguages: Array<string>;
  deckPhrasesLength: number;
}

const Phrase = ({
  phrase,
  phraseIndex,
  notFilteredLanguages,
  deckPhrasesLength,
}: IPhraseProps) => {
  const { deckName } = useParams();
  if (!deckName) {
    return <div>No such deck</div>;
  }
  const [showDeletePhraseModal, setShowDeletePhraseModal] = useState(false);

  const handleCloseDeletePhraseModal = () => {
    setShowDeletePhraseModal(false);
  };

  const handleShowDeletePhraseModal = () => {
    setShowDeletePhraseModal(true);
  };

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
    dispatch(decksActions.addNewLang({ deckName: deckName, phraseIndex }));
  };

  const handleOnDeletePhraseButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowDeletePhraseModal(false);
    dispatch(decksActions.deletePhrase({ deckName, phraseIndex }));
  };

  return (
    <>
      <section className="phrase">
        <section className="phrase__container">
          <Stack gap={2} direction="horizontal">
            <Button
              size="lg"
              onClick={handleOnAddLangButtonClick}
              variant="success"
            >
              Add translation
            </Button>
            <Button
              size="lg"
              disabled={deckPhrasesLength == 1}
              onClick={handleShowDeletePhraseModal}
              variant="danger"
            >
              Delete phrase
            </Button>
          </Stack>
          {phraseElements}
        </section>
      </section>
      <Modal show={showDeletePhraseModal} onHide={handleCloseDeletePhraseModal}>
        <Modal.Body>
          <Stack>
            <p>Do you want to delete this phrase?</p>
            <Stack direction="horizontal" gap={3}>
              <Button onClick={handleCloseDeletePhraseModal} variant="primary">
                Cancel
              </Button>
              <Button
                onClick={handleOnDeletePhraseButtonClick}
                variant="primary"
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Phrase;
