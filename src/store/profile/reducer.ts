import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie } from 'utils/cookieApi';
import { getPlayerStats } from '../../api';
import { store } from '../index';

export type ProfileState = {
  id: null | string;
  YandexId?: null | string;
  name: null | string;
  isAdult?: null | boolean;
  avatar?: null | string;
  badges?: { games: number; wins: number; achievements: number };
  gender?: number;
};

const initialState: ProfileState = {
  id: null,
  YandexId: null,
  name: null,
  isAdult: null,
  avatar: null,
  badges: { games: 0, wins: 0, achievements: 0 },
  gender: undefined,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<ProfileState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        // @ts-ignore
        state[key] = key === 'name' ? value.substr(0, 14) : value;
      });
    },
    setUserName: (state, action) => {
      const cookieStr = getCookie('mafia_user_key');
      const newCookieStr = cookieStr!.replace(/name:.*&/i, `name:${action.payload}&`);
      setCookie('mafia_user_key', newCookieStr, { 'max-age': 604000 });
      state.name = action.payload;
    },
    setIsAdult: (state, action) => {
      state.isAdult = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setBadges: (state, action) => {
      state.badges = action.payload;
    },
  },
});

export const updProfileStats = async () => {
  const token = store.getState().profile.YandexId;
  if (token) {
    const userStats = await getPlayerStats(token).then((r) => r.data);
    store.dispatch(
      profileActions.setBadges({
        games: userStats.plays_count,
        wins: userStats.win_count,
        achievements: userStats.achievements_count,
      }),
    );
  }
};

export const profileActions = slice.actions;
export const profileReducer = slice.reducer;
