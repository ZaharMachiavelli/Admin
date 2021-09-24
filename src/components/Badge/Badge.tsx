import React from 'react';
import styles from './Badge.scss';
import classNames from 'classnames';
import achieveBadge from 'assets/images/icons/svg/achieveBlue.svg';
import winsBadge from 'assets/images/icons/svg/achieveGreen.svg';
import gamesBadge from 'assets/images/icons/svg/achieveRed.svg';

type Props = {
  type: string;
  count: number | undefined;
  className?: string;
};
const type2image: { [key: string]: string } = {
  achievements: achieveBadge,
  wins: winsBadge,
  games: gamesBadge,
};
const Badge = ({ type, count = 0, className }: Props) => {
  const picture = type2image[type];

  return (
    <div className={classNames(styles.badge, className, { [styles.imgGrey]: count === 0 })} title={type}>
      <img src={picture} alt={'Badge'} className={styles.img} />
      <span className={styles.span}>{count}</span>
    </div>
  );
};

export default Badge;
