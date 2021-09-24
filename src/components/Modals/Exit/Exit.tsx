import React from 'react';
import styles from './Exit.scss';
import Button from 'components/Button/Button';
import UIText from 'utils/UIText';

export type Props = {
  onConfirm: any;
  onCancel: any;
  zIndex?: number;
};

const Exit = ({ onConfirm, onCancel, zIndex }: Props) => {
  return (
    <div className={styles.container} style={{ zIndex }}>
      <p className={styles.text}>{UIText.quit_game}</p>
      <div className={styles.btns}>
        <Button text={'Да'} className={styles.btn} onClick={onConfirm} />
        <Button text={'Нет'} className={styles.btn} gray onClick={onCancel} />
      </div>
    </div>
  );
};

export default Exit;
