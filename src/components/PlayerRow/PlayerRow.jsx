import React from 'react';
import classNames from 'classnames';
import styles from './PlayerRow.module.scss';
import defaultAvatar from 'assets/images/icons/man.svg';

const PlayerRow = ({ player, rightComp = undefined, disabled = undefined, className = undefined }) => {
  return (
    <div className={classNames(styles.row, className, { [styles.disabled]: disabled })}>
      <span className={styles.rowID}>{player.number}</span>
      <img className={styles.avatar} alt={'avatar'} src={player.avatar ? player.avatar : defaultAvatar} />
      <span className={styles.name}>{player.name}</span>
      {rightComp}
    </div>
  );
};

export default React.memo(PlayerRow);
