import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { connect } from 'react-redux';

import { pages } from '../consts/paths';
import Beverages from './pages/beverages/Beverages';
import ColdDepartment from './pages/coldDepartment/ColdDepartment';
import Desserts from './pages/desserts/Desserts';
import HotDepartment from './pages/hotDepartment/HotDepartment';
import Main from './pages/main/Main';
import SignIn from './pages/signIn/SignIn';
import SingleDish from './pages/singleDish/SingleDish';
import Ingredients from './pages/ingredients/Ingredients';

interface IApp {
  // props: ReactPropTypes;
  dish: null | {
    collection: string;
    id: string;
    title: string;
    portion: string | number;
  };
}

const App: React.FC<IApp> = ({ dish }: IApp): JSX.Element => {
  const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);

  if (isLoaded(auth) && isEmpty(auth))
    return (
      <Switch>
        <Route exact path={pages.signIn} component={SignIn} />
        <Redirect from="/" to={pages.signIn} />
      </Switch>
    );

  return (
    <Switch>
      <Route exact path={pages.main} component={Main} />
      <Route exact path={pages.hotDepartment} component={HotDepartment} />
      <Route exact path={pages.coldDepartment} component={ColdDepartment} />
      <Route exact path={pages.deserts} component={Desserts} />
      <Route exact path={pages.beverages} component={Beverages} />
      {dish && <Route exact path={`/${dish.collection}/${dish.id}`} component={SingleDish} />}
      <Route exact path={pages.ingredients} component={Ingredients} />
      <Redirect from="/" to={pages.main} />
    </Switch>
  );
};

export default connect((state: IApp) => ({
  dish: state.dish,
}))(App);
