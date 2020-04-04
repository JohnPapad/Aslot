import React, { useState } from 'react';
import styles from './InventoryItem.module.scss';
import { Container, Row, Col, Button, Card, CardBody, CardImg, Badge, Input, CardTitle,Media } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt, faHourglassHalf, faUsers, faUserClock, faAt } from '@fortawesome/free-solid-svg-icons';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';


export default function Inventory(props) {

    return (
        <div className={"pr-4 pb-4"} >
            <Container fluid id={props.selected ? styles.item_hl : styles.item}>
                <Row>
                    <Col xs="3" className="p-1 m-0">
                        <img src="https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png" style={{width: "100%", height: "12vh"}} alt="Shop Photo" className="img-fluid rounded"/>
                    </Col>

                    <Col xs="9" className="p-0 m-0 pl-2 pr-2 d-flex-column">
                        <div className={"d-flex align-items-center justify-content-start mb-0"}> 
                            <div className={styles.tittle}>
                                Χειρουργικες Μασκες
                            </div>                       
                        </div>

                        <div className={"d-flex align-items-center justify-content-between mb-2"}> 
                            <div className="">
                                <span className="small mr-2">
                                    Διαθέσιμα
                                </span>
                                <Badge pill id={styles.icon_bg}>14</Badge>
                            </div>

                            <div className="">
                                <span className="small mr-2">
                                    Τιμή
                                </span>
                                <Badge id={styles.icon_bg}>13 €</Badge>
                            </div>
                        </div>

                        <div className={"d-flex align-items-center justify-content-start"}>
                            <div className="flex-shrink">
                                <Input bsSize="sm" value="1" type="number" min="1" max="5" id={styles.input_num}/> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );

}