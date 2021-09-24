import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NavBarAdmin.scss';

type Props = {
  statisticOn?: boolean;
  tablesOn?: boolean;
  playersOn?: boolean;
  notificationsOn?: boolean;
  notifications?: boolean;
  curPage?: string;
};

const NavBarAdmin = ({ notifications, curPage }: Props) => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.logo} />
      <button
        className={curPage === 'statistic' ? styles.statisticBtnOn : styles.statisticBtn}
        onClick={() => history.push('/Statistic')}
      />
      <button
        className={curPage === 'tables' ? styles.tablesBtnOn : styles.tablesBtn}
        onClick={() => history.push('/Gametables')}
      />
      <button
        className={curPage === 'playercard' ? styles.playersBtnOn : styles.playersBtn}
        onClick={() => history.push('/Players')}
      />
      <button
        className={curPage === 'notifications' ? styles.notificationsBtnOn : styles.notificationsBtn}
        onClick={() => {__DEV__?history.push('/Notifications'):{}}}>
        {notifications && <div className={styles.notificationsNew} />}
      </button>

      <button className={styles.exitBtn} />
    </div>
  );
};

export default NavBarAdmin;
