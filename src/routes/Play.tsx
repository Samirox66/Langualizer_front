import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayingDeck from '../components/PlayingDeck';
import languages from '../data/languages';
import { decksActions } from '../store/decks';
import { useAppDispatch } from '../store/hooks';
import './Play.scss';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstLang, setFirstLang] = useState({ focused: false, value: '' });
  const [secondLang, setSecondLang] = useState({ focused: false, value: '' });
  const { deckName } = useParams();
  const dispatch = useAppDispatch();
  const [filterLangs, setFilterLangs] = useState(languages);

  const handleOnPeekLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    language: string,
    isFirst: boolean
  ) => {
    event.preventDefault();
    if (isFirst) {
      setFirstLang({ focused: false, value: language });
    } else {
      setSecondLang({ focused: false, value: language });
    }
  };
  const createPeekLanguages = (isFirst: boolean) => {
    return filterLangs.map((language, index) => {
      return (
        <button
          className="language__peek-language"
          onClick={(e) => handleOnPeekLangButtonClick(e, language, isFirst)}
          key={index}
          type="button"
        >
          {language}
        </button>
      );
    });
  };

  const handleOnChangeLang = (
    event: React.ChangeEvent<HTMLInputElement>,
    isFirst: boolean
  ) => {
    if (isFirst) {
      setFirstLang({
        focused: firstLang.focused,
        value: event.currentTarget.value,
      });
    } else {
      setSecondLang({
        focused: secondLang.focused,
        value: event.currentTarget.value,
      });
    }
  };

  const handleOnStartButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log(firstLang.focused, secondLang.focused);

    if (
      !firstLang.focused &&
      !secondLang.focused &&
      firstLang.value != '' &&
      secondLang.value! + '' &&
      firstLang.value != secondLang.value
    ) {
      setIsPlaying(true);
    }
  };

  return (
    <main className="play">
      <section className="play__container">
        {!isPlaying ? (
          <section className="play__choose">
            <label className="language__label" htmlFor="language">
              Choose first language:
            </label>
            <section className="language__peek">
              <input
                onChange={(e) => handleOnChangeLang(e, true)}
                onFocus={(e) =>
                  setFirstLang({ focused: true, value: firstLang.value })
                }
                id="language"
                name="language"
                value={firstLang.value}
                className="language__input"
              />
              {firstLang.focused && (
                <section className="language__peek-languages">
                  {createPeekLanguages(true)}
                </section>
              )}
            </section>
            <label className="language__label" htmlFor="language">
              Choose second language:
            </label>
            <section className="language__peek">
              <input
                onChange={(e) => handleOnChangeLang(e, false)}
                onFocus={(e) =>
                  setSecondLang({ focused: true, value: secondLang.value })
                }
                id="language"
                name="language"
                value={secondLang.value}
                className="language__input"
              />
              {secondLang.focused && (
                <section className="language__peek-languages">
                  {createPeekLanguages(false)}
                </section>
              )}
            </section>
            <button onClick={handleOnStartButtonClick}>Start</button>
          </section>
        ) : (
          <PlayingDeck
            firstLang={firstLang.value}
            secondLang={secondLang.value}
          />
        )}
      </section>
    </main>
  );
};

export default Play;
