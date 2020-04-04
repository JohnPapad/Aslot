import React, { useState } from 'react';
import styles from './InventoryItem.module.scss';
import { Container, Row, Col, Button, Card, CardBody, CardImg, Badge, Input, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt, faHourglassHalf, faUsers, faUserClock, faAt } from '@fortawesome/free-solid-svg-icons';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';


export default function Inventory(props) {

    return (
        <div className={"pr-4 pb-4"}> 
            <Card style={{width: "15vw"}} id={props.selected ? styles.item_hl : styles.item}>
                <CardImg top width="100%" src="https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png" alt="Item Img" style={{width: "100%", height: "18vh"}} alt="Shop Photo" className="img-fluid rounded"/>
                <CardBody className="p-2">
                    
                    <CardTitle className={styles.tittle + " mb-0"}>
                        Χειρουργικες Μασκες
                    </CardTitle>

                    {/* <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button> */}

                    <div className={"d-flex align-items-center justify-content-between"}> 
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

                    <div className={"d-flex align-items-center justify-content-between mt-2"}> 
                        <div>
                            <Input value="1" type="number" min="1" max="5" id={styles.input_num}/> 
                        </div>

                        <div>
                            <MyBtn classes="" borderWidth='0' size="SM" clickedHandler={()=>props.add("id", "quantity")}>
                                <span style={{ letterSpacing: "0px" }}>
                                    Κράτηση
                                </span>
                            </MyBtn>
                        </div>
                    </div>

                </CardBody>
            </Card>
         </div>


    );

}