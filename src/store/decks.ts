import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/axios';

interface ILanguage {
  language: string;
  text: string;
}

interface IDeck {
  name: string;
  phrases: Array<Array<ILanguage>>;
  published: boolean;
  visible: boolean;
}

interface INewDeckAction {
  type: string;
  payload: string;
}

interface IDeleteDeckAction {
  type: string;
  payload: string;
}

interface INewPhraseAction {
  type: string;
  payload: string;
}

interface IDeletePhraseAction {
  type: string;
  payload: {
    deckName: string;
    phraseIndex: number;
  };
}

interface INewLangAction {
  type: string;
  payload: {
    deckName: string;
    phraseIndex: number;
  };
}

interface IDeleteLangAction {
  type: string;
  payload: {
    deckName: string;
    phraseIndex: number;
    langIndex: number;
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

interface IFilterDecksAction {
  type: string;
  payload: {
    deckRegex: string;
  };
}

const loadDecksFromDb = createAsyncThunk(
  'decks/save',
  async (email: string) => {
    try {
      const response = await axios.get(`/home?email=${email}`, {
        withCredentials: true,
      });
      console.log('saved');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const decksSlice = createSlice({
  name: 'decks',
  initialState: Array<IDeck>,
  reducers: {
    filterDecks(state, action: IFilterDecksAction) {
      state.map((deck) => {
        if (deck.name.search(action.payload.deckRegex)) {
          deck.visible = false;
        } else if (deck.visible == false) {
          deck.visible = true;
        }
      });
    },
    addNewDeck(state, action: INewDeckAction) {
      state.push({
        name: action.payload,
        phrases: [[{ text: '', language: '' }]],
        published: false,
        visible: true,
      });
    },
    deleteDeck(state, action: IDeleteDeckAction) {
      const deck = state.find((deck) => deck.name == action.payload);
      if (deck) {
        const indexOfDeck = state.indexOf(deck);
        state.splice(indexOfDeck, 1);
      }
    },
    addNewLang(state, action: INewLangAction) {
      state
        .find((deck) => deck.name == action.payload.deckName)
        ?.phrases[action.payload.phraseIndex]?.push({ text: '', language: '' });
    },
    deleteLang(state, action: IDeleteLangAction) {
      const { deckName, langIndex, phraseIndex } = action.payload;
      const lang = state.find((deck) => deck.name == deckName)?.phrases[
        phraseIndex
      ][langIndex];
      if (lang == undefined) {
        return;
      }

      const indexToDelete = state
        .find((deck) => deck.name == deckName)
        ?.phrases[phraseIndex].indexOf(lang);
      if (indexToDelete == undefined) {
        return;
      }

      state
        .find((deck) => deck.name == deckName)
        ?.phrases[phraseIndex].splice(indexToDelete, 1);
    },
    deletePhrase(state, action: IDeletePhraseAction) {
      const { deckName, phraseIndex } = action.payload;
      const phrase = state.find((deck) => deck.name == deckName)?.phrases[
        phraseIndex
      ];
      if (phrase == undefined) {
        return;
      }

      const indexToDelete = state
        .find((deck) => deck.name == deckName)
        ?.phrases.indexOf(phrase);
      if (indexToDelete == undefined) {
        return;
      }

      state
        .find((deck) => deck.name == deckName)
        ?.phrases.splice(indexToDelete, 1);
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
    saveDecksToDb(state, action: IDbDecksAction) {
      const decks = state.map((deck) => {
        return { ...deck, email: action.payload.email };
      });
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
    clearState(state) {
      state.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDecksFromDb.fulfilled, (state, action) => {
      action.payload.forEach((deck) => {
        state.push({ ...deck, visible: true });
      });
    });
  },
});

export { ILanguage, loadDecksFromDb };
export const decksActions = decksSlice.actions;
export default decksSlice;
