import React from 'react';

import { Row, Col } from 'reactstrap';

import SignInForm from '../../containers/auth/SignInForm/SignInForm';

import bg_city_img from '../../assets/images/my_city_background.svg';
import classes from './SignInPage.module.scss';

export default function SignInPage(props) {

    const styles = {
        backgroundImage: `url(${bg_city_img})`,
          backgroundPosition: 'center', //center
            backgroundSize: 'contain', //cover
            backgroundRepeat: 'no-repeat', //repeat
            overflow: 'hidden',
            // backgroundAttachment: "scroll",
            // height: "75vh",
            // trasfrom: "scale(0.7)",
            // maxWidth: "900px",
            // maxHeight: "50%",
            // border: "5px solid blue",
            // filter: "blur(2px)"
    }

    return (
        <Row style={styles} id={classes.content}>
            <Col xs='8' > 
            </Col>
            <Col xs='4' className="align-self-center pb-5">
                <SignInForm/>
            </Col>
        </Row>
    );
}