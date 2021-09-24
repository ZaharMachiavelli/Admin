export type SubscriberType = {
  subId: number;
  participantId: string;
  event: DeepCodecEvent;
  callback: (arg: unknown) => unknown;
};
export enum DeepCodecEvent {
  REMOTE_TRACK = 'REMOTE_TRACK',
  REMOTE_TRACK_MUTE_CHANGED = 'REMOTE_TRACK_MUTE_CHANGED',
  LOCAL_TRACK = 'LOCAL_TRACK',
  USER_LEFT = 'USER_LEFT',
}

export enum GUM_ERRORS {
  NO_DEVICE = 'NO_DEVICE',
  NOT_ALLOWED_ERROR = 'NOT_ALLOWED_ERROR',
  OTHER_ERROR = 'OTHER_ERROR',
  OVERCONSTRAINED_ERROR = 'OVERCONSTRAINED_ERROR',
}
