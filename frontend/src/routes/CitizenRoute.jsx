import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


function CitizenRoute({ component: Component, user, ...rest }) {
    return (
        <Route {...rest} render={props => (
            (user && (user.userRole === 'USER' || user.userRole === 'ADMIN'))
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    );
}


function mapStateToProps(state) {
    const { userStore } = state;
    const { user } = userStore;
    return {
        user,
    };
}

const connectedCitizenRoute = connect(mapStateToProps)(CitizenRoute);
export { connectedCitizenRoute as CitizenRoute };