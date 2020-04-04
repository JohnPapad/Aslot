import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import classes from './TimeSlotModal.module.scss';

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
      <Button color="danger" onClick={() => setModal(!modal)}>button</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className="modal-lg">
        <ModalHeader toggle={() => setModal(!modal)}>Choose a Timeslot</ModalHeader>
        <ModalBody>

        <Table bordered>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </Table>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(!modal)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}