import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Col } from 'reactstrap';
import classes from './DayTimeSlot.module.scss';

const la = () => {
    alert("dd")
}

export default function DayTimeSlot(props) {

    return (
        <Col>
            <Row className={classes.day + " border"}>
                <Col>
                    {props.day}
                </Col>
            </Row>

            <Row className="border">
                <Col className={classes.slot + " p-0 d-flex justify-content-center font-weight-bold"} onClick={la}>
                    12:33-22:30
                </Col>
            </Row>

            <Row className="border">
                <Col>
                    12:33-22:30
                </Col>
            </Row>
        </Col>
    )


}