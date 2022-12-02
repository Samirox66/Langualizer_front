import { Button, Modal, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { decksActions, deleteDeck } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Decks.scss';

const Decks = () => {
  const decks = useAppSelector((state) => state.decks.decks);
  const email = useAppSelector((state) => state.user.email);
  const initialState: Array<boolean> = [];
  for (let i = 0; i < decks.length; ++i) {
    if (decks[i].visible) {
      initialState.push(false);
    }
  }
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(initialState);
  const dispatch = useAppDispatch();
  console.log(initialState);

  const handleCloseDeleteDeckModal = (index: number) => {
    setShowDeleteDeckModal((prev) => {
      return [...prev.slice(0, index), false, ...prev.slice(index + 1)];
    });
  };

  const handleShowDeleteDeckModal = (index: number) => {
    setShowDeleteDeckModal((prev) => {
      return [...prev.slice(0, index), true, ...prev.slice(index + 1)];
    });
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
        setShowDeleteDeckModal((prev) => {
          return [...prev.slice(0, index), false, ...prev.slice(index + 1)];
        });
        dispatch(deleteDeck({ deckName: deck.name, email: email }));
      };

      return (
        <div key={index}>
          <Stack direction="horizontal" gap={2}>
            <Link to={`/deck/${deck.name}`}>
              <Button variant="success">{deck.name.toUpperCase()}</Button>
            </Link>
            <Button
              onClick={() => handleShowDeleteDeckModal(index)}
              variant="danger"
            >
              X
            </Button>
          </Stack>
          <Modal
            show={showDeleteDeckModal[index]}
            onHide={() => handleCloseDeleteDeckModal(index)}
          >
            <Modal.Body>
              <Stack>
                <p>Do you want to delete '{deck.name}' deck?</p>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    onClick={() => handleCloseDeleteDeckModal(index)}
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
        </div>
      );
    });
  return (
    <section className="decks">
      <Stack gap={3}>{decksElements}</Stack>
    </section>
  );
};

export default Decks;
