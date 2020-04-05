import React, { useState } from 'react';

import styles from './StorePage.module.scss';

import axios from '../../services/axiosConfig';

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

    const slotClickedHandler = (day, timeSlot) =>{
        console.log(day, timeSlot);
    }

    const [amountValues, setAmountValues] = useState({});

    // call specifActions get everything 
    const dispatch = useDispatch();
    const specifics = useSelector(state => state.specifReducer);
    if (specifics.noData == true && specifics.fetching == false) {
        const idFromUrl = props.match.params.id;
        dispatch(specifActions.redirectToStore(axios, idFromUrl));
        return null;
    }
    if (!specifics.store) {
        return null;
    }

    console.log(specifics);

    const changeAmountValue = (id, val) => {
        const newAmountValues = {...amountValues};
        newAmountValues[id] = val;
        setAmountValues(newAmountValues);
    }

    const store = specifics.store;
    const items = specifics.items;
    const timeslots = specifics.timeslots;
    const selectedItem = specifics.selectedItem;
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
                                    {store.name}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faMapMarkedAlt } className={"mr-2"}/>
                                    Διεύθυνση: 
                                </div>

                                <div>
                                    {store.address}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faPhoneAlt} className={"mr-2"}/>
                                    Τηλέφωνο επικοινωνίας:
                                </div>

                                <div>
                                    {store.telephone}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faAt} className={"mr-2"}/>
                                    Email:
                                </div>

                                <div>
                                    {store.email}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faClock} className={"mr-2"}/>
                                    Ωράριο λειτουργίας:
                                </div>

                                <div>
                                    {store.opening_from_hour + '-' + store.opening_to_hour}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faHourglassHalf} className={"mr-2"}/>
                                    Διάρκεια Χρονοθυρίδας:
                                </div>

                                <div>
                                    {store.time_slot_duration}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faUsers} className={"mr-2"}/>
                                    Μέγιστος αριθμός ατόμων ανά Χρονοθυρίδα:
                                </div>

                                <div>
                                    {store.persons_per_slot}
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </Col>

                <Col xs="4" className="border p-0">
                    <LocationMap   
                        mapHeight={document.documentElement.clientHeight * 0.34}
        
                        startingLat={store.lat}
                        startingLng={store.lng}
                        selectedLat={store.lat}
                        selectedLng={store.lng}
                        hasLocation={true}

                        // handleMapClick={this.handleMapClick}
                    />
                </Col>
            </Row>

            { selectedItem ? (
                <Row className="mb-5 d-flex align-items-stretch justify-content-start border-bottom pb-5">
                    <InventoryItem 
                        selected={true} 
                        item={selectedItem} 
                        
                        changeAmountValue={changeAmountValue}
                    />

                    <div className="d-flex align-items-stretch" id={styles.selected_items}>

                        <div className="flex-shrink-1 p-1 border-right">
                            <FontAwesomeIcon icon={faShoppingBasket} size="5x" className={styles.icon}/>
                        </div>

                        <div className="d-flex flex-column" >
                            <div className="d-flex flex-wrap align-items-center justify-content-start border p-2">
                                <div className="mr-4">
                                    <span className={"mr-2 " + styles.item}>
                                        {selectedItem.name}
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

                                    <TimeSlotModal slotClickedHandler={slotClickedHandler}/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Row>) : (<></>)
            }

            <Row className="mt-5">
                {items.map(item => {
                    if (!selectedItem || item.id != selectedItem.id) {
                        return (
                            <InventoryItem
                                item={item} 
                            
                                changeAmountValue={changeAmountValue}
                            />
                        );
                    }
                    else {
                        return null;
                    }
                })}
            </Row>

        </Container>
    );
}