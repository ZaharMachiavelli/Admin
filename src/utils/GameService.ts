import { io, Socket } from 'socket.io-client';
import { store } from 'store';
import { SOCKET_URL } from 'settings';

type Player = any;

type CreateGameProps = {
  myId: string;
  mode?: 'random_pool' | 'with_friends';
  create?: boolean;
  roomId?: string;
  listeners?: any;
};

type JoinProps = {
  user_name: string;
  pool_type: 'random_pool' | 'with_friends' | undefined;
  room_name: string | undefined;
  create?: boolean;
  ya_token?: string;
  avatar?: string;
};

export class GameService {
  private static myId: string | null;
  private static mode: 'random_pool' | 'with_friends' | undefined;
  static getMode = () => GameService.mode;
  static setMode = (mode: 'random_pool' | 'with_friends' | undefined) => {
    if (mode !== undefined) GameService.mode = mode;
  };
  private static roomId: string | undefined;
  private static socketReady = false;
  private static socket: Socket | null = null;

  private static timer: NodeJS.Timer; // interval id
  static getMyId = () => GameService.myId;
  static getRoomId = () => GameService.roomId;
  static getSocket = () => GameService.socket;

  static initGameSocket = () => {
    if (GameService.socket !== null) return;
    GameService.socket = io(SOCKET_URL);
    GameService.socket.on('connect', () => {
      GameService.socketReady = true;
      console.log('%cSOCKET CONNECTED', 'background-color: green; font-size: 24px;');
      const user_id = store.getState().profile.id;
      const user_name = store.getState().profile.name;
      console.log('HELLO args', user_id, user_name);
      GameService.socket?.emit('hello', {
        user_id,
        user_name,
      });

      GameService.socket?.on('unfinished_games', (msg: { room: string }) => {
        if (window.is_yandex) window.app_history.push('/lobby?room=' + msg.room);
      });
    });

    GameService.socket.on('reconnect_attempt', () => {
      console.log('%creconnect_attempt', 'background-color: yellow; font-size: 24px;');
    });

    GameService.socket.on('disconnect', () => {
      GameService.socketReady = false;
      console.log('%cSOCKET DISCONNECTED', 'background: red; font-size: 24px;');
    });
  };

  static createGame = (props: CreateGameProps) => {
    if (!GameService.socketReady) {
      setTimeout(() => GameService.createGame(props), 2000);
      return;
    }
    GameService.myId = props.myId;
    GameService.mode = props.mode;
    GameService.roomId = props.roomId;

    const YandexId = store.getState().profile.YandexId;
    const joinProps: JoinProps = {
      user_name: store.getState().profile.name!,
      pool_type: GameService.mode,
      room_name: GameService.roomId,
    };
    if (props.create) joinProps.create = props.create;
    const Yavatar = store.getState().profile.avatar;
    if (YandexId !== null) joinProps.ya_token = YandexId;
    if (Yavatar !== null && Yavatar !== '') joinProps.avatar = Yavatar;
    console.log('Join props:', joinProps);
    GameService.socket?.emit('join', joinProps);

    Object.entries(props.listeners).forEach(([name, func]: [string, any]) => {
      GameService.socket?.on(name, func);
    });
  };

  static startGame = () => {
    GameService.socket?.emit('start_game');
  };

  static disconnect = () => {
    clearInterval(GameService.timer);
    GameService.socket?.emit('leave');
    GameService.myId = null;
    GameService.mode = undefined;
    GameService.roomId = undefined;
  };

  static startTimer = (delay: number, func: Function) => {
    clearInterval(GameService.timer);
    func(delay);
    GameService.timer = setInterval(() => {
      if (delay > 0) delay--;
      func(delay);
    }, 1000);
  };
}
