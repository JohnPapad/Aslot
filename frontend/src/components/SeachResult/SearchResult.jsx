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

const addressClickedHandler = (storeId) => {
    alert("address handler")
}


const searchResult = (props) => {
    return (       
        <Row  className={"mb-4 p-2 " + styles.store_pres}>
            <Col xs="3" className="p-0 m-0 border">
                <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", height: "15vh"}} alt="Shop Photo" className="img-fluid rounded"/>
            </Col>

            <Col xs="9" className="p-0 m-0 pl-2 d-flex-column ">
                <div className="d-flex align-items-center">
                    <div className={styles.shop_name} onClick={()=>bookBtnClickedHandler("3", props.history)}>
                        {props.name}
                    </div>

                    <div className={styles.address +" text-muted small font-weight-bold ml-4"} onClick={()=>addressClickedHandler("ID")}>
                        <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2"/>
                        {props.address}
                    </div>
                </div>

                <div className={"d-flex align-items-center text-muted small"}> 
                    <div className="pr-5">
                        <FontAwesomeIcon  icon={faPhoneAlt} />
                        <span className="ml-2">
                            {/* {props.} */}
                            τηλ Δεν εχει το ρισπονς
                        </span>
                    </div>

                    <div  className="">
                        <FontAwesomeIcon icon={faClock} />
                        <span className="ml-2">
                            {props.openingFrom}-{props.openingTo}
                        </span>
                    </div>
                </div>

                <div className={styles.item + " mt-2"}>
                    ιτεμ Δεν εχει το ρισπονς
                </div>

                <div className={"d-flex align-items-center"}> 
                    <div className="pr-5">
                        <span className="small mr-2">
                            Διαθέσιμα
                        </span>
                        <Badge pill id={styles.icon_bg}>Δεν εχει το ρισπονς</Badge>
                    </div>

                    <div className="mr-auto">
                        <span className="small mr-2">
                            Τιμη
                        </span>
                        <Badge id={styles.icon_bg}>Δεν εχει το ρισπονς €</Badge>
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
    );
}




export default withRouter(searchResult);