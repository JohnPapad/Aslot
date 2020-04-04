import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './TimeSlotModal.module.scss';

export default function TimeSlotModal(props) {
//   const {
//     buttonLabel,
//     className
//   } = props;

  const [modal, setModal] = useState(false);

  // Create 

  return (
    <div>
      <Button color="danger" onClick={() => setModal(!modal)}>button</Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} dialogClassName={classes.dialog}>
        <ModalHeader toggle={() => setModal(!modal)}>Modal title</ModalHeader>
        <ModalBody>

        <table class="table">
            <caption>Select A Timeslot</caption>
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            </tr>
            </tbody>
        </table>





        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(!modal)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}