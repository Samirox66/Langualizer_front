import { Button, Modal, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Decks.scss';

const Decks = () => {
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const decks = useAppSelector((state) => state.decks.decks);
  const dispatch = useAppDispatch();

  const handleCloseDeleteDeckModal = () => {
    setShowDeleteDeckModal(false);
  };

  const handleShowDeleteDeckModal = () => {
    setShowDeleteDeckModal(true);
  };

  const decksElements = decks
    .filter((deck) => {
      return deck.visible == true;
    })
    .map((deck, index) => {
      const handleConfirmDeleteDeckButtonClick = (
        e: React.MouseEvent<HTMLButtonElement>
      ) => {
        e.preventDefault();
        setShowDeleteDeckModal(false);
        dispatch(decksActions.deleteDeck(deck.name));
      };

      return (
        <>
          <Stack direction="horizontal" gap={2} key={index}>
            <Link to={`/deck/${deck.name}`}>
              <Button variant="success">{deck.name.toUpperCase()}</Button>
            </Link>
            <Button onClick={handleShowDeleteDeckModal} variant="danger">
              X
            </Button>
          </Stack>
          <Modal show={showDeleteDeckModal} onHide={handleCloseDeleteDeckModal}>
            <Modal.Body>
              <Stack>
                <p>Do you want to delete '{deck.name}' deck?</p>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    onClick={handleCloseDeleteDeckModal}
                    variant="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmDeleteDeckButtonClick}
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
    });
  return (
    <section className="decks">
      <Stack gap={3}>{decksElements}</Stack>
    </section>
  );
};

export default Decks;
