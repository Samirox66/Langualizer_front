import React, { useState } from 'react';
import { Button, Collapse, Modal, Stack } from 'react-bootstrap';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './SharedDeck.scss';
import { ISharedDeck } from './SharedDecks';

interface ISharedDeckProp {
  deck: ISharedDeck;
}

const SharedDeck = ({ deck }: ISharedDeckProp) => {
  const [showFixNameModal, setShowFixNameModal] = useState(false);
  const { description, name } = deck;
  const phrase = deck.phrases[0];
  const deckNames = useAppSelector((state) =>
    state.decks.decks.map((deck) => deck.name)
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (deckNames.find((deckName) => deckName == deck.name)) {
      setShowFixNameModal(true);
      return;
    }
    dispatch(decksActions.saveSharedDeck({ deck: { ...deck, visible: true } }));
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

  const handleCloseFixNameModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowFixNameModal(false);
  };

  return (
    <>
      <Button
        className="shared-deck__button"
        onClick={() => setOpen(!open)}
        aria-controls={name}
        aria-expanded={open}
        variant="info"
      >
        {name}
      </Button>

      <Collapse in={open}>
        <Stack gap={2} id={name}>
          <p className="shared-deck__description">{description}</p>
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

      <Modal show={showFixNameModal} onHide={handleCloseFixNameModal}>
        <Button onClick={handleCloseFixNameModal} variant="primary">
          Close
        </Button>
      </Modal>
    </>
  );
};

export default SharedDeck;
