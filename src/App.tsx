import React, { useEffect } from 'react';
import '@/styles/index.global.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Loading from 'components/Loading/Loading';
import { isMobile } from 'utils/utils';
import AppRouter from 'AppRouter';
import { Router } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { QueryClientProvider, QueryClient } from 'react-query';
const client = new QueryClient();
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//@ts-ignore
window.is_yandex = window.self !== window.top;
console.log('Is yaGames: ' + window.is_yandex);
const history = window.is_yandex ? createMemoryHistory() : createBrowserHistory();
window.app_history = history;
window.ya_app_id = '176741';

const setBodyHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--body-height', `${window.innerHeight}px`);
};

const App = () => {
  useEffect(() => {
    // Чтобы на телефонах высота body учитывала блок с урлом
    if (isMobile()) {
      window.addEventListener('resize', setBodyHeight);
      setBodyHeight();
      // document.body.style.height = window.innerHeight.toString() + "px";
    }

    // init ServiceWorker
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/src/sw.js')
    //     .then(() => navigator.serviceWorker.ready.then((worker) => {
    //       worker.sync.register('syncdata');
    //     }))
    //     .catch((err) => console.log(err));
    // }
    //
    // window.addEventListener('beforeinstallprompt', (e) => {
    //   console.log('Приложение предложило установиться!');
    // })
    // setTimeout(() => {
    //   console.log(window.ysdk)
    //   window.ysdk.getPlayer().then((_player: any) => {
    //     console.log(_player)
    //   }).catch((err: any) => {
    //     // Если игрок не авторизован, выбрасывает исключение USER_NOT_AUTHORIZED.
    //   })
    // }, 2000)
  }, []);

  return (
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          
            <div className={'application'}>
              <ToastContainer
                position="bottom-center"
                autoClose={4000}
                // autoClose={false}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
              />
              <div className={'bgFix'} /> {/* Черный фон */}
              <QueryClientProvider client={client}>
                <AppRouter />
              </QueryClientProvider>
              <div id="modals_container" />
            </div>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
