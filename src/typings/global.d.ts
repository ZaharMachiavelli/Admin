import { JitsiMeetJSType } from './types/hand-crafted/JitsiMeetJS';

export {};
declare global {
  interface Window {
    ysdk: any;
    JitsiMeetJS: JitsiMeetJSType;
    playersMapper: any;
    app_history: {
      push: (path: string) => void;
      goBack: () => void;
    };
    is_yandex: boolean;
    ya_app_id: string;
    ysdkPromise: Promise;
  }
}
