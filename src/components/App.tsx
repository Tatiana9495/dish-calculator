import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { pages } from '../consts/paths';
import Beverages from './pages/beverages/Beverages';
import ColdDepartment from './pages/coldDepartment/ColdDepartment';
import Deserts from './pages/deserts/Deserts';
import HotDepartment from './pages/hotDepartment/HotDepartment';
import Main from './pages/main/Main';
import SignIn from './pages/signIn/SignIn';
import SingleDish from './pages/singleDish/SingleDish';

const App: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={pages.signIn} component={SignIn} />
      <Route exact path={pages.main} component={Main} />
      <Route exact path={pages.hotDepartment} component={HotDepartment} />
      <Route exact path={pages.coldDepartment} component={ColdDepartment} />
      <Route exact path={pages.deserts} component={Deserts} />
      <Route exact path={pages.beverages} component={Beverages} />
      <Route exact path={pages.singleDish} component={SingleDish} />
    </Switch>
  );
};

export default App;
