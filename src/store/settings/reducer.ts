import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  volume: number;
};

const initialState: SettingsState = {
  volume: 1,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
  },
});

export const settingsActions = slice.actions;
export const settingsReducer = slice.reducer;
