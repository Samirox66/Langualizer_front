import React, { useState } from 'react';
import { Button, Collapse, Form, Modal, Stack } from 'react-bootstrap';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './SharedDeck.scss';
import { ISharedDeck } from './SharedDecks';

interface ISharedDeckProp {
  deck: ISharedDeck;
}

const SharedDeck = ({ deck }: ISharedDeckProp) => {
  const [showFixName, setShowFixName] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deckName, setDeckName] = useState(deck.name);
  const phrase = deck.phrases[0];
  const deckNames = useAppSelector((state) =>
    state.decks.decks.map((deck) => deck.name)
  );
  let isDeckUnique = true;
  if (deckNames.find((name) => deckName == name)) {
    isDeckUnique = false;
  }

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isDeckUnique) {
      setShowFixName(true);
    }
    setShowConfirmModal(true);
  };

  const translations = phrase.map((translation) => {
    return (
      <Stack direction="horizontal" className="shared-deck__translation">
        <Stack className="shared-deck__stack-fix">
          <p className="shared-deck__label">Language</p>
          <p className="shared-deck__text">{translation.language}</p>
        </Stack>
        <Stack className="shared-deck__stack-fix">
          <p className="shared-deck__label">Translation</p>
          <p className="shared-deck__text">{translation.text}</p>
        </Stack>
      </Stack>
    );
  });

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setShowFixName(false);
  };

  const handleConfirmButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmModal(false);
    setShowFixName(false);
    dispatch(
      decksActions.saveSharedDeck({
        deck: { ...deck, visible: true, name: deckName },
      })
    );
  };

  return (
    <>
      <Button
        className="shared-deck__button"
        onClick={() => setOpen(!open)}
        aria-controls={deckName}
        aria-expanded={open}
        variant="info"
      >
        {deck.name}
      </Button>

      <Collapse in={open}>
        <Stack gap={2} id={deckName}>
          <p className="shared-deck__description">{deck.description}</p>
          {translations}
          <Button
            variant="primary"
            onClick={handleSaveButton}
            className="shared-deck__save-button"
          >
            Save
          </Button>
        </Stack>
      </Collapse>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Body>
          <Stack gap={2}>
            {showFixName ? (
              <>
                <p>
                  You already have a deck with this name, please, type unique
                  name:
                </p>
                <Form.Control
                  value={deckName}
                  onChange={(e) => setDeckName(e.currentTarget.value)}
                />
              </>
            ) : (
              <>
                <p>Do you want to save {deckName} deck?</p>
              </>
            )}
            <Stack direction="horizontal" gap={3}>
              <Button onClick={handleCloseConfirmModal} variant="primary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmButtonClick}
                variant="primary"
                disabled={!isDeckUnique}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SharedDeck;
