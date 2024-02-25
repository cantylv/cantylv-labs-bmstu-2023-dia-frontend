import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { initialStateAuthData } from '../../initialData';

const userAuthSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuthData,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
      state.username = '';
    },
  },
});

export const useIsAuth = () =>
  useSelector((state: RootState) => state.authState.isAuth);

export const useIsAdmin = () =>
  useSelector((state: RootState) => state.authState.isAdmin);

export const useUsername = () =>
  useSelector((state: RootState) => state.authState.username);

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
