import React, { useEffect } from 'react';
import NavBarAdmin from 'pages/Admin/components/NavBarAdmin/NavBarAdmin';
import styles from './Notifications.scss';
import Notification from './components/notification';
import { useSelector } from 'store';
import * as api from 'pages/Admin/api';
import { useDispatch } from 'react-redux';
import { adminActions } from 'store/admin/reducer';
import UIText from 'utils/UIText';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.admin.notifications);

  const getNotifications = () => {
    const resp = api.getMockNotifications();
    resp && dispatch(adminActions.setNotifications(resp));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className={styles.container}>
      <NavBarAdmin curPage="notifications" />
      <div className={styles.content}> 
      <div className={styles.topLine}>
        <div className={styles.topLineLeft}>
          <h1 onClick={() => {}}>{UIText.admin.notifications.notifications}</h1>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.todaylet}>
        <h2>{UIText.admin.notifications.today}</h2>
        <div className={styles.active_not_today}>
          <Notification
            content="Игрок Мира пожаловался на игрока Игорь"
            type="report"
            date={new Date(2021, 2, 24, 19, 11)}
          />
          <Notification
            content="У игрока Владимир не отображается видео"
            type="videotrouble"
            date={new Date(2021, 2, 24, 18, 59)}
          />
          <Notification
            content="У игрока Иван не работает микрофон"
            type="microtrouble"
            date={new Date(2021, 2, 24, 18, 47)}
          />
          <Notification
            content="Произошла техническая ошибка, игра остановлена"
            type="technical"
            date={new Date(2021, 2, 24, 18, 38)}
          />
        </div>
      </div>
      <div className={styles.yesterday_notifications} />
      <h2>{UIText.admin.notifications.yesterday}</h2>
      <div className={`${styles.active_not_today} ${styles.yesterday}`}>
        <Notification
          content="Игрок Мира пожаловался на игрока Игорь"
          type="report"
          date={new Date(2021, 2, 24, 19, 11)}
        />
        <Notification
          content="У игрока Владимир не отображается видео"
          type="videotrouble"
          date={new Date(2021, 2, 24, 18, 59)}
        />
        <Notification
          content="У игрока Иван не работает микрофон"
          type="microtrouble"
          date={new Date(2021, 2, 24, 18, 47)}
        />
        <Notification
          content="Произошла техническая ошибка, игра остановлена"
          type="technical"
          date={new Date(2021, 2, 24, 18, 38)}
        />
      </div>
      </div>
    </div>
  );
};

export default Notifications;
