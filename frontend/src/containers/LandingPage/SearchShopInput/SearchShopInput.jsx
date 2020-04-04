import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


import axios from '../../../services/axiosConfig';


import classes from './SearchShopInput.module.scss';
import { Container, Row, Col } from 'reactstrap';


import MyInput from '../../../components/UI/MyInput/MyInput';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';

import { userActions } from '../../../stores/userStore';


export default function SearchShopMap() {
    
    const history = useHistory();
    const [query, setQuery] = useState(' ');

    // submitHandler = (event) => {
    //     authAPI.signUp(axios, formData).then(res => {
    //         // alert("Form Submitted");
    //         console.log(res);
    //         if (!res) {
    //             return;
    //         }

    //         if (!res.success) {
    //             console.log("signup NOT successful");
    //             if (res.data.message === "Sign up error: email is already taken") {
    //                 this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
    //             }
    //             else if (res.data.message === "Sign up error: mismatching password") {
    //                 this.setFormField("password1", "Passwords don't match", "is-invalid", null);
    //             }
    //         }
    //         else {
    //             console.log("signup Successful");
    //             const { token, ...user } = res.data;
    //             this.props.onSignUpSuccess(token, user);
    //             this.props.history.replace("/feed");
    //         }
    //     });
    // }


    //----------------------------------------------------------------

    return (
        <Container>
                <Col>
                <MyInput
                    id={"signup_shop_address"}
                    name={"Τι ψάχνεις;"}
                    value={query}
                    type={"text"}
                    placeholder={"Αντικείμενο"}
                    feedback={null}
                    validity={''}
                    changed={(e) => setQuery(e.target.value)}
                />
                </Col>         
        </Container>
    );
}