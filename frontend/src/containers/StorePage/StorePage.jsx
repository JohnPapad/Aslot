import React, { useState } from 'react';

import styles from './StorePage.module.scss';

import { Container, Row, Col, Button, Input, Badge } from 'reactstrap';
import TimeSlotModal from '../../components/TimeSlotModal/TimeSlotModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt, faHourglassHalf, faUsers, faUserClock, faAt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import LocationMap from '../../components/UI/LocationMap/LocationMap';
import InventoryItem from './InventoryItem/InventoryItem';
import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { useDispatch, useSelector } from "react-redux";
import { specifActions } from '../../stores/specifStore';

export default function StorePage(props) {
    console.log('STOREEEEEEPAGE');
    console.log(props.match.params.id);

    const specifics = useSelector(state => state.specifReducer);
    console.log(specifics);

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

            <Row className="mb-5 d-flex align-items-stretch justify-content-start border-bottom pb-5">
                    <InventoryItem selected={true}/>

                    <div className="d-flex align-items-stretch" id={styles.selected_items}>

                        <div className="flex-shrink-1 p-1 border-right">
                            <FontAwesomeIcon icon={faShoppingBasket} size="5x" className={styles.icon}/>
                        </div>

                        <div className="d-flex flex-column" >
                            <div className="d-flex flex-wrap align-items-center justify-content-start border p-2">
                                <div className="mr-4">
                                    <span className={"mr-2 " + styles.item}>
                                        Χειρουργικη μασκα: 
                                    </span>
                                    <span className="">
                                        3
                                    </span>
                                </div>

                                <div className="mr-4">
                                    <span className={"mr-2 " + styles.item}>
                                        Χειρουργικη μασκα: 
                                    </span>
                                    <span className="">
                                        3
                                    </span>
                                </div>

                                <div className="mr-4">
                                    <span className={"mr-2 " + styles.item}>
                                        Χειρουργικη μασκα: 
                                    </span>
                                    <span className="">
                                        3
                                    </span>
                                </div>

                            </div>

                            <div className="d-flex h-100 pl-2 pr-2 align-items-center justify-content-between border">
                                <div>
                                    <span className="font-weight-bold mr-2">
                                        Συνολικό κόστος:
                                    </span>
                                    <Badge id={styles.icon_bg} className="p-2">13 €</Badge>
                                </div>

                                <div>
                                    <Input bsSize="md" type="text" placeholder="email" id={styles.input_email}/>
                                </div>

                                <div>
                                    {/* <Button size="md" id={styles.btn_bg}>
                                        Επιλέξτε χρονοθυρίδα
                                    </Button> */}

                                    <TimeSlotModal />
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </Row>

            <Row className="mt-5">
                <div class="d-flex align-items-stretch flex-wrap">
                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>

                    <InventoryItem/>
                    <InventoryItem/>
                    <InventoryItem/>
                </div>
            </Row>

        </Container>
    );
}