import { configureStore } from '@reduxjs/toolkit';
import decksSlice from './decks';
import userSlice from './user';

const store = configureStore({
  reducer: {
    decks: decksSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
