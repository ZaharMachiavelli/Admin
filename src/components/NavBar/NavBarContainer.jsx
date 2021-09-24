import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MobileNavBar from 'components/NavBar/MobileNavBar';
import NavBar from 'components/NavBar/NavBar';
import { exitFromGame as storeExitFromGame } from 'store/playroom/reducer';
import ModalsManager from 'utils/ModalsManager';
import SettingsModal from '../Modals/Settings/SettingsModal';
import Exit from 'components/Modals/Exit/Exit';

const NavBarContainer = ({ botComp }) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(document.documentElement.clientWidth < 1000);
  const history = useHistory();
  const inHome = history.location.pathname === '/home';

  useEffect(() => {
    let i;
    if (!inHome) {
      i = setInterval(() => {
        const c = (new Date().getSeconds() % 60) / 0.59;
        setProgress(c);
      }, 1000);
    }
    return () => clearInterval(i);
  }, [inHome]);
  useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(document.documentElement.clientWidth < 1000));
  }, []);

  const exitFromGame = () => {
    ModalsManager.addModal(
      <Exit
        zIndex={2}
        onConfirm={() => {
          storeExitFromGame();
          ModalsManager.closeModal();
        }}
        onCancel={ModalsManager.closeModal}
      />,
    );
  };
  const showSettings = () => {
    ModalsManager.addModal(<SettingsModal onClose={ModalsManager.closeModal} />);
  };

  const navBarProps = {
    progress: progress,
    botComp: botComp,
    inHome: inHome,
    exitFromGame: exitFromGame,
    showSettings: showSettings,
  };

  return isMobile ? <MobileNavBar {...navBarProps} /> : <NavBar {...navBarProps} />;
};

export default NavBarContainer;
