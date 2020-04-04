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
    
    return (
        <Col className="p-0">
            <InputGroup className="p-0">
                <Input
                    id={classes.remHl}
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
                    placeholder={"Οδός Αριθμός, Δήμος"}
                    onChange={(e) => props.setAddress(e.target.value)}
                    onBlur={(e) => props.updateMap ? props.updateMap() : ''}
                    invalid = {props.invalidAddress}
                />
                <InputGroupAddon addonType="append">
                    <Button className="font-weight-bold" id={classes.remHl}>
                        <FontAwesomeIcon icon={faSearch} className="mr-2"/>
                        Αναζήτηση
                    </Button>
                </InputGroupAddon>
                <FormFeedback>Παρακαλώ εισάγετε διεύθυνση</FormFeedback>
            </InputGroup>
        </Col>
    );
}