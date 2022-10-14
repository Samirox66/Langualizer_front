import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Phrase from '../components/Phrase';
import languages from '../data/languages';
import { decksActions } from '../store/decks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './Deck.scss';

const Deck = () => {
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

  const deckPhrases = deck?.phrases?.map((phrase, index) => {
    return (
      <Phrase
        phrase={phrase}
        key={index}
        phraseIndex={index}
        notFilteredLanguages={filterLanguages
          .filter((language) => !language.checked)
          .map((language) => language.language)}
      />
    );
  });

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
    if (deckName) {
      dispatch(decksActions.addNewPhrase(deckName));
    }
  };

  const handleOnPublishDeckButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  return (
    <section className="deck">
      <section className="deck__container">
        <section className="deck__actions">
          <button onClick={handleOnAddPhraseButtonClick}>Add phrase</button>
          <Link to={`play`}>
            <button type="button">Play</button>
          </Link>
          <button onClick={handleOnPublishDeckButtonClick}>Publish Deck</button>
        </section>
        <section className="deck__filter-languages">
          {languagesElements}
        </section>
        {deckPhrases}
      </section>
    </section>
  );
};

export default Deck;
