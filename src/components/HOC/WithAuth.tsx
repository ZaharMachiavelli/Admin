import React, { useEffect } from 'react';
import Register from 'pages/Register/Register';
import { getCookie, setCookie } from 'utils/cookieApi';
import Loading from 'components/Loading/Loading';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { appActions } from 'store/app/reducer';
import { profileActions } from 'store/profile/reducer';
import { useHistory } from 'react-router-dom';
import { YAAuth } from 'api';
import { Metrics } from '../../utils/Metrics';
import { setPlayerSDK } from 'utils/utils';

// eslint-disable-next-line react/display-name
export const WithAuth = (Component: any) => (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.app.isAuth);

  useEffect(() => {
    const cookieInfo = getCookie('mafia_user_key');
    let ya_token = getCookie('ya_token');
    let path = '';
    if (window.location.href.includes('access_token')) {
      ya_token = /access_token=(.+?)&/.exec(window.location.href)![1];
      // eslint-disable-next-line no-debugger
      // path = /path=(.+?)#/.exec(window.location.href)![1];
      // path.includes('game')
      //   ? Metrics.hitEvent(Metrics.events.came_back_oauth)
      //   : Metrics.hitEvent(Metrics.events.came_back_oauth_endgame);
      setCookie('ya_token', ya_token, { 'max-age': 604000 });
      YAAuth(ya_token);
      dispatch(appActions.setIsAuth(true));
    } 
    //@ts-ignore
    if (getCookie("ya_token")?.length>0) dispatch(appActions.setIsAuth(true))
    else dispatch(appActions.setIsAuth(false))

    // if (isAuth === null) {
    //   if (cookieInfo !== undefined) {
    //     const id = /id:(.+?)(&|$)/.exec(cookieInfo)?.[1];
    //     const name = /name:(.+?)(&|$)/.exec(cookieInfo)?.[1];
    //     dispatch(profileActions.setUserInfo({ id, name: name }));

    //     if (window.is_yandex) {
    //       setPlayerSDK();
    //     } else if (ya_token !== undefined) {
    //       YAAuth(ya_token, id).then(
    //         () => {
    //           if (window.location.href.includes('access_token')) history.push(path);
    //         },
    //         () => {
    //           setCookie('ya_token', '-', { 'max-age': 0 });
    //         },
    //       );
    //     }
    //     dispatch(appActions.setIsAuth(true));
    //   } else dispatch(appActions.setIsAuth(false));
    // }
  }, []);

  return (
    <>
      {isAuth === null && <Loading />}
      {isAuth === true && <Component {...props} />}
      {isAuth === false && <Register />}
    </>
  );
};
