import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = ({ layout: Layout, component: Component, standalone = false, isPrivate = false, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Layout ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  layout: PropTypes.func,
  component: PropTypes.func,
  standalone: PropTypes.bool,
  isPrivate: PropTypes.bool,
};

export default PublicRoute;
