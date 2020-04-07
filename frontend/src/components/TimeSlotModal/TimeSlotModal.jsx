import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Col, Container } from 'reactstrap';
import classes from './TimeSlotModal.module.scss';
import DayTimeSlot from './DayTimeSlot/DayTimeSlot';

export default function TimeSlotModal(props) {
//   const {
//     buttonLabel,
//     className
//   } = props;

    console.log("selected time slot: ", props.selectedTimeSlot)

    const [modal, setModal] = useState(false);

    // Create table
    const cancelClickedHandler = () => {
        props.deleteSlotClickedHandler();
        setModal(!modal);
    }

    const submitOrderHandler = () => {
        props.submitHandler();
        // setModal(!modal);
    }

    return (
        <div>

            <Button size="md" onClick={() => setModal(!modal)} id={classes.btn_bg}>
                Επιλέξτε χρονοθυρίδα
            </Button>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} className="modal-lg">
                <ModalHeader toggle={() => setModal(!modal)} id={classes.header_bg}>
                    <span  id={classes.header}> Επιλέξτε μια διαθέσιμη χρονοθυρίδα</span>
                </ModalHeader>
                <ModalBody>
                    <Container fluid  className="p-2">
                        <Row className={"border"}>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Δευτέρα" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Τρίτη" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Τετάρτη" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Πέμπτη" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Παρασκευή" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Σάββατο" slotClickedHandler={props.slotClickedHandler}/>
                            <DayTimeSlot selectedTimeSlot={props.selectedTimeSlot} day="Κυριακή" slotClickedHandler={props.slotClickedHandler}/>
                        </Row>
                    </Container>

                </ModalBody>
                <ModalFooter className="d-flex align-items-center justify-content-between pl-2 pr-2">
                    <div className="text-small mr-auto font-weight-bold" style={{color: "red"}}>
                        {props.formInvalidFeedback}
                    </div>

                    <div>
                        <Button color="danger" className="font-weight-bold mr-3" onClick={cancelClickedHandler}> Ακύρωση </Button>
                        <Button size="md" id={classes.btn_bg} onClick={submitOrderHandler}> Κράτηση παραγγελίας </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    );
}