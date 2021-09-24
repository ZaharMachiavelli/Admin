import React from 'react';
import styles from './YALoginBtn.scss';
import YALetter from 'assets/images/icons/YALetter.png';
import YALetterRed from 'assets/images/icons/YALetter_red.png';
import ModalsManager from 'utils/ModalsManager';
import YALogin from 'components/Modals/YALogin/YALogin';

type Props = {
  red?: boolean;
};

const YALoginBtn = ({ red }: Props) => {
  const onClick = () => {
    ModalsManager.addModal(<YALogin onCancel={ModalsManager.closeModal} onConfirm={ModalsManager.closeModal} />);
  };

  return <img className={styles.YALetter} onClick={onClick} alt={'Yandex'} src={red ? YALetterRed : YALetter} />;
};

export default YALoginBtn;
