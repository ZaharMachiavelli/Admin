export enum Role {
  DON_MAFIA = 'don_mafia',
  MAFIA = 'mafia',
  SHERIFF = 'sheriff',
  CIVILIAN = 'civilian',
}

export type IncomingPlayer = {
  user_id: string;
  user_name: string;
  role: Role;
  active: boolean;
  alive: boolean;
  in_jail: boolean;

  is_owner: boolean;

  audio: boolean;
  video: boolean;
  browser_cap_info: any;
};

export type PlayerType = {
  id: string;
  name: string;
  number?: number;
  role?: Role;
  active?: boolean;
  alive?: boolean;
  inJail?: boolean;
  isFullScreen?: boolean;
  aim?: boolean;

  isOwner: boolean;
  audio?: boolean;
  video?: boolean;
  videoStream?: MediaStream | null;

  browserCapInfo?: any;
  videoControls?: any;
  btn?: any;
};
