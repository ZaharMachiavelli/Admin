import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from 'store';
import React from 'react';

class ModalsManager {
  private static modals: JSX.Element[] = [];
  private static showModal = () => {
    if (ModalsManager.modals.length > 0) {
      const modal = ModalsManager.modals[ModalsManager.modals.length - 1];
      ReactDOM.render(React.createElement(Provider, { store }, modal), document.getElementById('modals_container'));
    } else ReactDOM.unmountComponentAtNode(document.getElementById('modals_container') as HTMLElement);
  };

  static addModal = (modal: JSX.Element) => {
    ModalsManager.modals.push(modal);
    ModalsManager.showModal();
  };
  static closeModal = () => {
    ModalsManager.modals.pop();
    ModalsManager.showModal();
  };
}

export default ModalsManager;
