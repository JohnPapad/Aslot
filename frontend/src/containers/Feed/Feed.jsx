import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import classes from './SignInForm.module.scss';
import { Card, CardHeader, CardBody, Container, Row, Col, Form, Alert, Button } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';
// import Header from '../../components/UI/Header/Header';
import MyBtn from '../../components/UI/MyBtn/MyBtn';
import Report from '../Report/Report';
import { reportApi } from '../../services/reportApi';
import { feedActions } from '../../stores/feedStore';


class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("feed.jsx did mount");
        reportApi.getReports(axios)
            .then(data => {
                this.props.saveFeed(data.data);
            })

    }

    render() {
        console.log(this.props);
        const { feed } = this.props;
        const { user } = this.props;

        let reports = '';
        if (feed) {
            reports = feed.map((report, index) => {
                return (
                    <Report
                        key={index}
                        id={report.id}
                        username={report.username}
                        user={report.user}
                        img={report.img}
                        municipality={report.municipality}
                        address={report.address}
                        lat={report.lat}
                        lng={report.lng}
                        significance={report.significance}
                        state={report.state}
                        description={report.description}
                        date={report.date}
                        voters={report.voters}
                        comment={report.comment}

                        currentUser={user}
                    />
                )
            })
        }


        return (
            <>
                {reports}
            </>
        );

    }

}

const mapStateToProps = (state) => {
    const { feedReducer, userReducer } = state;
    return {
        feed: feedReducer.feed,
        user: userReducer.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveFeed: (feed) => dispatch(feedActions.saveFeed(feed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(Feed), axios));
