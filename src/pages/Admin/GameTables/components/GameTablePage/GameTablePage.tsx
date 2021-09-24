import React, { useState, useEffect } from 'react';
import NavBarAdmin from 'pages/Admin/components/NavBarAdmin/NavBarAdmin';
import PlayerString from '../PlayerString/PlayerString';
import { useHistory } from 'react-router-dom';
import styles from './GameTablePage.scss';
import male from '@/assets/images/icons/man.svg';
import { store, useSelector } from '@/store';
import female from '@/assets/images/icons/woman.svg';
import clocks from '@/assets/images/admin/time-ico.svg';
import { millisecondsToDate } from 'utils/utils';
import Buttons from '@/pages/Admin/components/Button/Buttons';
import arrow from '@/assets/images/admin/arrow.svg';
import UIText from 'utils/UIText';

function getTime(date: number) {
  let time = millisecondsToDate(date);
  return time.split(' ')[2];
}

const GameTablePage = () => {
  const history = useHistory();

  //Testy

  const [droom, setroom] = useState(null as any);
  const room = useSelector((state) => state.admin.playRooms[0]);

  useEffect(() => {}, []);

  if (room === null) return <p>loading....</p>;
  return (
    <div className={styles.containerGamePage}>
      <NavBarAdmin />
      <div className={styles.content}>
        <div className={styles.topLine}>
          <div className={styles.topLineLeftBtn}>
            <button
              onClick={() => {
                history.goBack();
              }}>
              <img src={arrow} />
            </button>
            <h1>{millisecondsToDate(room.dateCreated * 1000)}</h1>
          </div>
          <div className={styles.topLineRightContainer}>
            <Buttons text={UIText.admin.gameTables.checkTranslation} action={() => {}} type="green" />
            <Buttons text={UIText.admin.gameTables.gameTablePageDelete} action={() => {}} type="delete" />
          </div>
        </div>
        <div className={styles.hr} />
        <div className={styles.statusTableContainer}>
          <div className={styles.statusTableTopContainer}>
            <div className={styles.playerIcon}>
              <img src={room.ownerGender === 'MALE' ? male : female} alt="playerIco" />
            </div>
            <h2>{room.ownerName}</h2>
            <div className={styles.statusCreaterTable}>
              <p>{UIText.admin.gameTables.tableCreate}</p>
            </div>
          </div>
          <div className={styles.statusTableBtmContainer}>
            <div className={styles.statusTableBtmLeft}>
              <div>
                {/* Date ico*/}
                <img src={clocks} alt="time-icon" className={styles.timeIco} />
                {/* date from to */}
                <p>
                  c&nbsp;{getTime(room.dateCreated * 1000)}&nbsp;до&nbsp;{getTime(room.dateCreated * 1000)}
                </p>
              </div>
              <p>{millisecondsToDate(room.dateCreated * 1000).split(' ')[0]}</p>
            </div>
            <div className={styles.statusTableBtmRight}>
              <div className={styles.statusTableBtmRightLower}>
                <p>{UIText.admin.gameTables.progress}</p>
                {/* Progress */}
                <p>{room.progress}%</p>
              </div>
              {/* ProgressLine */}
              <div className={styles.progressLineContainer}>
                <div className={styles.progressLine} style={{ width: room.progress.toString() + '%' }} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.playersContainer}>
          {/* {testyPlayers.map(el => {
          return (
            <PlayerString
              id={5}
              key={parseInt(el.id)}
              gender={el.gender}
              name={el.name}
              status={el.status}
              deviceStatus={el.deviceStatus}
              kickedNumber={el.kickedNumber}
            />)
        })} */}

          {/*@ts-ignore*/}
          {room.playersInRoom.map((el, index) => {
            return (
              <PlayerString
                id={index + 1}
                key={el.user_id}
                gender={'MALE'}
                name={el.user_name}
                status={el.active ? 'inGame' : 'observer'}
                deviceStatus={''}
              />
            );
          })}
        </div>
      </div>
      {/* <div className={styles.buttonsAdaptive}>
          <Buttons text={"Просмотр трансляции"} action={()=>{}} type="green" />
          <Buttons text={"Удалить"} action={()=>{}} type="delete" />
      </div> */}
    </div>
  );
};

export default GameTablePage;
