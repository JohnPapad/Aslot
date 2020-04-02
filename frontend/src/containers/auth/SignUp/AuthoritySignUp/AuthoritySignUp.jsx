import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../../services/axiosConfig';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
// import classes from './CitizenSignUp.module.scss';
import { Form, Card, CardHeader, CardBody, Container, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import MyInput from '../../../../components/UI/MyInput/MyInput';
import { authAPI } from '../../../../services/authApi';
import { userActions } from '../../../../stores/userStore';
import DateCalendar from '../../../../components/UI/DateCalendar/DateCalendar';
import LocationMap from '../../../../components/UI/LocationMap/LocationMap';

import MyBtn from '../../../../components/UI/MyBtn/MyBtn';

// import Header from '../../components/UI/Header/Header';
import { checkValidity } from '../../../../utilities/validityUtility';


class CitizenSignUp extends React.Component {

    state = {
        formControls: {
            email: {
                rules: {
                    required: true,
                    isEmail: true
                },
                id: "signup_auth_email",
                name: "Official Email",
                value: '',
                type: "text",
                placeholder: "example@municipality.com",
                feedback: null,
                validity: ''
            },

            password: {
                rules: {
                    required: true,
                    isPassword: true,
                    minLength: 8,
                    maxLength: 15
                },
                id: "signup_auth_pwd",
                name: "Password",
                value: '',
                type: "password",
                placeholder: 'Password',
                feedback: null,
                validity: ''
            },

            password1: {
                rules: {
                    required: true,
                    mustMatch: "password"
                },
                id: "signup_auth_pwd_rep",
                name: "Confirm Password",
                value: '',
                type: "password",
                placeholder: 'Confirm Password',
                feedback: null,
                validity: ''
            },

            username: {
                rules: {
                    required: true,
                    onlyLettersDotsAndSpace: true,
                    minLength: 2,
                    maxLength: 15
                },
                id: "signup_auth_username",
                name: "Municipality",
                value: '',
                type: "text",
                placeholder: "e.g. Kifissia",
                feedback: null,
                validity: ''
            },

            first_name: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "signup_auth_name",
                name: "Mayor's Name",
                value: '',
                type: "text",
                placeholder: "",
                feedback: null,
                validity: ''
            },

            last_name: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "signup_auth_surname",
                name: "Mayor's Surname",
                value: '',
                type: "text",
                placeholder: "",
                feedback: null,
                validity: ''
            }
        }
    }



    //---------------------Form Manipulation------------------------

    setFormField = (controlName, feedback, validity, value) => {
        this.setState(
            produce(draft => {
                draft.formControls[controlName].feedback = feedback;
                draft.formControls[controlName].validity = validity;
                if (value) {
                    draft.formControls[controlName].value = value;
                }
            })
        );
    }

    checkEmailValidity = () => {
        authAPI.checkEmailValidity(axios, this.state.formControls.email.value).then(res => {
            console.log(res);
            if (!res) {
                return;
            }

            if (!res.success) {
                this.setFormField("email", null, 'is-valid', null);
            }
            else {
                this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
            }
        });
    }

    checkUsernameValidity = () => {
        authAPI.checkUsernameValidity(axios, this.state.formControls.username.value).then(res => {
            console.log(res);
            if (!res) {
                return;
            }

            if (!res.success) {
                this.setFormField("username", null, 'is-valid', null);
            }
            else {
                this.setFormField("username", "Username is taken", 'is-invalid', null);
            }
        });
    }

    inputBlurredHandler = (event, controlName) => {
        if ((controlName === "email") && (this.state.formControls.email.validity !== "is-invalid") && (this.state.formControls.email.value.trim() !== '')) {
            //kane get request gia na tsekareis an to email einai piasmeno
            this.checkEmailValidity();
        }
        else if ((controlName === "username") && (this.state.formControls.username.validity !== "is-invalid") && (this.state.formControls.username.value.trim() !== '')) {
            this.checkUsernameValidity();
        }
        else if ((controlName === "password1") && (this.state.formControls.password1.validity !== "is-invalid") && (this.state.formControls.password1.value.trim() !== '')) {
            if (this.state.formControls.password.value !== this.state.formControls.password1.value) {
                this.setFormField("password1", "Passwords don't match", "is-invalid", null);
            }
            else if (this.state.formControls.password.validity !== "is-invalid") {
                this.setFormField("password1", null, "is-valid", null);
            }
        }
        else if ((controlName === "password") && (this.state.formControls.password1.value.trim() !== '')) {
            if (this.state.formControls.password.value !== this.state.formControls.password1.value) {
                this.setFormField("password1", "Passwords don't match", "is-invalid", null);
            }
            else {
                this.setFormField("password1", null, "is-valid", null);
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const value = event.target.value;
        this.setState(
            produce(draft => {
                draft.formControls[controlName].value = value;
            })
        );

        const res = checkValidity(value, this.state.formControls[controlName].rules);
        if (res.report) {
            //console.log("ola eginan ok");
            if ((controlName === "password1") || (controlName === "email")) {
                this.setFormField(controlName, null, '', null);
            }
            else {
                this.setFormField(controlName, null, 'is-valid', null);
            }
        }
        else {
            this.setFormField(controlName, res.msg, "is-invalid", null);
        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for (let key in this.state.formControls) {
            formData[key] = this.state.formControls[key].value;

            if (this.state.formControls[key].validity === "is-valid") {
                continue;
            }

            if (this.state.formControls[key].validity === "is-invalid") {
                formIsValid = false;
                continue;
            }

            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            if (!res.report) {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
        }

        if (!formIsValid) {
            this.setState(
                produce(draft => {
                    for (let key in errFeedBack) {
                        draft.formControls[key].feedback = errFeedBack[key];
                        draft.formControls[key].validity = "is-invalid";
                    }
                })
            );
            return;
        }


        formData = {
            ...formData,
            userType: "authority"
        };
        console.log("---Form Data---");
        console.log(formData);
        console.log("---------------");

        authAPI.signUp(axios, formData).then(res => {
            // alert("Form Submitted");
            console.log(res);
            if (!res) {
                return;
            }

            if (!res.success) {
                console.log("signup NOT successful");
                if (res.data.message === "Sign up error: email is already taken") {
                    this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
                }
                else if (res.data.message === "Sign up error: mismatching password") {
                    this.setFormField("password1", "Passwords don't match", "is-invalid", null);
                }
            }
            else {
                console.log("signup Successful");
                const { token, ...user } = res.data;
                this.props.onSignUpSuccess(token, user);
                this.props.history.replace("/feed");
            }
        });
    }


    getFormFields = (selectedFields) => {

        const formElementsArray = [];
        for (let key in this.state.formControls) {
            formElementsArray.push({
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map(formElement => {
            if (selectedFields.includes(formElement.id))
            { 
                return (
                    <Col className="align-self-center pr-5 pl-5" xs="6" key={formElement.id} >
                        <MyInput
                            id={formElement.config.id}
                            name={formElement.config.name}
                            value={formElement.config.value}
                            type={formElement.config.type}
                            placeholder={formElement.config.placeholder}
                            feedback={formElement.config.feedback}
                            validity={formElement.config.validity}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            blurred={(event) => this.inputBlurredHandler(event, formElement.id)}
                        />
                    </Col>
                );
            }
        });

        return formFields;
    }


    render() {

        const classes ={};
        const firstRow = this.getFormFields(['username', "email"]);
        const secRow = this.getFormFields(['password', "password1"]);
        const thirdRow = this.getFormFields(['first_name', "last_name"]);
        
        return (
            <>
                <Row className="justify-content-center  pr-5 pl-5">
                    {firstRow}
                </Row>

                <Row className="justify-content-center  pr-5 pl-5">
                    {secRow}
                </Row>

                <Row className="justify-content-center  pr-5 pl-5">
                    {thirdRow}
                </Row>

                <MyBtn classes="float-right mt-3 mr-3" size="MD" clickedHandler={this.submitHandler}>
                    <span style={{ textShadow: "2px 2px 2px black" }}>
                        Sign Up
                    </span>
                </MyBtn>
            </>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onSignUpSuccess: (token, user) => dispatch(userActions.authSuccess(token, user))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(withRouter(CitizenSignUp), axios));