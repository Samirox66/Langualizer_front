import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
        <Button
          variant="light"
          className="language__peek-language"
          onClick={(e) => handleOnPeekLangButtonClick(e, language, isFirst)}
          key={index}
          type="button"
        >
          {language}
        </Button>
      );
    });
  };

  const handleOnChangeLang = (event, isFirst: boolean) => {
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

  const handleOnStartButtonClick = (event) => {
    event.preventDefault();
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
          <Form onClick={handleOnStartButtonClick}>
            <Form.Group className="mb-3" controlId="firstPlayingLanguage">
              <Form.Label className="language__label">
                Choose first language:
              </Form.Label>
              <section className="language__peek">
                <Form.Control
                  onChange={(e) => handleOnChangeLang(e, true)}
                  onFocus={(e) =>
                    setFirstLang({ focused: true, value: firstLang.value })
                  }
                  id="language"
                  name="language"
                  value={firstLang.value}
                />
                {firstLang.focused && (
                  <section className="language__peek-languages">
                    {createPeekLanguages(true)}
                  </section>
                )}
              </section>
            </Form.Group>
            <label className="language__label" htmlFor="language">
              Choose second language:
            </label>
            <section className="language__peek">
              <Form.Control
                onChange={(e) => handleOnChangeLang(e, false)}
                onFocus={(e) =>
                  setSecondLang({ focused: true, value: secondLang.value })
                }
                id="language"
                name="language"
                value={secondLang.value}
              />
              {secondLang.focused && (
                <section className="language__peek-languages">
                  {createPeekLanguages(false)}
                </section>
              )}
            </section>
            <Button className="play__start-button" variant="primary">
              Start
            </Button>
          </Form>
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
