import React from 'react';
//import { useAuth } from '../providers';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ layout: Layout, component: Component, standalone = false, ...rest }) => {
  //const { isAuthenticated } = useAuth();
  const isAuthenticated = false;
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          Layout ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  layout: PropTypes.func,
  component: PropTypes.func,
  standalone: PropTypes.bool,
  location: PropTypes.object,
};

export default PrivateRoute;
