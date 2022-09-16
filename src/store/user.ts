import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  username: string;
  email: string;
}

interface ISetUsernameAndEmailAction {
  payload: {
    username: string;
    email: string;
  };
  type: string;
}

const initialState: IUser = {
  username: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsernameAndEmail(state, action: ISetUsernameAndEmailAction) {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    signOut(state) {
      state.email = '';
      state.username = '';
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
