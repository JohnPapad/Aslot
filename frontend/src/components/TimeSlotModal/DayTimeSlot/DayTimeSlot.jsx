import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Col } from 'reactstrap';
import classes from './DayTimeSlot.module.scss';


const dummyTimeSlots = [ "08:00-09:00", "18:00-19:00", "10:00-20:00" ]
       

export default function DayTimeSlot(props) {

    let selectedDay = false;
    if (props.selectedTimeSlot)
    {
        selectedDay = props.day === props.selectedTimeSlot.day;
    }

    const timeSlots = dummyTimeSlots.map( (timeSlot, i) =>
        <Row className="border" key={i}>
            <Col id={selectedDay && timeSlot === props.selectedTimeSlot.timeSlot  ? classes.selected: ""} className={classes.slot + " p-0 d-flex justify-content-center font-weight-bold"} onClick={()=>props.slotClickedHandler(props.day, timeSlot)}>
                {timeSlot}
            </Col>
        </Row>
    );

    return (
        <Col>
            <Row className={classes.day + " border"}>
                <Col>
                    {props.day}
                </Col>
            </Row>

            {timeSlots}
            
        </Col>
    )


}