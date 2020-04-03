import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Layout from './hoc/Layout/Layout';

import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { CitizenRoute } from './routes/CitizenRoute';
import { AuthorityRoute } from './routes/AuthorityRoute';

import { authAPI } from './services/authApi';
import axios from './services/axiosConfig';

import { Container, Row, Col } from 'reactstrap';
import SignUp from './containers/auth/SignUp/SignUp';
// import LogOut from './containers/auth/LogOut/LogOut';
import LandingPage from './containers/LandingPage/LandingPage';

import Report from './containers/Report/Report';
import LogOut from './containers/auth/LogOut/LogOut';
import CreateReportPage from './components/CreateReportPage/CreateReportPage';
import Feed from './containers/Feed/Feed';

// https://www.youtube.com/watch?v=U9wuQmW8F_0

class App extends Component {

    render() {

        return (
            <div className="App">
                <Layout >

                <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/report" component={Report} />
                    <Route exact path="/reportform" component={CreateReportPage} />
                    <Route exact path="/feed" component={Feed} />
                    <Route exact path="/logout" component={LogOut} />

                    <Route exact path="/" component={LandingPage} />
                    {/* <Route exact path="/register" component={Register} />
                    <Route exact path="/browse" component={BrowseAuctions} />

                    <Route exact path="/viewauction/:id" component={ViewAuction} />

                    <Route path="/notfound" component={NotFound} />

                    <UserRoute exact path="/profile" component={ProfilePage} />

                    <UserRoute exact path="/myauctions" component={MyAuctions} />
                    <UserRoute exact path="/myauctions/create-auction" component={CreateAuction} />
                    <UserRoute exact path="/myauctions/edit-auction" component={EditAuction} />
                    <UserRoute exact path="/messages" component={Messages} />

                    <AdminRoute path="/verify" component={AdminPage} />
                    <AdminRoute path="/import-export" component={ImportExportPage} />

                    <Route render={() => <Redirect to="/" />} /> */}
                </Switch>

                </Layout>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        // isAuthed : state.auth.token ? true : false,
    }
}

const mapDispatchToProps = dispatch => {
    return {        

    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

