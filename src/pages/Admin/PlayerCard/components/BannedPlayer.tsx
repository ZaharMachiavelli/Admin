import React from 'react';
import styles from './BannedPlayer.scss';

function formatDate(date: Date) {
  let dd = date.getDate().toString();
  if (date.getDate() < 10) dd = '0' + date.getDate();
  let mm = (date.getMonth() + 1).toString();
  if (date.getMonth() + 1 < 10) mm = '0' + (date.getMonth() + 1);
  const yy = date.getFullYear().toString();
  return dd + '.' + mm + '.' + yy;
}

type Props = {
  idprofile: number;
  playerava: string;
  name: string;
  bansymbol: string;
  bancount: number;
  date: Date;
};

const BannedPlayer = ({ idprofile, playerava, name, bansymbol, bancount, date }: Props) => {
  return (
    <tr className={styles.ban_player}>
      <td className={styles.row}>
        <span>{idprofile}</span>
        <div>
          <img src={playerava} alt="icon:banplayerava" />
          <span>{name}</span>
        </div>
      </td>
      <td className={`${styles.row} ${styles.end}`}>
        <img src={bansymbol} alt="icon:banSymbol" />
        <span className={styles.ban_count}>
          <sup>{bancount}</sup>
        </span>
        <div className={styles.ban_date}>{formatDate(date)}</div>
      </td>
    </tr>
  );
};

export default BannedPlayer;
