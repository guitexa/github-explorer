import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact><Dashboard/></Route>
    <Route path="/repository/:repository+"><Repository/></Route>
  </Switch>
)

export default Routes;
