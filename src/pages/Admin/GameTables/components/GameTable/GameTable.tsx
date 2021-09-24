import React, { useState } from 'react';
import styles from './GameTable.scss';
import observersIco from 'assets/images/admin/observers-ico.svg';
import inGameIco from 'assets/images/admin/inGame-ico.svg';
import kickedIco from 'assets/images/admin/kicked-ico.svg';
import manIco from 'assets/images/icons/man.svg';
import womanIco from 'assets/images/icons/woman.svg';
import timeIco from 'assets/images/admin/time-ico.svg';
import { millisecondsToDate } from 'utils/utils';
import classNames from 'classnames';
import { GenderType } from 'store/admin/reducer';
import Popover from 'components/Popower';
import { useHistory } from 'react-router-dom';
import UIText from 'utils/UIText';

interface PlayersStatus {
  inGame?: number;
  observers?: number;
  kicked?: number;
}

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

type GameTableProps = {
  id: string;
  dateCreated: number;
  progress: number;
  ownerGender: GenderType;
  ownerName?: string;
  players?: RespPlayer[];
  playersStatus: PlayersStatus;
  setCounterLobby: Function;
  detailStatus:boolean;
  gameType: string;
};

const gender2icon: { [key in GenderType]: string } = {
  MALE: manIco,
  FEMALE: womanIco,
};

const GameTable: React.FC<GameTableProps> = ({
  id,
  dateCreated,
  progress,
  ownerName,
  ownerGender,
  players,
  playersStatus,
  setCounterLobby,
  detailStatus,
  gameType
}) => {
  let styleBg = styles.bgGreenGradient;
  const [displayNone, setDisplayNone] = useState(String);
  const [hide, setHide] = useState(true);
  let display;


  if (progress === 100) {
    styleBg = styles.bgWhiteGradient;
  } else if (playersStatus.kicked) {
    styleBg = styles.bgRedGradiend;
  }



  const onDeleteClick = () => {
    setHide(true);
    setDisplayNone(styles.displayNone);
    setCounterLobby(id);
  };

  const history = useHistory();
  const [active, setActive] = useState(false);

  return (
    <div
      style={hide ? {} : { filter: 'brightness(70%)' }}
      className={classNames(styles.container, display, displayNone)}>
      <div className={classNames(styles.gameTable, styleBg)}>
        <div className={`${styles.row} ${styles.idtxt}`}>{`${gameType} - ${id}`}</div>
        <div className={styles.row}>
          <div className={styles.rowInfo}>
          <img src={timeIco} alt="time-icon" className={styles.timeIco} />
          <p>{millisecondsToDate(dateCreated * 1000)}</p>
          </div>
          <Popover
            content={
              <div className={styles.options}>
                <button onClick={()=>{}}><a href={`${window.location.origin}/lobby?room=${id}`} target={'_blank'} rel="noreferrer">{UIText.admin.gameTables.checkTranslation}</a></button>
                <button onClick={() => {}}>
                 {UIText.admin.gameTables.popoverDelete}
                </button>

              </div>
            }>
            <button

              className={styles.settings}
             >
              <span/>
              <span/>
              <span/>
            </button>
          </Popover>

        </div>
        <div className={classNames(styles.row, styles.progressContainer)}>
          <div className={styles.progressText}>
            <p>{UIText.admin.gameTables.progress}</p>
            <p>{progress}%</p>
          </div>
          <div className={styles.progressLineContainer}>
            <div className={styles.progressLine} style={progress != 100 ? { width: progress + '%' } : {}} />
          </div>
        </div>
        <div className={classNames(styles.row, styles.lowerStringContainer)}>
          <div className={styles.ownerIcon}>
            <img src={gender2icon[ownerGender]} alt="player icon" />
          </div>
          <p ><span onClick={()=>{__DEV__?history.push("/admin_tables/table"):{}}}>{ownerName}</span>  <span onClick={()=>{setActive(!active)}} style={{cursor:"pointer",padding:"0 5px"}}>{active||detailStatus?"∨":">"}</span></p>
          <div className={styles.playersContainer}>
            {playersStatus.inGame ? (
              <div>
                <img src={inGameIco} alt="In game ico" />
                <p>{playersStatus.inGame}</p>
              </div>
            ) : null}
            {playersStatus.kicked ? (
              <div>
                <img src={kickedIco} alt="Kicked ico" />
                <p>{playersStatus.kicked}</p>
              </div>
            ) : null}
            {playersStatus.observers ? (
              <div>
                <img src={observersIco} alt="Observers ico" />
                <p>{playersStatus.observers}</p>
              </div>
            ) : null}
          </div>



        </div>


        <div className={`${styles.players} ${detailStatus?'':active?styles.displayBlock:styles.displayNone}`}>
          <ul>
            {players?.map((el,index)=>{
              if(index!==0)
              return (
                <li>
                  <div className={styles.playerInRoomInfo}>
                  <div className={styles.playerIcon}>
                    <img src={gender2icon[ownerGender]} alt="player icon" />
                  </div>
                  <p>{el.user_name}</p>
                  </div>
                  <img
                  src={el.active?inGameIco:observersIco}
                  alt="player status"
                  />


                </li>
              )
            })}
          </ul>
      </div>


      </div>






    </div>
  );
};

export default GameTable;
