import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row, Col, Container } from 'reactstrap';
import classes from './TimeSlotModal.module.scss';
import DayTimeSlot from './DayTimeSlot/DayTimeSlot';

export default function TimeSlotModal(props) {
//   const {
//     buttonLabel,
//     className
//   } = props;

  const [modal, setModal] = useState(false);

  // Create table
  const table = () => {
      
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
                    <DayTimeSlot day="Δευτέρα"/>
                    <DayTimeSlot day="Τρίτη"/>
                    <DayTimeSlot day="Τετάρτη"/>
                    <DayTimeSlot day="Πέμπτη"/>
                    <DayTimeSlot day="Παρασκευή"/>
                    <DayTimeSlot day="Σάββατο"/>
                    <DayTimeSlot day=" Κυριακή"/>

                </Row>
                </Container>

            </ModalBody>
            <ModalFooter>
                <Button color="danger" className="font-weight-bold mr-4" onClick={() => setModal(!modal)}>Cancel</Button>
                <Button size="md" id={classes.btn_bg} onClick={() => setModal(!modal)}>Κράτηση παραγγελίας</Button>
            </ModalFooter>
        </Modal>
    </div>
  );
}