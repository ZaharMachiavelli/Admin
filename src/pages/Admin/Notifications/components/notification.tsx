import React, { useEffect, useState } from 'react';
import styles from './notification.scss';
import report from 'assets/images/admin/pudjereport.png';
import cameraerror from 'assets/images/admin/camerawtf.png';
import microerror from 'assets/images/admin/microfedych.png';
import technicalerror from 'assets/images/admin/technicalwtf.png';


function formatDate(date: Date) {
  const hh = date.getHours();
  const mins = date.getMinutes();
  let dd = date.getDate().toString();
  if (date.getDate() < 10) dd = '0' + date.getDate();
  let mm = (date.getMonth() + 1).toString();
  if (date.getMonth() + 1 < 10) mm = '0' + (date.getMonth() + 1);
  const yy = date.getFullYear().toString();
  return dd + '.' + mm + '.' + yy + ' в ' + `${hh}:${mins}`;
}

type Props = {
  content: string;
  date: Date;
  type: string;
};

const Notification = ({ content, date, type }: Props) => {
  const [style, setStyle] = useState(String);
  const [ava, setAva] = useState(String);

  useEffect(() => {
    switch (type) {
      case 'report':
        setStyle(styles.report);
        setAva(report);
        break;
      case 'videotrouble':
        setStyle(styles.videotrouble);
        setAva(cameraerror);
        break;
      case 'microtrouble':
        setStyle(styles.microtrouble);
        setAva(microerror);
        break;
      case 'technical':
        setStyle(styles.technical);
        setAva(technicalerror);
        break;
      default:
        setStyle('');
        break;
    }
  });

  return (
    <div className={styles.today_not}>
      <div className={styles.notification_info}>
        <div className={styles.notificationAva + ' ' + style}>
          <img src={ava} alt="icon:notification" />
        </div>

        <span>{content}</span>
      </div>

      <div className={styles.notification_date}>{formatDate(date)}</div>
      <button type="button"></button>
    </div>
  );
};

export default Notification;
