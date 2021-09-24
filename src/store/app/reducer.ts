import { createSlice } from '@reduxjs/toolkit';
import { GameService } from 'utils/GameService';

type AppState = {
  isAuth: boolean | null;
  YAAuth: boolean;
};
const initialState: AppState = {
  isAuth: null,
  YAAuth: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
      GameService.initGameSocket();
    },
    setYAAuth: (state, action) => {
      state.YAAuth = action.payload;
    },
  },
});

export const appActions = slice.actions;
export const appReducer = slice.reducer;
