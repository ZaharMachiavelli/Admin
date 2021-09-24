import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GameTableRouter from './GameTables/GameTablesRouter';
import Statistic from 'pages/Admin/Statistic/Statistic';
import PlayerCard from 'pages/Admin/PlayerCard/PlayerCard';
import Notifications from 'pages/Admin/Notifications/Notifications';
import PlayersTable from 'pages/Admin/PlayersTable/PlayersTable';
import GameTablePage from 'pages/Admin/GameTables/components/GameTablePage/GameTablePage';

const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path={'/admin'}>
        <Redirect to={'/admin/statistic'} />
      </Route>
      <Route exact path={`/admin_games`} component={GameTableRouter} />
      <Route path={'/admin/statistic'} component={Statistic} />
      <Route exact path={`/admin/player`} component={PlayersTable} />
      <Route path={`/admin/notifications`} component={Notifications} />
      <Route path={`/admin/player/:userid`} component={PlayerCard} />
      <Route path={`/admin/games/table`} component={GameTablePage} />
    </Switch>
  );
};

export default AdminRouter;
