import React from 'react';
import styles from './PlayerTable.scss';
import { useHistory } from 'react-router-dom';
import man from '@/assets/images/icons/man.svg';
import woman from '@/assets/images/icons/woman.svg';
import ingame from '@/assets/images/admin/inGame-ico.svg';
import kicked from '@/assets/images/admin/kicked-ico.svg';
import observers from '@/assets/images/admin/observers-ico.svg';
import classNames from 'classnames';
import { User } from 'store/admin/reducer';
import { millisecondsToDate } from 'utils/utils';
import Popover from 'components/Popower';
import UIText from 'utils/UIText';

type PlayerCardProps = {
  player: User;
  deleteElem: Function;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player, deleteElem }) => {
  let styleBg;

  const history = useHistory();

  if (player.is_online) styleBg = styles.bgGreenGradient;
  if (!player.is_online) styleBg = styles.bgWhiteGradient;
  if (player.is_banned) styleBg = styles.bgRedGradiend;

  const playerIcon = player.gender === 'MALE' ? man : woman;

  const onPlayerClick = () => history.push(`player/${player.id}`);

  const name = player.name;
  const playerId = player.id;

  return (
    <div className={classNames(styles.gameTable, styleBg)}>
      <div className={styles.cardrow}>
        <div className={!name ? styles.randomIcon : styles.playerIcon}>
          <img src={playerIcon} alt="player icon" />
        </div>
        <div className={styles.info}>
          <div className={styles.namedesk}>
            <p onClick={onPlayerClick} className={styles.name}>
              {name ?? '-'} [{playerId ?? '-'}]
            </p>
            {player.is_banned && (
              <div className={styles.status}>
                <img src={kicked} alt="In game ico" />
                <p>{UIText.admin.playerTables.getBan} {millisecondsToDate(player.last_banned_dt! * 1000)}</p>
              </div>
            )}
            {player.is_online && (
              <div className={styles.status}>
                <img src={ingame} alt="Now playing" />
                <p>{UIText.admin.playerTables.nowPlaying}</p>
              </div>
            )}
            {!player.is_banned && !player.is_online && (
              <div className={styles.status}>
                <img src={observers} alt="Last played" />
                <p>
                  {UIText.admin.playerTables.played} {player.last_active_dt === null ? 'никогда' : millisecondsToDate(player.last_active_dt * 1000)}
                </p>
              </div>
            )}
          </div>
          <Popover
            content={
              <div className={styles.options}>
                <button onClick={() => {}}>{UIText.admin.playerTables.doBan}</button>
                <button onClick={() => {}}>{UIText.admin.playerTables.doDelete}</button>
              </div>
            }>
            <button className={styles.settings}>
              <span />
              <span />
              <span />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
