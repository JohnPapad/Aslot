import React, { useState } from 'react';

import classes from './LandingPage.module.scss';

import { Container, Row } from 'reactstrap';
import SearchShopMap from './SearchShopMap/SearchShopMap';
import SearchShopInput from './SearchShopInput/SearchShopInput';

export default function LandingPage() {

    return (
        <Container id={classes.content}>
            <Row className={"justify-content-center pb-3"}>    
                <SearchShopInput/>
            </Row>

            <Row className="justify-content-center">            
                <SearchShopMap/>
            </Row>
        </Container>
    );
}