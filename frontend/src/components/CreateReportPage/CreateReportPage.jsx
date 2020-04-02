import React from 'react';

import { Row, Col } from 'reactstrap';

import CreateReportForm from '../../containers/Report/CreateReportForm/CreateReportForm';

// import bg_city_img from '../../assets/images/my_city_background.svg';
import classes from './CreateReportPage.module.scss';

export default function CreateReportPage(props) {

    return (
        <Row id={classes.content} className="justify-content-center ">
            <Col xs='12' className="pb-5 pl-5 pr-5">
                <CreateReportForm/>
            </Col>
        </Row>
    );
}