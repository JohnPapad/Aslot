import React, { useState } from 'react';

import classes from './StorePage.module.scss';

import { Container, Row, Button } from 'reactstrap';
import TimeSlotModal from '../../components/TimeSlotModal/TimeSlotModal';

export default function StorePage() {


    return (
        <Container id={classes.content}>
            <TimeSlotModal />
        </Container>
    );
}