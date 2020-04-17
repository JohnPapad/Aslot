import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './SearchResult.module.scss';
import { Container, Col, Row, Button, Badge } from 'reactstrap';

import Header from '../../components/UI/Header/Header';
import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import axios from '../../services/axiosConfig';

import { useDispatch, useSelector } from "react-redux";
import { specifActions } from '../../stores/specifStore';





export default function SearchResult(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const goToStore = () => {
        dispatch(specifActions.redirectToStore(axios, props.id, history, props.item));
    }

    return (       
        <Row  className={"mb-4 p-2 " + styles.store_pres}>
            <Col xs="3" className="p-0 m-0 border">
                <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", height: "15vh"}} alt="Shop Photo" className="img-fluid rounded"/>
            </Col>

            <Col xs="9" className="p-0 m-0 pl-2 d-flex-column ">
                <div className="d-flex align-items-center">
                    <div className={styles.shop_name} onClick={()=>goToStore()}>
                        {props.name}
                    </div>

                    <div className={styles.address +" text-muted small font-weight-bold ml-4"} onClick={()=>props.addressClickedHandler(props.id)}>
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2"/>
                        {props.address}
                    </div>
                </div>

                <div className={"d-flex align-items-center text-muted small"}> 
                    <div className="pr-5">
                        <FontAwesomeIcon  icon={faPhoneAlt} />
                        <span className="ml-2 font-weight-bold">
                            {props.telephone}
                        </span>
                    </div>

                    <div  className="">
                        <FontAwesomeIcon icon={faClock} />
                        <span className="ml-2 font-weight-bold">
                            {props.openingFrom}-{props.openingTo}
                        </span>
                    </div>
                </div>

                <div className={styles.item + " mt-2"}>
                    {props.item.name}
                </div>

                <div className={"d-flex align-items-center"}> 
                    <div className="pr-5">
                        <span className="small mr-2 font-weight-bold">
                            Διαθέσιμα
                        </span>
                        <Badge pill id={styles.icon_bg}>{props.item.quantity}</Badge>
                    </div>

                    <div className="mr-auto">
                        <span className="small mr-2 font-weight-bold">
                            Τιμή
                        </span>
                        <Badge id={styles.icon_bg}>{props.item.price}€</Badge>
                    </div>

                    <div>
                        <MyBtn classes="" borderWidth='0' size="SM" clickedHandler={()=>goToStore()}>
                            <span style={{ letterSpacing: "0px" }}>
                                Κράτηση
                            </span>
                        </MyBtn>
                    </div>
                </div>
                
            </Col>
        </Row>
    );
}