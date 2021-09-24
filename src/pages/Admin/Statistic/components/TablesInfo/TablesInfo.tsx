import React, { useRef, useEffect } from 'react';
import styles from './TablesInfo.scss';
import classNames from 'classnames';
import UIText from 'utils/UIText';

type Props = {
  lobby: number;
  random: number;
};

const InfoRow = ({
  random,
  lobby,
  className = [],
  mobile = false,
  desktop = false,
}: {
  random: number;
  lobby: number;
  className?: string[] | string;
  mobile?: boolean;
  desktop?: boolean;
}) => {
  useEffect(() => {
    let precision = 64;
    let radius = 45;
    let c = [...Array(precision)].map((_, i) => {
      let a = (-i / (precision - 1)) * Math.PI * 2;
      let x = Math.cos(a) * radius + 50;
      let y = Math.sin(a) * radius + 50;
      return `${x}% ${y}%`;
    });

    //@ts-ignore
    document.getElementById(
      'timer',
    ).style.clipPath = `polygon(100% 50%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%, ${c.join(',')})`;
  }, []);

  useEffect(()=>{
      let progress = document.getElementById("timer");
      progress?.style.setProperty("--deg", ((lobby/(random+lobby))*360).toString())
  },[])

  return (
    <div
      className={classNames(
        styles.row,
        { [styles.mobileOnly]: mobile, [styles.desktopOnly]: desktop },
        ...(Array.isArray(className) ? className : [className]),
      )}>
      <div className={styles.row__item}>
        <h2 className={styles.row__value}>{random}</h2>
        <div className={styles.item__caption}>
          <div className={classNames(styles.dot, styles.dotRed)} />
          <span>{UIText.admin.statistic.random}</span>
        </div>
      </div>
      <div className={styles.row__item}>
        <h2 className={styles.row__value}>{lobby}</h2>
        <div className={styles.item__caption}>
          <div className={classNames(styles.dot, styles.dotGreen)} />
          <span>{UIText.admin.statistic.lobby}</span>
        </div>
      </div>
    </div>
  );
};

const TablesInfo = ({ lobby, random }: Props) => {
  const total = lobby + random;
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <div className={styles.circle__inner}>
          <div className={styles.circle__wrapper}>
            <p className={styles.circle__caption}>
              {UIText.admin.statistic.createdTables}
            </p>
            <h1 className={styles.circle__total}>{total}</h1>
            

            <div className={styles.timerContainer}>
              <div id="timer" className={styles.timer}>

              </div>
            </div>


            <InfoRow className={styles.rowDesktop} lobby={lobby} random={random} desktop />
          </div>
        </div>
      </div>
      <InfoRow lobby={lobby} random={random} mobile />
    </div>
  );
};

export default TablesInfo;
