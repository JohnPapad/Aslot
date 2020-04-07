import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from '../../../services/axiosConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classes from './SearchShopInput.module.scss';
import { Container, Row, Col, InputGroup, InputGroupAddon, Button, Input, FormFeedback } from 'reactstrap';

import MyInput from '../../../components/UI/MyInput/MyInput';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';

import { userActions } from '../../../stores/userStore';


export default function SearchShopMap(props) {
    
    const updateAddress = (val) => {
        const valid = val != '';
        props.setAddress({address: val, addressValid: valid});
    }

    return (
        <Col className="p-0">
            <InputGroup className="p-0" id={classes.form}>
                <Input
                    id={classes.r_border}
                    value={props.query}
                    type={"text"}
                    placeholder={"Τι ψάχνεις;"}
                    onChange={(e) => props.setQuery(e.target.value)}
                />
                <Input
                    id={classes.remHl}
                    // name={"Η διεύθυνσή σου"}
                    value={props.address}
                    type={"text"}
                    readOnly={props.readOnly}
                    placeholder={"Που είσαι; Οδός Αριθμός, Δήμος"}
                    onChange={(e) => updateAddress(e.target.value)}
                    onBlur={(e) => props.updateMap ? props.updateMap() : ''}
                    invalid = {props.invalidAddress}
                    disabled = {props.addressDisabled}
                />
                <InputGroupAddon addonType="append">
                    <MyBtn size="SM" borderWidth='0' clickedHandler={props.onSubmit}>
                        <FontAwesomeIcon icon={faSearch} className="mr-2"/>
                        <span style={{letterSpacing: "1px"}}>
                            Αναζήτηση
                        </span>
                    </MyBtn>
                    {/* <Button className="font-weight-bold" id={classes.submit_btn} onClick={props.onSubmit}>
                        <FontAwesomeIcon icon={faSearch} className="mr-2"/>
                        Αναζήτηση
                    </Button> */}
                </InputGroupAddon>
                <FormFeedback>Παρακαλώ εισάγετε διεύθυνση</FormFeedback>
            </InputGroup>
        </Col>
    );
}