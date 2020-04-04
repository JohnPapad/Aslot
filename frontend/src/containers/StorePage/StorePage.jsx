import React, { useState } from 'react';

import classes from './StorePage.module.scss';

import { Container, Row, Col, Button } from 'reactstrap';
import TimeSlotModal from '../../components/TimeSlotModal/TimeSlotModal';

export default function StorePage() {


    return (
        <Container fluid id={classes.content} className="border">

            <Row>
                <Col xs="8" className="border">


                </Col>

                <Col xs="4" className="border">


                </Col>
            </Row>

            <Row className="mb-5">
                <div class="d-flex align-items-stretch">
                    <div className="border p-3">
                        <div>
                            Χειρουργικες Μασκες
                        </div>
                        <div>
                            Διαθεσιμα τεμαχια: 10
                        </div>
                        <div>
                            <Button>
                                Κρατησησ
                            </Button>
                        </div>
                    </div>

                    <div className="border">
                        <div>
                            Χειρουργικες Μασκες
                        </div>
                        <div>
                            Διαθεσιμα τεμαχια: 10
                        </div>
                        <div>
                            <Button>
                                Κρατησησ
                            </Button>
                        </div>
                    </div>
                </div>
            </Row>

            <TimeSlotModal />
        </Container>
    );
}