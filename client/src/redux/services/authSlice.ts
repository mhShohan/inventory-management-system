import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TUser = {
  _id: string
  email: string
  exp: number
  iat: number
}

interface InitialState {
  user: null | TUser
  token: null | string
}

const initialState: InitialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string, user: TUser }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logoutUser: (state) => {
      state.user = null
      state.token = null
    },
  }
});

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer;

export const getCurrentUser = (state: RootState) => state.auth.user
export const getCurrentToken = (state: RootState) => state.auth.token
