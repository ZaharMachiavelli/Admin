import React from 'react';
import Button from 'components/Button/Button';
import styles from './YALogin.scss';
import { onClickYALoginBtn } from 'utils/utils';
import UIText from 'utils/UIText';
import DeepCodecProvider from 'utils/Jitsi/DeepCodecProvider';
import { Metrics } from 'utils/Metrics';

type props = {
  onConfirm?: () => void;
  onCancel?: () => void;
};
const YALogin = ({ onConfirm, onCancel }: props) => {
  const onClick = () => {
    Metrics.hitEvent(Metrics.events.oauth_endgame);
    if (DeepCodecProvider.isInstantiated()) DeepCodecProvider.destroy();
    onClickYALoginBtn();
    onConfirm && onConfirm();
  };

  return (
    <div className={styles.YALogin}>
      <div className={styles.content}>
        <p>{UIText.yandex_login_big_text}</p>
        <div className={styles.btnsContainer}>
          <Button className={styles.btn} yandex={true} text={UIText.enterGame} onClick={onClick} />
          <Button className={styles.btn} gray={true} text={UIText.back} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default YALogin;
