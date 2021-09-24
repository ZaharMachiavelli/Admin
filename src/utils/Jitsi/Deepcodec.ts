import { DeepCodecEvent, GUM_ERRORS, SubscriberType } from 'utils/Jitsi/DeepCodecTypes';
import JitsiConnection from 'typings/types/hand-crafted/JitsiConnection';
import JitsiLocalTrack from 'typings/types/hand-crafted/modules/RTC/JitsiLocalTrack';
import JitsiTrack from 'typings/types/hand-crafted/modules/RTC/JitsiTrack';
import JitsiConference from 'typings/types/hand-crafted/JitsiConference';
import JitsiParticipant from 'typings/types/hand-crafted/JitsiParticipant';
import { JitsiConferenceErrors } from 'typings/types/hand-crafted/JitsiConferenceErrors';
import { isMobile } from 'utils/utils';

const serverURL = 'y0.deepcodec.com';
const roomId = 'test';
const options = {
  hosts: {
    domain: 'meet.jitsi',
    muc: 'muc.meet.jitsi',
    focus: `focus.meet.jitsi`,
    anonymous: 'meet.jitsi',
  },
  clientNode: 'http://jitsi.org/jitsimeet',
  p2p: {
    // enabled: false,
    enabled: true,
    stunServers: [
      // {
      //   urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443',
      // },
      {
        urls: 'turn:y2.deepcodec.com:7278',
        username: 'user',
        credential: '9ydMEvPBrfcyUeSN',
      },
    ],
  },
  serviceUrl: `https://${serverURL}/http-bind?room=${roomId}`,

  // maxFullResolutionParticipants: isMobile() ? 1 : 2,
  // constraints: {
  //   video: {
  //     height: {
  //       min: 144,
  //       ideal: 144,
  //       max: 144,
  //     },
  //     width: {
  //       min: 144,
  //       ideal: 144,
  //       max: 144,
  //     },
  //   },
  // },

  websocket: `wss://${serverURL}/xmpp-websocket`,
  makeJsonParserHappy: 'even if last key had a trailing comma',
  focusUserJid: 'focus@auth.meet.jitsi',
  enableTalkWhileMuted: false,
  disableAP: false,
  stereo: false,
  startAudioOnly: false,
  startAudioMuted: 10,
  startWithAudioMuted: false,
  startSilent: false,
  disableAudioLevels: false,
  enableStatsID: false,
  enableCalendarIntegration: false,
  prejoinPageEnabled: false,
  enableClosePage: false,
  requireDisplayName: false,
  enableLipSync: false,
  enableRemb: true,
  enableTcc: true,
  useIPv6: true,
  transcribingEnabled: false,
  disableDeepLinking: false,
  confID: 'y0.deepcodec.com/sa',
  applicationName: 'Jitsi Meet',
};

const initOptions = {};

const DEFAULT_MOBILE_CONSTRAINTS = {
  width: { ideal: 250 },
  height: { ideal: 250 },
  frameRate: { ideal: 9 },
  facingMode: 'user',
};
const DEFAULT_DESKTOP_CONSTRAINTS = {
  width: { ideal: 400 },
  height: { ideal: 400 },
  frameRate: { ideal: 15 },
  facingMode: 'user',
};

export default class DeepCodec {
  static localTracks: JitsiLocalTrack[] | null = null;
  static localTracksPromise: Promise<JitsiLocalTrack[] | JitsiConferenceErrors> | null = null;

  private _connection: JitsiConnection | null = null;
  private _subscribers: SubscriberType[] = [];

  private _conference: JitsiConference | null = null;
  private _count = 0;
  private IS_CONNECTED_TO_JITSI = false;
  private _scheduledLocalTracks: string[] = [];
  private reloadInterval: undefined | NodeJS.Timeout;

  constructor() {
    // @ts-ignore
    window.deepcodec = this;
    if (DeepCodec.localTracks === null) throw 'Cannot init Deepcodec without local trakcs';
    // this.initLocalTracks();

    // //@ts-ignore
    // if (navigator.connection) {
    //   //@ts-ignore
    //   navigator.connection.addEventListener('change', (e) => {
    //     console.log('%cNETWORK CHANGE DETECTED', 'background-color: red; color: green; font-size: 80px;');
    //     console.warn('scheduling page reload');
    //     this.reloadInterval && clearTimeout(this.reloadInterval);
    //     this.reloadInterval = setTimeout(() => {
    //       window.location.href = window.location.href + '';
    //     }, 5000);
    //   });
    // }
    this.connectToJitsi();
  }

