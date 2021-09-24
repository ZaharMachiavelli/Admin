import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from 'pages/Register/Register';
import RulesPage from 'pages/RulesPage/RulesPage';
import YandexNative from 'components/Modals/YALogin/YALogin';
import { WithAuth } from 'components/HOC/WithAuth';
import Page404 from 'pages/Page404/Page404';
import Button from 'components/Button/Button';
import Loading from 'components/Loading/Loading';
import UIText from 'utils/UIText';
import GameTables from 'pages/Admin/GameTables/GameTables';
import Statistic from 'pages/Admin/Statistic/Statistic';
import PlayersTables from 'pages/Admin/PlayersTable/PlayersTable';
import Notifications from 'pages/Admin/Notifications/Notifications';
import useURLParams from 'hooks/useURLParams';

const AppRouter = () => {
  const history = useHistory();

  const roomId = useURLParams().get('invite');
  if (roomId) return <Redirect to={'/lobby?room=' + roomId} />;

  const homeBtn = <Button text={UIText.back} onClick={() => history.push('/home')} />;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/rules" component={() => <RulesPage btn={homeBtn} />} />
          <Route exact path="/yandexAuth" component={YandexNative} />
 

          {/* ADMIN */}
          <Route exact path="/" component={() => <Redirect to={'/Statistic'} />} />
          <Route exact path="/Gametables" component={GameTables} />
          <Route exact path="/Statistic" component={Statistic} />
          <Route exact path="/Players" component={PlayersTables} />
          <Route exact path="/Notifications" component={Notifications} />

          <Route path="/" component={Page404} />
        </Switch>
      </Suspense>
    </>
  );
};

export default WithAuth(AppRouter);
