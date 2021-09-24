import React from 'react';
import styles from './RulesPage.scss';
import logo from 'assets/images/logo.svg';
import UIText from 'utils/UIText';
import Title from 'components/Title/Title';

type Props = {
  showLogo?: boolean;
  btn?: any;
  navbar?: any;
};

const RulesPage = ({ showLogo = false, btn, navbar }: Props) => {
  return (
    <div className={styles.rulesPage}>
      <div className={styles.content}>
        {showLogo && <img className={styles.logo} src={logo} alt="logo" />}
        <Title text={UIText.titles.rules} withArrows={true} classname={styles.rulesTitle} />
        <p className={styles.rulesText}>{UIText.rulesText}</p>
        {btn && btn}
      </div>
      {navbar && navbar}
    </div>
  );
};

export default RulesPage;
