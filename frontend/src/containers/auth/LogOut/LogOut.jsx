import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../../stores/userStore';

class LogOut extends Component {
    
    componentDidMount () {
        this.props.onLogOut();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(userActions.logOut())
    };
};

export default connect(null, mapDispatchToProps)(LogOut);