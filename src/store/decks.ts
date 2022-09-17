import { createSlice } from '@reduxjs/toolkit';
import axios from '../api/axios';

interface ILanguage {
  language: string;
  text: string;
}

interface IDeck {
  name: string;
  phrases: Array<Array<ILanguage>>;
  id: string;
}

interface INewDeckAction {
  type: string;
  payload: string;
}

interface INewPhraseAction {
  type: string;
  payload: string;
}

interface INewLangAction {
  type: string;
  payload: {
    deckName: string;
    index: number;
  };
}

interface IChangeAction {
  type: string;
  payload: {
    deckName: string;
    phraseIndex: number;
    langIndex: number;
    changedValue: string;
  };
}

interface IDbDecksAction {
  type: string;
  payload: {
    email: string;
  };
}

const decksSlice = createSlice({
  name: 'decks',
  initialState: Array<IDeck>,
  reducers: {
    addNewDeck(state, action: INewDeckAction) {
      state.push({
        name: action.payload,
        phrases: [[{ text: '', language: '' }]],
        id: String(state.length + 1),
      });
    },
    addNewLang(state, action: INewLangAction) {
      state
        .find((deck) => (deck.name = action.payload.deckName))
        ?.phrases[action.payload.index].push({ text: '', language: '' });
    },
    addNewPhrase(state, action: INewPhraseAction) {
      state
        .find((deck) => deck.name == action.payload)
        ?.phrases.push([{ text: '', language: '' }]);
    },
    changeLang(state, action: IChangeAction) {
      const { deckName, phraseIndex, langIndex, changedValue } = action.payload;
      const lang = state
        .find((deck) => deck.name == deckName)
        ?.phrases.at(phraseIndex)
        ?.at(langIndex);
      if (lang) {
        lang.language = changedValue;
      }
    },
    changeText(state, action: IChangeAction) {
      const { deckName, phraseIndex, langIndex, changedValue } = action.payload;
      const lang = state
        .find((deck) => deck.name == deckName)
        ?.phrases.at(phraseIndex)
        ?.at(langIndex);
      if (lang) {
        lang.text = changedValue;
      }
    },
    loadDecksFromDb(state, action: IDbDecksAction) {
      axios
        .post('/home', action.payload.email, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((response) => {
          state = [...state, ...response.data];
          console.log('good');
        })
        .catch((error) => console.log(error));
    },
    saveDecksToDb(state, action: IDbDecksAction) {
      const decks = state.map((deck) => {
        return { ...deck, email: action.payload.email };
      });
      console.log(decks);
      axios
        .post('/home/save', [...decks], {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    },
  },
});

export { ILanguage };
export const decksActions = decksSlice.actions;
export default decksSlice;
