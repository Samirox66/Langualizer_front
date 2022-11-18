import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/axios';

interface ILanguage {
  language: string;
  text: string;
  key: number;
}

interface IDeck {
  name: string;
  phrases: Array<Array<ILanguage>>;
  published: boolean;
  visible: boolean;
  id: string | undefined;
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

interface ISaveSharedDeckAction {
  type: string;
  payload: {
    deck: IDeck;
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

interface IState {
  decks: Array<IDeck>;
  key: number;
}

const initialState: IState = {
  decks: [],
  key: 0,
};

const decksSlice = createSlice({
  name: 'decks',
  initialState: initialState,
  reducers: {
    filterDecks(state, action: IFilterDecksAction) {
      state.decks.map((deck) => {
        if (!deck.name.includes(action.payload.deckRegex)) {
          deck.visible = false;
        } else if (deck.visible == false) {
          deck.visible = true;
        }
      });
    },
    addNewDeck(state, action: INewDeckAction) {
      state.decks.push({
        name: action.payload,
        phrases: [[{ text: '', language: '', key: state.key }]],
        published: false,
        visible: true,
        id: undefined,
      });
      ++state.key;
    },
    deleteDeck(state, action: IDeleteDeckAction) {
      const deck = state.decks.find((deck) => deck.name == action.payload);
      if (deck) {
        const indexOfDeck = state.decks.indexOf(deck);
        state.decks.splice(indexOfDeck, 1);
      }
    },
    addNewLang(state, action: INewLangAction) {
      state.decks
        .find((deck) => deck.name == action.payload.deckName)
        ?.phrases[action.payload.phraseIndex]?.push({
          text: '',
          language: '',
          key: state.key,
        });
      ++state.key;
    },
    deleteLang(state, action: IDeleteLangAction) {
      console.log(action.payload);

      const { deckName, langIndex, phraseIndex } = action.payload;
      const lang = state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases[phraseIndex].find((lang) => lang.key == langIndex);
      if (lang == undefined) {
        return;
      }

      const indexToDelete = state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases[phraseIndex].indexOf(lang);
      if (indexToDelete == undefined) {
        return;
      }

      state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases[phraseIndex].splice(indexToDelete, 1);
    },
    deletePhrase(state, action: IDeletePhraseAction) {
      const { deckName, phraseIndex } = action.payload;
      const phrase = state.decks.find((deck) => deck.name == deckName)?.phrases[
        phraseIndex
      ];
      if (phrase == undefined) {
        return;
      }

      const indexToDelete = state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases.indexOf(phrase);
      if (indexToDelete == undefined) {
        return;
      }

      state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases.splice(indexToDelete, 1);
    },
    addNewPhrase(state, action: INewPhraseAction) {
      state.decks
        .find((deck) => deck.name == action.payload)
        ?.phrases.push([{ text: '', language: '', key: state.key }]);
      ++state.key;
    },
    changeLang(state, action: IChangeAction) {
      const { deckName, phraseIndex, langIndex, changedValue } = action.payload;
      const lang = state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases.at(phraseIndex)
        ?.find((language) => language.key == langIndex);
      if (lang) {
        lang.language = changedValue;
      }
    },
    changeText(state, action: IChangeAction) {
      const { deckName, phraseIndex, langIndex, changedValue } = action.payload;
      const lang = state.decks
        .find((deck) => deck.name == deckName)
        ?.phrases.at(phraseIndex)
        ?.find((language) => language.key == langIndex);
      if (lang) {
        lang.text = changedValue;
      }
    },
    saveDecksToDb(state, action: IDbDecksAction) {
      const decks = state.decks.map((deck) => {
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
    saveSharedDeck(state, action: ISaveSharedDeckAction) {
      state.decks.push(action.payload.deck);
    },
    clearState(state) {
      state.decks.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDecksFromDb.fulfilled, (state, action) => {
      action.payload.forEach((deck) => {
        deck.phrases = deck.phrases.map((phrase) => {
          return phrase.map((lang) => {
            return { ...lang, key: state.key++ };
          });
        });

        state.decks.push({ ...deck, visible: true });
      });
    });
  },
});

export { ILanguage, loadDecksFromDb, IDeck };
export const decksActions = decksSlice.actions;
export default decksSlice;
