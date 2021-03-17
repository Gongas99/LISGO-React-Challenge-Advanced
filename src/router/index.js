import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
//import uniqid from 'uniqid';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import routerConfig from '../routes';

const renderRoute = (isPrivate, props) => {
  return isPrivate ? <PrivateRoute {...props} /> : <PublicRoute {...props} />;
};

const Router = () => {
  return (
    <Switch>
      {routerConfig.map(({ isPrivate, standalone, ...props }) =>
        standalone ? renderRoute(isPrivate, props) : renderRoute(isPrivate, props),
      )}
      <Redirect to="/" />
    </Switch>
  );
};

export default Router;
