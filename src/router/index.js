import React, {useState, useEffect} from 'react';
import { Switch, Redirect } from 'react-router-dom';
import uniqid from 'uniqid';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import routerConfig from '../routes';
import { permissions } from './routesPermission';
import { useAuth } from '../providers/auth';


const renderRoute = (isPrivate, props) => {
  return isPrivate ? <PrivateRoute key={uniqid()} {...props} /> : <PublicRoute key={uniqid()} {...props} />;
};

const Router = () => {
  const { isAuthenticated, userProfile } = useAuth();
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [isAuthenticated]);

  const canUseRoute = path => {
    if (permissions['all'].find(route => route === path)) {
      return true;
    }

    if (!profile || Object.keys(profile).length === 0) {
      return false;
    }

    return permissions[profile.role.name].find(route => route === path);
  };

  return (
    <Switch>
      {routerConfig.map(({ isPrivate, ...props }) => {
        if (canUseRoute(props.path)) return renderRoute(isPrivate, props);
      })}
      <Redirect to="/" />
    </Switch>
  );
};

export default Router;

