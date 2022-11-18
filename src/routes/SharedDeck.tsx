import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import './SharedDeck.scss';

interface ISharedDeckProp {
  description: string;
  name: string;
  phrase: Array<{ language: string; text: string }>;
}

const SharedDeck = ({ description, name, phrase }: ISharedDeckProp) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="shared-deck__button"
        onClick={() => setOpen(!open)}
        aria-controls={name}
        aria-expanded={open}
        variant="primary"
      >
        {name}
      </Button>

      <Collapse in={open}>
        <p id={name}>{description}</p>
      </Collapse>
    </>
  );
};

export default SharedDeck;
