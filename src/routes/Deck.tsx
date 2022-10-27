import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Phrase from '../components/Phrase';
import languages from '../data/languages';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Button, Stack } from 'react-bootstrap';
import './Deck.scss';

const Deck = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [filterLanguages, setFilterLanguages] = useState(
    languages.map((language) => {
      return { language, checked: true };
    })
  );
  const [allLanguages, setAllLanguages] = useState(true);
  const { deckName } = useParams();
  const deck = useAppSelector((state) => {
    return state.decks.decks.find((phrase) => phrase.name == deckName);
  });
  if (!deck || !deckName) {
    return <div>No such deck</div>;
  }
  const handleOnLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLanguages(
      filterLanguages.map((language) => {
        if (language.language == e.currentTarget.value) {
          return { language: language.language, checked: !language.checked };
        }

        return { language: language.language, checked: language.checked };
      })
    );
  };

  const handleOnAllLanguagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (allLanguages) {
      setFilterLanguages(
        filterLanguages.map((language) => {
          return { language: language.language, checked: false };
        })
      );
    } else {
      setFilterLanguages(
        filterLanguages.map((language) => {
          return { language: language.language, checked: true };
        })
      );
    }
    setAllLanguages(!allLanguages);
  };
  if (currentPhraseIndex >= deck.phrases.length && currentPhraseIndex != 0) {
    setCurrentPhraseIndex((prev) => prev - 1);
  }

  const phrase = (
    <Phrase
      phrase={deck.phrases[currentPhraseIndex]}
      phraseIndex={currentPhraseIndex}
      notFilteredLanguages={filterLanguages
        .filter((language) => !language.checked)
        .map((language) => language.language)}
      deckPhrasesLength={deck.phrases.length}
    />
  );

  const languagesElements = filterLanguages.map((language) => {
    return (
      <>
        <input
          checked={language.checked}
          onChange={handleOnLanguageChange}
          type="checkbox"
          name="filter"
          id={language.language}
          value={language.language}
        />
        <label className="deck__filter-language" htmlFor={language.language}>
          {language.language}
        </label>
      </>
    );
  });
  languagesElements.push(
    <>
      <input
        checked={allLanguages}
        onChange={handleOnAllLanguagesChange}
        type="checkbox"
        name="filter"
        id="All"
        value="All"
      />
      <label htmlFor="All">All</label>
    </>
  );
  const dispatch = useAppDispatch();
  const handleOnAddPhraseButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(decksActions.addNewPhrase(deckName));
    setCurrentPhraseIndex(deck.phrases.length);
  };

  const handleOnPublishDeckButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handlePrevPhraseButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setCurrentPhraseIndex((prev) => {
      return (prev + deck?.phrases.length - 1) % deck?.phrases.length;
    });
  };

  const handleNextPhraseButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setCurrentPhraseIndex((prev) => {
      return (prev + 1) % deck?.phrases.length;
    });
  };

  return (
    <section className="deck">
      <section className="deck__container">
        <Stack direction="horizontal" gap={3}>
          <Button variant="primary" onClick={handleOnAddPhraseButtonClick}>
            Add phrase
          </Button>
          <Link to={`play`}>
            <Button>Play</Button>
          </Link>
          <Button variant="primary" onClick={handleOnPublishDeckButtonClick}>
            Publish Deck
          </Button>
          <Button variant="info" onClick={handlePrevPhraseButtonClick}>
            prev
          </Button>
          <Button variant="info" onClick={handleNextPhraseButtonClick}>
            next
          </Button>
        </Stack>
        <section className="deck__filter-languages">
          {languagesElements}
        </section>
        {phrase}
      </section>
    </section>
  );
};

export default Deck;