  get conference() {
    return this._conference;
  }
  set conference(conference: JitsiConference | null) {
    this._conference = conference;
  }

  get subscribers(): SubscriberType[] {
    return this._subscribers;
  }
  set subscribers(subscribers) {
    this._subscribers = subscribers;
  }

  get connection(): JitsiConnection | null {
    return this._connection;
  }
  set connection(connection: JitsiConnection | null) {
    this._connection = connection;
  }

  private waitJitsiConnection() {
    return new Promise((resolve) => {
      const i = setInterval(() => {
        if (this.IS_CONNECTED_TO_JITSI) {
          clearInterval(i);
          console.log('got jitsi connection');
          resolve();
        } else {
          console.log('waiting jitsi connection...');
        }
      }, 1000);
    });
  }

  private connectToJitsi() {
    console.log('connectToJitsi', DeepCodec.localTracks);
    if (DeepCodec.localTracks === null) throw 'Cannot init Deepcodec without local trakcs';
    const connection = new window.JitsiMeetJS.JitsiConnection(undefined, null, options);
    connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
      this.onConnectionSuccess(roomId);
    });
    connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_FAILED, this.onConnectionFailed);
    connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, this.disconnect);
    connection.connect({});
    this._connection = connection;
    console.log('jitsi connection', connection);
  }

  private scheduleAddTrackToConference(type: string) {
    this._scheduledLocalTracks.push(type);
  }

  private addScheduledLocalTrack(type: string, track: JitsiLocalTrack) {
    if (!this.conference) {
      throw 'Cannot addScheduledLocalTrack !this.conference';
    }
    this.conference.addTrack(track);
    this._scheduledLocalTracks = this._scheduledLocalTracks.filter((t) => t !== type);
  }

  public static async initLocalTracks() {
    window.JitsiMeetJS.init(initOptions);
    window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR);
    console.log('initLocalTracks');
    if (!window.JitsiMeetJS.mediaDevices.isDeviceListAvailable()) {
      throw GUM_ERRORS.NO_DEVICE;
    }
    if (!this.localTracksPromise) {
      console.log('set options');
      this.localTracksPromise = window.JitsiMeetJS.createLocalTracks({
        devices: ['audio', 'video'],
        constraints: {
          video: isMobile() ? DEFAULT_MOBILE_CONSTRAINTS : DEFAULT_DESKTOP_CONSTRAINTS,
        },
      });
    }
    const tracks = await this.localTracksPromise.catch((error) => {
      console.log('error', error);
      if (error.name === 'NotAllowedError') {
        throw GUM_ERRORS.NOT_ALLOWED_ERROR;
      }
      if (error.name === 'OverconstrainedError') {
        throw GUM_ERRORS.OVERCONSTRAINED_ERROR;
      }
      throw GUM_ERRORS.OTHER_ERROR;

      return error;
    });
    DeepCodec.localTracks = tracks;
  }

  private onConnectionSuccess(e: unknown) {
    console.log('on connection success', e);
    this.IS_CONNECTED_TO_JITSI = true;
  }

  // jitsi event callbacks (arrow declaration required to save this context!!!)
  private onConnectionFailed = (e: unknown) => {
    console.log('on connection failed', e);
    this.IS_CONNECTED_TO_JITSI = false;
  };
  private onRoomTrackAdded = (track: JitsiTrack) => {
    if (track.isLocal()) {
      return;
    }
    const participantId = track.getParticipantId();
    if (!this.conference) {
      throw 'Cannot add track jitsi conference is null';
    }
    const p = this.conference.getParticipantById(participantId);
    const mafiaId = p.getDisplayName();
    console.log(
      `%cREMOTE TRACK ADDED from: "${mafiaId} ${(
        window.playersMapper?.[mafiaId] ?? ''
      ).toUpperCase()} ${participantId}" type: "${track.getType()}"`,
      'background: green; color: white;',
    );
    this.publishRemoteTracks(p.getDisplayName(), track);
  };
  private onRoomTrackRemoved = (track: JitsiTrack) => {
    if (track.isLocal()) {
      return;
    }
    const mafiaId = this.conference?.getParticipantById(track.getParticipantId())?.getDisplayName();
    const name = mafiaId ? `${mafiaId} ${(window.playersMapper?.[mafiaId ?? ''] ?? '').toUpperCase()}` : undefined;
    console.log(
      `%cREMOTE TRACK REMOVED from: "${name ?? track.getParticipantId()} " type: "${track.getType()}"`,
      'background: red; color: white',
    );
    // track.containers.forEach((c) => {
    //   track.detach(c);
    //   this.conference?.getParticipants().forEach((p) => {
    //     p.getTracks().forEach((t) => {
    //       console.log(p, p.getDisplayName());
    //       if (t.containers.length === 0) {
    //         // eslint-disable-next-line no-debugger
    //         debugger;
    //       }
    //     });
    //   });
    //@ts-ignore
    // c.onDetach();
    // });
  };
  private onRoomUserJoined = (id: string, participant: JitsiParticipant) => {
    console.log('on room user joined', participant);
  };
  private onRoomUserLeft = (user: any) => {
    console.log('user left', user);
  };
  private onTrackMuteChanged = (track: any, e: any) => {
    const participantId = track.getParticipantId();
    if (!this.conference) {
      throw 'Cannot add track jitsi conference is null';
    }
    const p = this.conference.getParticipantById(participantId);
    if (!p) {
      return;
    }
    const mafiaId = p.getDisplayName();
    console.log(
      `%cREMOTE TRACK MUTE CHANGED from: "${mafiaId} ${(
        window.playersMapper?.[mafiaId] ?? ''
      ).toUpperCase()}" type: "${track.getType()}"`,
      'background: yellow; color: black;',
    );
    this.publishRemoteTracksMuteChanged(p.getDisplayName(), track);
  };

  // publish methods
  private publishRemoteTracksMuteChanged(participantId: string, track: JitsiTrack) {
    const remoteStreamSubscribers = this._subscribers.filter(
      (s) => s.participantId === participantId && s.event === DeepCodecEvent.REMOTE_TRACK_MUTE_CHANGED,
    );
    remoteStreamSubscribers.forEach((s) => s.callback(track));
  }
  private publishRemoteTracks(participantId: string, track: JitsiTrack) {
    const remoteStreamSubscribers = this._subscribers.filter(
      (s) => s.participantId === participantId && s.event === DeepCodecEvent.REMOTE_TRACK,
    );
    console.log(`publishRemoteTracks for ${participantId} to ${remoteStreamSubscribers.length} subscribers`);
    remoteStreamSubscribers.forEach((s) => s.callback(track));
  }
  private publishLocalTracks() {
    console.log('publish local tracks', this.subscribers);
    this.subscribers
      .filter((s) => s.event === DeepCodecEvent.LOCAL_TRACK)
      .forEach((s) => {
        (DeepCodec.localTracks as JitsiLocalTrack[]).forEach((t) => {
          s.callback(t);
        });
      });
  }

  //conference helpers
  private addConferenceListeners = (conference: JitsiConference) => {
    conference.addEventListener(
      window.JitsiMeetJS.events.conference.TRACK_ADDED,
      this.onRoomTrackAdded as () => unknown,
    );
    conference.addEventListener(
      window.JitsiMeetJS.events.conference.TRACK_REMOVED,
      this.onRoomTrackRemoved as () => unknown,
    );
    conference.addEventListener(
      window.JitsiMeetJS.events.conference.USER_JOINED,
      this.onRoomUserJoined as () => unknown,
    );

    conference.addEventListener(
      window.JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
      this.onTrackMuteChanged as () => unknown,
    );
    conference.addEventListener(window.JitsiMeetJS.events.conference.USER_LEFT, this.onRoomUserLeft as () => unknown);
  };
  private removeConferenceListeners = (conference: JitsiConference) => {
    conference.removeEventListener(
      window.JitsiMeetJS.events.conference.TRACK_ADDED,
      this.onRoomTrackAdded as () => unknown,
    );
    conference.removeEventListener(
      window.JitsiMeetJS.events.conference.TRACK_REMOVED,
      this.onRoomTrackRemoved as () => unknown,
    );
    conference.removeEventListener(
      window.JitsiMeetJS.events.conference.USER_JOINED,
      this.onRoomUserJoined as () => unknown,
    );

    conference.removeEventListener(
      window.JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED,
      this.onTrackMuteChanged as () => unknown,
    );
    conference.removeEventListener(
      window.JitsiMeetJS.events.conference.USER_LEFT,
      this.onRoomUserLeft as () => unknown,
    );
  };

  public getRemoteTracks = (participantId: string) => {
    console.log(
      'get remote tracks for participant',
      this.conference?.getParticipants().map((p) => p.getDisplayName()),
    );
    const participants = this.conference?.getParticipants().filter((p) => p.getDisplayName() === participantId);
    let targetP: JitsiParticipant | undefined;
    if ((participants?.length ?? 0) > 1) {
      participants!.forEach((p) => {
        if (p.getTracks().length && p.getTracks().some((t) => t.isActive())) {
          targetP = p;
        }
      });
      console.log(
        `%cGOT MULTIPLE PARTICIPANTS TRY USE ${targetP?.getDisplayName() ?? 'NONE'}`,
        'background-color: yellow; color: black; font-size: 30px;',
      );
    } else {
      targetP = this.conference?.getParticipants().find((p) => p.getDisplayName() === participantId);
    }
    return targetP?.getTracks();
  };
  private myId: string | null = null;
  private roomId: string | null = null;
  public joinRoom = async (myId: string, roomId: string) => {
    console.log('joinRoom', roomId);
    if (DeepCodec.localTracks === null) {
      throw 'No local tracks';
    }
    this.myId = myId;
    this.roomId = roomId;
    const connection = this._connection;
    if (!connection) {
      throw new Error('No jitsi connection!');
    }
    await this.waitJitsiConnection();
    const conference = connection.initJitsiConference(roomId, {
      openBridgeChannel: true,
      // focusUserJid: myId,
    });
    this.conference = conference;
    conference.setDisplayName(myId);
    this.addConferenceListeners(conference);
    for (const type of ['audio', 'video']) {
      const t = DeepCodec.localTracks.find((t) => t.getType() === type);
      await conference.addTrack(t!);
    }
    conference.join('thepassword');
    console.log(`${myId} connect to room ${roomId} adding tracks`);
    console.log(DeepCodec.localTracks);
    console.log('conference', conference);

    conference.addCommandListener('CommandName', () => {
      console.log('############ CommandName');
    });

    //@ts-ignore
    // window.conference = this.conference;
    window.onbeforeunload = () => {
      console.log('%cUNMOUNT', 'font-size: 24px; background-color: yellow;');
      this.leaveRoom(roomId);
    };
  };
  public reconnectToRoom = async () => {
    const myId = this.myId;
    const roomId = this.roomId;
    if (this.conference) {
      // this.sendCommand();
      this.conference.leave().then(() => {
        try {
          this.joinRoom(myId!, roomId!);
          // this.conference!.join('thepassword');
        } catch (e) {
          console.log('####################', e);
        }
        //   setTimeout(() => {
        //   }, 1000);
      });
    }

    // window.location.href = window.location.href + '';
  };

  public sendCommand = () => {
    this.conference?.sendCommand('CommandName', {
      value: 'INCOME COMMAND',
      attributes: {}, // map with keys the name of the attribute and values - the values of the attributes.
      children: [], // array with JS object with the same structure.
    });
  };

  public restartMediaSessions = () => {
    console.warn('restart media sessions');
    //@ts-ignore
    this.conference?._restartMediaSessions();
  };

  public leaveRoom(roomId: string) {
    if (this.conference) {
      this.conference.leave();
    }
  }

  disconnect = (e: any) => {
    console.log('Disconnect', e);
  };

  public subscribe = (participantId: string, event: DeepCodecEvent, cb: (args: any) => void) => {
    this._count += 1;
    const newId = this._count;

    this._subscribers.push({ subId: newId, participantId, event, callback: cb });

    return () => {
      // console.log('UNSUBSCRIBE CALLED', participantId);
      // console.log('BEFORE UNSUBSCRIBE', this._subscribers.length);
      this._subscribers = this._subscribers.filter((s) => s.subId !== newId);
      // console.log('AFTER UNSUBSCRIBE', this._subscribers.length);
    };
  };
  private _isDestroying = false;
  destroy = async () => {
    if (this._isDestroying) return;
    this._isDestroying = true;
    await DeepCodec.localTracksPromise;
    DeepCodec.localTracksPromise = null;
    console.log('deepcodec DESTROY called');

    DeepCodec.localTracks?.forEach((t) => {
      t.containers.forEach((c) => {
        t.detach(c);
      });
    });
    for (const t of DeepCodec.localTracks ?? []) {
      await t.dispose();
    }
    DeepCodec.localTracks = null;
    if (this.conference) {
      this.conference.getParticipants().forEach((p) => {
        p.getTracks().forEach((t) => {
          t.containers.forEach((cont) => {
            // console.log('DETACH TRACK FROM CONTAINER');
            t.detach(cont);
            //@ts-ignore
            cont.onDetach?.();
          });
        });
      });
      this.conference.leave().then(() => {
        // console.log('THEN');
        // console.log(this);
        // console.log(this.conference);
        this.conference = null;
        // console.log(this.conference);
      });
    }
    this._isDestroying = false;

    // throw 'destroy is not implemented';
  };
}
