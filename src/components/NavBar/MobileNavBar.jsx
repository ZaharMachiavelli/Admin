import React from 'react';
import styles from './MobileNavBar.scss';
import classnames from 'classnames';
import YandexNativeBtn from 'components/YALoginBtn/YALoginBtn';
import { useSelector } from 'store';
import { useHistory } from 'react-router-dom';
// imgs
import logo from 'assets/images/icons/logo.png';
import defaultAvatar from 'assets/images/icons/man.svg';

const MobileNavBar = ({ botComp, inHome, exitFromGame, showSettings }) => {
  const history = useHistory();
  const YAAuth = useSelector((state) => state.app.YAAuth);
  const profile = useSelector((state) => state.profile);

  return (
    <div className={styles.wrapper} id={'BOT_NAV_BAR'}>
      <div className={styles.head + (!inHome ? ' ' + styles.headInGame : '')}>
        <div className={styles.progress} id={'progressBar'} />
        <div className={styles.ellipse} />
      </div>

      {inHome ? (
        <div className={styles.homeBtns}>
          <button className={styles.btn + ' ' + styles.rulesBtn} onClick={() => history.push('/rules')} />
          <button className={styles.btn + ' ' + styles.settingsBtn} onClick={showSettings} />
          <button className={styles.btn + ' ' + styles.profileBtn} onClick={() => history.push('/profile')}>
            <img alt={'Профиль'} src={profile.avatar === null ? defaultAvatar : profile.avatar} />
          </button>
          <button className={styles.btn + ' ' + styles.ratingBtn} onClick={() => history.push('/rating')} />
          <button className={styles.btn + ' ' + styles.otherGameBtn} onClick={() => history.push('/otherGames')} />
          {!YAAuth && (
            <div className={styles.YALogin}>
              <YandexNativeBtn />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.gameBtns}>
          <button className={styles.btn + ' ' + styles.settingsBtn} onClick={showSettings} />
          <img src={logo} alt={'Mafia'} className={styles.logo} />
          <button className={styles.btn + ' ' + styles.exitBtn} onClick={exitFromGame} />
        </div>
      )}

      {botComp && (
        <div className={classnames(styles.botCompContainer, { [styles.botCCInGame]: !inHome })}>{botComp}</div>
      )}
    </div>
  );
};

export default MobileNavBar;
