import React from 'react';
import Button from 'components/Button/Button';
import RulesPage from 'pages/RulesPage/RulesPage';
import UIText from 'utils/UIText';
import ModalsManager from 'utils/ModalsManager';
import RegisterModal from 'components/Modals/Register/RegisterModal';
import { Metrics } from 'utils/Metrics';

const Register = () => {
  const btnOnClick = () => {
    Metrics.hitEvent(Metrics.events.rules);
    ModalsManager.addModal(
      <RegisterModal
        onSubmit={() => {
          // if (window.is_yandex) window.app_history
          ModalsManager.closeModal();
        }}
      />,
    );
  };

  return <RulesPage showLogo={true} btn={<Button onClick={btnOnClick} text={UIText.buttons.further} />} />;
};

export default Register;
