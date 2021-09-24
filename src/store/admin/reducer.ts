import { createSlice } from '@reduxjs/toolkit';
import { randomInteger } from 'utils/utils';

export type GenderType = 'MALE' | 'FEMALE';
export type player = {
  name: string;
  id: number;
  dateCreated: number;
  gender: GenderType;
  playerstatus: string;
  createdDesk: number;
  playedTime: number;
};
type playRoom = {
  id: string;
  dateCreated: number;
  ownerName: string;
  ownerGender: GenderType;
  progress: number;
  players: object;
  playersInRoom: RespPlayer[];
  gameType:string;
};
type RespPlayer = {
  active: boolean;
  alive: boolean;
  audio: boolean;
  browser_cap_info: { [key: string]: any };
  in_jail: boolean;
  is_owner: boolean;
  role: string | null;
  user_id: string;
  user_name: string;
  video: boolean;
  banned?: boolean;
};
type RoomInfoType = {
  countdown: number;
  current_player: string;
  current_state_time: number;
  next_player: string;
  next_state: string | null;
  players: RespPlayer[];
  room_name: string;
  state: string;
};
type RoomsResp = {
  create_time: number;
  name: string;
  pool_type: string;
  room_info: RoomInfoType;
};

const getMockPlayers = (): player[] => {
  const playersCount = 31;
  const names = ['Илья', 'Вова', 'Димон', 'Серый', 'Лев', 'Янка', 'Костян', 'Лёха', 'Анюта', 'Серега'];
  const genders: GenderType[] = ['MALE', 'FEMALE'];
  const statuses = ['active', 'banned'];
  const players: player[] = [];

  for (let i = 0; i < playersCount; i++) {
    players.push({
      id: i,
      name: names[randomInteger(0, 9)],
      dateCreated: 1623514006178,
      gender: genders[randomInteger(0, 1)],
      playerstatus: statuses[randomInteger(0, 1)],
      createdDesk: randomInteger(2, 13),
      playedTime: randomInteger(5, 15),
    });
  }

  return players;
};
const getProgress = (room: RoomsResp) => {
  let alivePeople = 0;
  room.room_info.players.forEach((el)=>{
    if(el.active && el.alive && !el.in_jail) alivePeople++;
  })
  return Math.floor(100-((alivePeople/room.room_info.players.length)*100))
};
const fixPlayRooms = (rooms: RoomsResp[]): playRoom[] => {
  const fixedRooms: playRoom[] = [];
  rooms.map((room, index) => {
    const roomPlayers: RespPlayer[] = room.room_info.players;
    const roomOwner = roomPlayers?.find((p) => p.is_owner);
    const ownerName = roomOwner?.user_name ?? '-';
    fixedRooms.push({
      ownerName,
      ownerGender: 'MALE',
      dateCreated: room.create_time,
      progress: getProgress(room),
      id: room.name,
      playersInRoom: roomPlayers,
      players: {
        inGame: roomPlayers.length,
        observers: 0,
        kicked: 0,
      },
      gameType : room.pool_type==="with_friends"?"Игра с друзьями":"Случайная игра"
    });
  });
  return fixedRooms;
};
export enum PoolType {
  WITH_FRIENDS = 'with_friends',
  RANDOM_POOL = 'random_pool',
}
export type User = {
  id: string;
  name: string;
  gender: GenderType;
  created_dt: number;
  is_online: boolean;
  last_active_dt: number | null;
  is_banned: boolean;
  last_banned_dt: number | null;
  room_name: string;
  pool_type: PoolType;
};

export type UserDetails = {
  games_played: number;
  games_won: number;
  achievements_count: number;
  tables_created: number;
  total_in_game_dt: number;
};

export type UserBan = {
  ban_time: number;
  reports_count: number;
};

export type Notification = {
  content: string;
  type: string;
  date: Date;
};

interface AdminState {
  players: User[];
  playRooms: playRoom[];
  playersPaginator: {
    currentPage: number;
    perPage: number;
    totalPlayers: number;
  };
  playRoomsPaginator: {
    currentPage: number;
    perPage: number;
    totalTables: number;
  };
  notifications: Notification[];
}

const initialState: AdminState = {
  players: [],
  playRooms: [],

  playersPaginator: {
    currentPage: 1,
    perPage: 0,
    totalPlayers: 0,
  },
  playRoomsPaginator: {
    currentPage: 1,
    perPage: 0,
    totalTables: 0,
  },
  notifications: [],
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.playRooms = fixPlayRooms(action.payload);
    },
    setLengthRooms: (state, action) => {
      state.playRoomsPaginator.totalTables = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.playRoomsPaginator.currentPage = action.payload;
    },
    setPerPagePlayrooms: (state, action) => {
      state.playRoomsPaginator.perPage = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayersLength: (state, action) => {
      state.playersPaginator.totalPlayers = action.payload;
    },
    setCurrentPagePlayers: (state, action) => {
      state.playersPaginator.currentPage = action.payload;
    },
    setPerPagePlayers: (state, action) => {
      state.playersPaginator.perPage = action.payload;
    },
    removePlayers: (state, action) => {
      if (state.players !== null) {
        state.players = state.players.filter((el) => el.id !== action.payload);
      }
    },
    filterPlayers: (state) => {},
    setNotifications: (state, action) => {
      state.notifications = [...action.payload];
    },
  },
});

export const { actions: adminActions, reducer: adminReducer } = slice;
