import React, { useState } from 'react';

import styles from './StorePage.module.scss';

import { Container, Row, Col, Button, Form } from 'reactstrap';
import TimeSlotModal from '../../components/TimeSlotModal/TimeSlotModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt, faHourglassHalf, faUsers, faUserClock, faAt } from '@fortawesome/free-solid-svg-icons';
import LocationMap from '../../components/UI/LocationMap/LocationMap';
import InventoryItem from './InventoryItem/InventoryItem';

export default function StorePage() {


    return (
        <Container fluid id={styles.content}>

            <Row className="mb-5">
                <Col xs="8" className="pr-5">
                    <Row  className={"p-2 " + styles.store_pres}>
                        <Col xs="4" className="p-0 m-0 border">
                            <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", height: "32vh"}} alt="Shop Photo" className="img-fluid rounded"/>
                        </Col>

                        <Col xs="8" className="p-0 m-0 pl-2 d-flex-column ">
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles.shop_name}>
                                    Φαρμακείο Παπαδοπούλου
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faMapMarkedAlt } className={"mr-2"}/>
                                    Διεύθυνση: 
                                </div>

                                <div>
                                    Κωνισσοπούλου 12, Αθήνα
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faPhoneAlt} className={"mr-2"}/>
                                    Τηλέφωνο επικοινωνίας:
                                </div>

                                <div>
                                    2108736636
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faAt} className={"mr-2"}/>
                                    Email:
                                </div>

                                <div>
                                    example@example.com
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faClock} className={"mr-2"}/>
                                    Ωράριο λειτουργίας:
                                </div>

                                <div>
                                    08:83-20:34
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faHourglassHalf} className={"mr-2"}/>
                                    Διάρκεια Χρονοθυρίδας:
                                </div>

                                <div>
                                    10'
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faUsers} className={"mr-2"}/>
                                    Μέγιστος αριθμός ατόμων ανά Χρονοθυρίδα:
                                </div>

                                <div>
                                    5
                                </div>
                            </div>
                            
                        </Col>
                    </Row>


                </Col>

                <Col xs="4" className="border p-0">
                    <LocationMap   
                        mapHeight={document.documentElement.clientHeight * 0.34}
        
                        startingLat={38.075331037}
                        startingLng={23.794199477}
                        selectedLat={38.075331037}
                        selectedLng={23.794199477}
                        hasLocation={true}

                        // handleMapClick={this.handleMapClick}
                    />
                </Col>
            </Row>

            <Row className="mb-5 d-flex align-items-stretch justify-content-between">
                    <InventoryItem selected={true}/>

                    <div className="d-flex flex-column border">
                        <div className="d-flex flex-wrap align-items-center justify-content-start border">
                            <div>
                                Χειρουργικη μασκα: 3
                            </div>

                            <div>
                                Αντισηπτικο: 3
                            </div>

                            <div>
                                Αντισηπτικο: 3
                            </div>
                            

                        </div>

                        <div className="">
                            σςςξδξςδξξς
                        </div>
                    </div>
            </Row>

            <Row className="mt-5">
                <div className="d-flex align-items-stretch flex-wrap">
                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>

                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>
                </div>
            </Row>

            <TimeSlotModal />
        </Container>
    );
}