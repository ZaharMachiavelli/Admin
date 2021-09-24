import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameTables from './GameTables';
import GameTablePage from './components/GameTablePage/GameTablePage';

const GameTableRouter = () => {
  return (
    <Switch>
      <Route exact path="/admin/games" component={GameTables} />
      <Route path="/admin/games/table" component={GameTablePage} />
    </Switch>
  );
};

export default GameTableRouter;
