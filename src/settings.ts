export const SOCKET_URL = __DEV__ ? 'https://mafia.deepcodec.com' : 'https://mafiaback.deepcodec.com';
export const WEBRTC_CONNECTION_CFG = {
  iceServers: [
    {
      // urls: ['turn:y1.deepcodec.com:7278'], //BAD ICE
      // urls: ['turn:y2.deepcodec.com:7278'], // FROM EKIVOKI API
      urls: ['turn:y3.deepcodec.com:7278'],
      username: 'user',
      credential: '9ydMEvPBrfcyUeSN',
    },
  ],
};
