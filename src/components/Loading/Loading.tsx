//@ts-nocheck
import React, { useEffect, useState } from 'react';
import styles from './Loading.scss';
import loadingLogo from 'assets/images/icons/loadingLogo.svg';
import aim from 'assets/images/icons/aim.svg';
import Button from 'components/Button/Button';
import { useHistory } from 'react-router-dom';
import UIText from '@/utils/UIText';
const Loading = () => {
  const history = useHistory();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      try {
        document.getElementById('goHomeBtn')!.style.display = 'block';
      } catch (e) {
        return;
      }
    }, 10000);
  }, []);

  const onClickExit = () => {
    if (counter > 0) window.location.reload();
    exitFromGame().then(() => {
      setCounter((counter) => counter + 1);
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          {/* <img src={NewMask} className={styles.mask}/> */}
          <img className={styles.logo} src={loadingLogo} alt={'Mafia'} />
        </div>
        <div className={styles.loadingText}>
          <span>{UIText.loading}</span>
          <img src={aim} alt="ico:shooting" className={styles.rot} />
        </div>
        <Button id={'goHomeBtn'} text={UIText.back} className={styles.goNomeBtn} onClick={onClickExit} />
      </div>
    </div>
  );
};

export default Loading;
