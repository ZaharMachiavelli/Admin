import React from 'react';
import s from './NavBar.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'store';
import YALoginBtn from 'components/YALoginBtn/YALoginBtn';
import defaultAvatar from 'assets/images/icons/man.svg';
import styles from './MobileNavBar.scss';

const NavBar = ({ botComp, inHome, exitFromGame, showSettings }) => {
  const history = useHistory();
  const YAAuth = useSelector((state) => state.app.YAAuth);
  const profile = useSelector((state) => state.profile);
  const myNumber = useSelector((state) => state.playroom.myNumber);

  const profileBtn = (
    <button className={s.profileBtn} onClick={() => history.push('/profile')}>
      <img alt={'Профиль'} src={profile.avatar === null ? defaultAvatar : profile.avatar} />
    </button>
  );

  return inHome ? (
    <div className={s.homeWrapper}>
      <div className={s.btnTop}>
        {!YAAuth && (
          <div className={s.YALogin}>
            <YALoginBtn red />
          </div>
        )}
        {profileBtn}
      </div>
      <div>
        <button className={s.btn + ' ' + s.rulesBtn} onClick={() => history.push('/rules')} />
        <button className={s.btn + ' ' + s.ratingBtn} onClick={() => history.push('/rating')} />
        <button className={s.btn + ' ' + s.otherGameBtn} onClick={() => history.push('/otherGames')} />
      </div>
      <div>
        <button className={s.btn + ' ' + s.settingsBtn} onClick={showSettings} />
      </div>
    </div>
  ) : (
    <>
      <div className={s.gameWrapper}>
        <div className={s.leftBlock}>
          <span>{myNumber}</span>
          {profileBtn}
          <span className={s.name}>{profile.name}</span>
          <button className={s.btn + ' ' + s.settingsBtn} onClick={showSettings} />
          <button className={s.btn + ' ' + s.exitBtn} onClick={exitFromGame} />
        </div>
        <div className={s.logo} />
        <div className={s.botComp}>{botComp}</div>
      </div>
      <div className={s.progress} id={'progressBar'} />
    </>
  );
};

export default NavBar;
