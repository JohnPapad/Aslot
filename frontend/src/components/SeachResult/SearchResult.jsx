import React from 'react';
import {  withRouter } from 'react-router-dom';
import styles from './SearchResult.module.scss';
import { Container, Col, Row, Button, Badge } from 'reactstrap';

import Header from '../../components/UI/Header/Header';
import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';



const searchResult = (props) => {


    return (
        <Row className={"mb-4 " + styles.store_pres}>
            <Container fluid className="">
                <Row className="p-2">
                    <Col xs="3" className="p-0 m-0 border">
                        <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", maxHeight: "12vh"}} alt="Shop Photo" className="img-fluid rounded"/>
                    </Col>

                    <Col xs="9" className="p-0 m-0 pl-2 d-flex-column ">
                        <div className="d-flex align-items-center">
                            <div className={styles.shop_name}>
                                Φαρμακείο Παπαδοπούλου
                            </div>

                            <div className="text-muted small font-weight-bold ml-4 mr-2">
                                <FontAwesomeIcon icon={faMapMarkedAlt} />
                            </div>

                            <div className="text-muted small font-weight-bold ">
                                Κωννισοπούλου 28, Αθήνα
                            </div>

                        </div>

                        <div className={"d-flex align-items-center text-muted small"}> 
                            <div className="pr-5">
                                <FontAwesomeIcon  icon={faPhoneAlt} />
                                <span className="ml-2">
                                    2108736636a
                                </span>
                            </div>

                            <div  className="">
                                <FontAwesomeIcon icon={faClock} />
                                <span className="ml-2">
                                    08:83-20:34
                                </span>
                            </div>
                        </div>

                        <div className={"d-flex align-items-center mt-3"}> 
                            <div className={"font-weight-bold pr-3"}>
                                Αντισυπτικά:
                            </div>

                            <div className="pr-2">
                                {/* <span className="border pr-2 pl-2 pt-1 pb-1">
                                    12
                                </span> */}

                                <Badge pill>14</Badge>

                                <span className="small ml-2">
                                    διαθέσιμα
                                </span>
                            </div>

                            <div className="pl-4">
                                <Button className="font-weight-bold">
                                    Κράτηση
                                </Button>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}




export default searchResult;