import React from 'react';
import {  withRouter } from 'react-router-dom';
import styles from './SearchResult.module.scss';
import { Container, Col, Row, Button, Badge } from 'reactstrap';

import Header from '../../components/UI/Header/Header';
import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';


const bookBtnClickedHandler = (storeId, history) => {
    history.push("/store/" + storeId);
}


const searchResult = (props) => {


    return (
        <Row className={"mb-4 " + styles.store_pres}>
            <Container fluid className="">
                <Row className="p-2">
                    <Col xs="3" className="p-0 m-0 border">
                        <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", maxHeight: "15vh"}} alt="Shop Photo" className="img-fluid rounded"/>
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

                        <div className={styles.item + " mt-2"}>
                            Αντισυπτικά
                        </div>

                        <div className={"d-flex align-items-center"}> 
                            <div className="pr-5">
                                <span className="small mr-2">
                                    Διαθέσιμα
                                </span>
                                <Badge pill >14</Badge>
                            </div>

                            <div className="mr-auto">
                                <span className="small mr-2">
                                    Τιμή
                                </span>
                                <Badge color="secondary">13 €</Badge>
                            </div>

                            <div>
                                <MyBtn classes="" borderWidth='0' size="SM" clickedHandler={()=>bookBtnClickedHandler("3", props.history)}>
                                    <span style={{ letterSpacing: "0px" }}>
                                        Κράτηση
                                    </span>
                                </MyBtn>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}




export default withRouter(searchResult);