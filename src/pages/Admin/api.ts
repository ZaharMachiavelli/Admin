import axios, { AxiosResponse } from 'axios';
import { User } from 'store/admin/reducer';

const API_URL = 'https://mafiaback.deepcodec.com/api/mafia/admin';
// const API_URL = 'https://tech.splinex-team.com/mafia/admin';
// const API_URL = 'http://192.168.0.198:5000/mafia/admin';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// apiClient.interceptors.request.use((request)=>{
//   console.log(`[admin api]`, request.);
// })

export const getRooms = (page: number, size: number) => {
  return apiClient.get('/rooms', { params: { page, size }, headers: "AQAAAAAOuH5kAAcpb_7OJDucV0j_qqkBWcAThR0" });
};

type GetPlayersResp = {
  page: number;
  size: number;
  total_users_count: number;
  users: User[];
};

export const getPlayers = (page: number, size: number): Promise<AxiosResponse<GetPlayersResp>> => {
  return apiClient.get('/users', { params: { page, size } });
};

export function getMockNotifications() {
  const notifications = [];
  const content = [
    'Игрок Мира пожаловался на игрока Игорь',
    'У игрока Владимир не отображается видео',
    'У игрока Иван не работает микрофон',
    'Произошла техническая ошибка, игра остановлена',
  ];

  const statuses = ['report', 'videotrouble', 'microtrouble', 'technical'];

  for (let i = 0; i < 4; i++) {
    notifications.push({
      content: content[i],
      type: statuses[i],
      date: new Date(2021, 2, 24, 18, 38),
    });
  }

  return notifications;
}
