import React, { useState } from 'react';
import styles from './RegisterModal.scss';
import Button from 'components/Button/Button';
import { setCookie } from 'utils/cookieApi';
import { useDispatch } from 'react-redux';
import { appActions } from 'store/app/reducer';
import { profileActions } from 'store/profile/reducer';
import { createId, getRandomName, onClickYALoginBtn, validateName } from 'utils/utils';
import logo from 'assets/images/logo.svg';
import UIText from 'utils/UIText';
import { Metrics } from 'utils/Metrics';
import { store } from "../../../store";

const RegisterModal = (props: { onSubmit: () => void }) => {
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState(null as null | string);
  const [name, setName] = useState(getRandomName() as null | string);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    Metrics.hitEvent(Metrics.events.name);
    setName(e.target.value);
  };
  const onSubmit = (isAdult: boolean) => {
    Metrics.hitEvent(Metrics.events.age);
    if (name) {
      const error = validateName(name).error;
      if (error !== undefined) {
        setNameError(error);
      } else {
        const id = createId();
        const cookie = Object.entries({ id, name, isAdult })
          .map(([k, v]) => `${k}:${v}`)
          .join('&');
        setCookie('mafia_user_key', cookie, { 'max-age': 604000 });
        dispatch(profileActions.setUserInfo({ id, name, isAdult }));
        dispatch(appActions.setIsAuth(true));
        props.onSubmit();
      }
    }
  };
  const onClickYandexLogin = async () => {
    Metrics.hitEvent(Metrics.events.oauth_onboarding);
    const id = createId();
    const cookie = Object.entries({ id, isAdult: true })
      .map(([k, v]) => `${k}:${v}`)
      .join('&');
    setCookie('mafia_user_key', cookie, { 'max-age': 604000 });
    dispatch(profileActions.setUserInfo({ id }));
    await onClickYALoginBtn();
    if (store.getState().app.YAAuth) {
      dispatch(appActions.setIsAuth(true));
      props.onSubmit();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.content}>
          <p className={styles.enterYandex}>{UIText.register.enterYandex}</p>
          <div className={styles.YABlock}>
            <Button text={UIText.register.enterGame} className={styles.YALoginBtn} onClick={onClickYandexLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
