import { getCookie, setCookie } from 'utils/cookieApi';
import { appActions } from 'store/app/reducer';
import { profileActions } from 'store/profile/reducer';
import { store } from 'store';
import axios from 'axios';

export const getYAUser = (token: string) => {
  //TODO: Изменить запрос Yandex авторизации на безопасный
  return fetch('https://login.yandex.ru/info?oauth_token=' + token);
  // return fetch('https://login.yandex.ru/info?', {
  //   method: 'GET',
  //   // mode: 'no-cors',
  //   credentials: 'include',
  //   headers: new Headers({
  //     'Authorization': `OAuth ${token}`,
  //   }),
  // })
};
export const getYAAvatar = (id: string) => {
  return fetch('https://avatars.yandex.net/get-yapic/' + id + '/islands-68');
};
export const YAAuth = async (token: string) => {
  const userInfo = await getYAUser(token).then((r) => r.json());
  // const userStats = await getPlayerStats(token).then((r) => r.data);
  __DEV__ && console.log('userInfo', userInfo);
  // __DEV__ && console.log('userStats', userStats);

  setCookie('ya_token', token, { 'max-age': 604000 });
  // store.dispatch(
  //   profileActions.setBadges({
  //     games: userStats.plays_count,
  //     wins: userStats.win_count,
  //     achievements: userStats.achievements_count,
  //   }),
  // );
  store.dispatch(
    profileActions.setUserInfo({
      YandexId: token,
      name: userInfo.display_name,
      isAdult: new Date(userInfo.birthday).getFullYear() + 16 < new Date().getFullYear(),
      gender: userInfo.sex === 'male' ? 0 : 1,
      avatar: userInfo.is_avatar_empty
        ? null
        : 'https://avatars.yandex.net/get-yapic/' + userInfo.default_avatar_id + '/islands-68',
    }),
  );
  store.dispatch(appActions.setYAAuth(true));
  store.dispatch(appActions.setIsAuth(true));
};

const apiClient = axios.create({
  // baseURL: 'https://mafia.deepcodec.com/api/mafia',
  baseURL: __DEV__ ? 'https://mafia.deepcodec.com/api/mafia' : 'https://mafiaback.deepcodec.com/api/mafia',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

type RatingRow = {
  achievements_count: number;
  name: string;
  plays_count: number;
  win_count: number;
  avatar?: string;
};
export const getPlayerStats = (ya_token?: string) => {
  if (ya_token === undefined) ya_token = getCookie('ya_token');
  return apiClient.get<RatingRow>('/stats', { params: { ya_token } });
};

export const getRating = () => {
  return apiClient.get<RatingRow[]>('/rating');
};
