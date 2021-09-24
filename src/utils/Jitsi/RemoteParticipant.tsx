import React, { useEffect, useRef, useState } from 'react';
import { DeepCodecEvent } from 'utils/Jitsi/DeepCodecTypes';
import DeepCodecProvider from 'utils/Jitsi/DeepCodecProvider';
import JitsiTrack from 'typings/types/hand-crafted/modules/RTC/JitsiTrack';
import styles from './Participant.scss';
import Loading from './loading.svg';
import { store } from 'store';

type Props = {
  id: string;
  muted: boolean;
  controls?: boolean;
};
const RemoteParticipant: React.FC<Props> = ({ id, muted, controls }) => {
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<HTMLAudioElement>(null);

  const [loading, setLoading] = useState(true);
  const [isVideoDetached, setIsVideoDetached] = useState(true);
  const [isAudioMutedLocal, setIsAudioMutedLocal] = useState(false);
  const [isVideoMutedLocal, setIsVideoMutedLocal] = useState(false);
  const [isRemoteVideoMuted, setIsRemoteVideoMuted] = useState(false);

  const updateVolume = () => {
    const newVolume = store.getState().settings.volume;
    if (audio.current && audio.current.volume !== newVolume && newVolume !== undefined) {
      try {
        audio.current.volume = newVolume;
      } catch (e) {
        console.warn(e, 'new volume: ', newVolume);
      }
    }
  };

  useEffect(() => {
    if (!DeepCodecProvider.isInstantiated()) {
      DeepCodecProvider.instantiate();
    }
    const deepCodec = DeepCodecProvider.getInstance();
    deepCodec.getRemoteTracks(id)?.forEach(onTrack);
    const unsubOnTrack = deepCodec.subscribe(id, DeepCodecEvent.REMOTE_TRACK, onTrack);
    const unsubOnTrackMute = deepCodec.subscribe(id, DeepCodecEvent.REMOTE_TRACK_MUTE_CHANGED, onRemoteMuteChanged);

    updateVolume();
    const unsubscribeVolume = store.subscribe(() => {
      updateVolume();
    });

    return () => {
      unsubscribeVolume();
      const dc = DeepCodecProvider.getInstance();
      dc.getRemoteTracks(id)?.forEach((track) => {
        track.containers.forEach((c) => {
          console.log('[RemPart] DETACH', id);
          const canDetach =
            (track.getType() === 'video' && video.current === c) ||
            (track.getType() === 'audio' && audio.current === c);
          canDetach && track.detach(c);
        });
      });
      unsubOnTrackMute();
      unsubOnTrack();
    };
  }, [id]);

  const onRemoteMuteChanged = async (track: JitsiTrack | undefined) => {
    if (track === undefined) {
      console.warn('no track');
      return;
    }
    const trackType = track.getType();
    const isMuted = track.isMuted();
    //@ts-ignore
    console.log('onTrackMuteChanged', isMuted, track);
    if (trackType === 'video') {
      setIsRemoteVideoMuted(isMuted);
    }
  };
  const onTrack = async (track: JitsiTrack | undefined) => {
    // @ts-ignore
    console.log('ON TRACK IN REMOTE PARTICIPANT', id, 'track id ' + track.track.id);
    if (track === undefined) {
      console.warn('no track');
      return;
    }
    const trackType = track.getType();
    const cont = trackType === 'video' ? video.current : audio.current;
    if (trackType === 'video') setLoading(false);
    if (cont) {
      if (track.containers.includes(cont)) {
        await track.detach(cont);
      }
      await track.attach(cont);
      console.warn(`attached ${id} ${trackType} track`);
      if (trackType === 'video') {
        setIsVideoDetached(false);
      }
    } else {
      console.warn(`skip attach "${id}" "${trackType}" track container is`, cont);
    }
  };

  const localAudioMuted = () => {
    setIsAudioMutedLocal((m) => !m);
  };
  const reload = () => {
    console.log('RELOAD', id);
    DeepCodecProvider.getInstance()
      .getRemoteTracks(id)
      ?.forEach((track) => {
        console.log('got track', track);
        if (track.getType() === 'video' && video.current) {
          onTrack(track);
        }
        if (track.getType() === 'audio' && audio.current) {
          onTrack(track);
        }
      });
  };
  const newReload = () => {
    DeepCodecProvider.getInstance().reconnectToRoom();
  };

  return (
    <div className={styles.JitsiParticipant}>
      <video
        ref={video}
        className={styles.JitsiVideo}
        style={{}}
        //@ts-ignore
        pip={'false'}
        autoPlay
        playsInline
        controls={false}
        poster={''}
      />
      {(isVideoDetached || isRemoteVideoMuted || isVideoMutedLocal) && <div className={styles.noVidBg} />}
      {loading && (
        <div className={styles.loading}>
          <img src={Loading} alt={'Loading'} />
        </div>
      )}
      <audio autoPlay ref={audio} muted={muted || isAudioMutedLocal} />
      {controls && (
        <div className={styles.btns}>
          <button className={styles.reloadBtn} onClick={reload} />
          {/*<button className={styles.reloadBtn} onClick={newReload} />*/}
          <button
            className={isVideoMutedLocal ? styles.videoOff : styles.videoOn}
            onClick={() => setIsVideoMutedLocal((m) => !m)}
          />
          <button className={isAudioMutedLocal ? styles.audioOff : styles.audioOn} onClick={localAudioMuted} />
        </div>
      )}
    </div>
  );
};

export default RemoteParticipant;
