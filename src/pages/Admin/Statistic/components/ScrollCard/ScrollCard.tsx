import React from 'react';
import styles from './ScrollCard.scss';

type Props = {
  typeAch: string;
  valueAch: string;
};

const ScrollCard = ({ typeAch, valueAch }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <div className={styles.wrapper1}>
            <p className={styles.caption}>{typeAch}</p>
            <h2 className={styles.value}>{valueAch}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollCard;
