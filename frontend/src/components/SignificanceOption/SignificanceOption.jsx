import React from 'react';
import { Col } from 'reactstrap';
import classes from './SignificanceOption.module.scss';


const significanceOption = (props) => {


    return (
        <Col xs='2' className={'d-flex justify-content-center ' + classes.importanceOption} onClick={props.importanceOptionChosenHandler}>
            {props.option}
        </Col>
    );
}


export default significanceOption;