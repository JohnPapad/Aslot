import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../services/axiosConfig';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './SignUp.module.scss';
import { Form, Card, CardHeader, CardBody, Container, Row, Col, Button, CardFooter } from 'reactstrap';
import classnames from 'classnames';
import MyInput from '../../../components/UI/MyInput/MyInput';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';

import { storesApi } from '../../../services/storesApi';
import { nominatimApi } from '../../../services/nominatimApi';
import { userActions } from '../../../stores/userStore';
import DateCalendar from '../../../components/UI/DateCalendar/DateCalendar';
import LocationMap from '../../../components/UI/LocationMap/LocationMap';


// import Header from '../../components/UI/Header/Header';
import { checkValidity } from '../../../utilities/validityUtility';
import { formatDate } from '../../../utilities/dateUtility';

class SignUp extends React.Component {

    state = {
        startingLat: 38.075331037,
        startingLng: 23.794199477,
        selectedLat: null,
        selectedLng: null,
        hasLocation: false,

        formControls: {

            name: {
                rules: {
                    required: true,
                    onlyLettersDotsAndSpace: true,
                    minLength: 4,
                    maxLength: 25
                },
                id: "signup_shop_name",
                name: "Επωνυμία επιχείρησης",
                value: '',
                type: "text",
                placeholder: "π.χ. Φαρμακείο Παπαδόπουλου",
                feedback: null,
                validity: ''
            },

            telephone: {
                rules: {
                    required: true,
                    isTel: true
                },
                id: "signup_shop_tel",
                name: "Τηλέφωνο επιχείρησης",
                value: '',
                type: "text",
                placeholder: "π.χ. 2106543987",
                feedback: null,
                validity: ''
            },

            hours: {
                rules: {
                    required: true,
                    isTimeDur: true
                },
                id: "signup_shop_hours",
                name: "Ωράριο λειτουργίας",
                value: '',
                type: "text",
                placeholder: "π.χ. 08:00-18:00",
                feedback: null,
                validity: ''
            },

            email: {
                rules: {
                    required: true,
                    isEmail: true
                },
                id: "signup_shop_email",
                name: "Email",
                value: '',
                type: "text",
                placeholder: "example@example.com",
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
                id: "signup_shop_pwd",
                name: "Κωδικός πρόσβασης",
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
                id: "signup_user_shop_rep",
                name: "Επιβεβαίωση κωδικού πρόσβασης",
                value: '',
                type: "password",
                placeholder: 'Confirm Password',
                feedback: null,
                validity: ''
            },

            // first_name: {
            //     rules: {
            //         required: true,
            //         onlyLetters: true,
            //         minLength: 2,
            //         maxLength: 20
            //     },
            //     id: "signup_shop_user_name",
            //     name: "Όνομα ιδιοκτήτη",
            //     value: '',
            //     type: "text",
            //     placeholder: "owner's name",
            //     feedback: null,
            //     validity: ''
            // },

            // last_name: {
            //     rules: {
            //         required: true,
            //         onlyLetters: true,
            //         minLength: 2,
            //         maxLength: 20
            //     },
            //     id: "signup_shop_user_surname",
            //     name: "Επώνυμο ιδιοκτήτη",
            //     value: '',
            //     type: "text",
            //     placeholder: "owner's surname",
            //     feedback: null,
            //     validity: ''
            // },

            // municipality: {
            //     rules: {
            //         required: true,
            //         address: true,
            //     },
            //     id: "signup_shop_munipalicty",
            //     name: "Δήμος",
            //     value: 'Δήμος Αθηνών',
            //     type: "text",
            //     placeholder: "Δήμος",
            //     feedback: null,
            //     validity: ''
            // },

            address: {
                rules: {
                    required: true,
                    isAddress: true,
                },
                id: "signup_shop_address",
                name: "Διεύθυνση",
                value: '',
                type: "text",
                placeholder: "Οδός Αριθμός, Δήμος",
                feedback: null,
                validity: ''
            },

            time_slot_duration: {
                rules: {
                    required: true,
                    isMinutes: true
                },
                id: "signup_shop_time_slot_dur",
                name: "Διάρκεια χρονοθυρίδας (σε λεπτά)",
                value: '',
                type: "text",
                placeholder: "π.χ. 10",
                feedback: null,
                validity: ''
            },

            persons_per_slot: {
                rules: {
                    required: true,
                    isNumeric: true
                },
                id: "signup_shop_persons_per_slot",
                name: "Μέγιστος αριθμός ατόμων ανά χρονοθυρίδα",
                value: '',
                type: "text",
                placeholder: "π.χ. 2",
                feedback: null,
                validity: ''
            },


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
        // authAPI.checkEmailValidity(axios, this.state.formControls.email.value).then(res => {
        //     console.log(res);
        //     if (!res) {
        //         return;
        //     }

        //     if (!res.success) {
        //         this.setFormField("email", null, 'is-valid', null);
        //     }
        //     else {
        //         this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
        //     }
        // });
    }

    checkUsernameValidity = () => {
        // authAPI.checkUsernameValidity(axios, this.state.formControls.username.value).then(res => {
        //     console.log(res);
        //     if (!res) {
        //         return;
        //     }

        //     if (!res.success) {
        //         this.setFormField("username", null, 'is-valid', null);
        //     }
        //     else {
        //         this.setFormField("username", "Username is taken", 'is-invalid', null);
        //     }
        // });
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
            if (key === "birthDate") {
                formData[key] = formatDate(this.state.formControls[key].value);
            }
            else {
                formData[key] = this.state.formControls[key].value;
            }

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
            store_type: "pharmacy",
            lat: this.state.selectedLat,
            lng: this.state.selectedLng
        };

        delete formData.hours;
        delete formData.password1;

        const open_close_hours = this.state.formControls.hours.value.split('-');
        const opening_from_hour = open_close_hours[0];
        const opening_to_hour = open_close_hours[1];

        formData = {
            ...formData,
            opening_from_hour: opening_from_hour,
            opening_to_hour: opening_to_hour
        }

        console.log("---Form Data---");
        console.log(formData);
        console.log("---------------");

        storesApi.createStore(axios, formData).then(res => {
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
                const { token, id } = res.data;
                this.props.onSignUpSuccess(token, id);
                this.props.history.replace("/");
            }
        });
    }


    //---------------------Map Stuff------------------------
    
    updateMap = () => {
        const { formControls } = this.state;
        const query = formControls.address.value.replace(/,/g, '');  //+ ' ' + formControls.municipality.value;
        console.log("query", query)

        nominatimApi.getGeoLocation(axios, query)
            .then(data => {
                if (data && data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    this.setState(
                        produce(draft => {
                            draft.startingLat = coords[1].toFixed(9);
                            draft.startingLng = coords[0].toFixed(9);
                        })
                    );

                    
                }
            });
    }

    handleMapClick = (e) => {
        nominatimApi.getAddress(axios, { lat: e.latlng.lat, lng: e.latlng.lng })
            .then(data => {
                if (data && data.features.length > 0) {
                    const locData = data.features[0].properties.geocoding;
                    const strNumber = locData.housenumber ? locData.housenumber : '';
                    // Coordinates are given in reverse order from API
                    console.log(locData)
                    const addressVal = locData.street ? locData.street + ' ' + strNumber + ', ' + locData.city : '';
                    this.setState(
                        produce(draft => {
                            draft.formControls.address.value = addressVal;
                            // draft.formControls.municipality.value = locData.city ? locData.city : '';

                            draft.selectedLat = e.latlng.lat.toFixed(9);
                            draft.selectedLng = e.latlng.lng.toFixed(9);
                            draft.hasLocation = true;
                        })
                    );

                    const res = checkValidity(addressVal, this.state.formControls.address.rules);
                    if (res.report) 
                    {
                        this.setFormField('address', null, 'is-valid', null);
                    }
                    else 
                    {
                        this.setFormField('address', res.msg, "is-invalid", null);
                    }
                }
            });
    }

    //----------------------------------------------------------------


    render() {
        const formElementsArray = [];
        for (let key in this.state.formControls) {
            formElementsArray.push({
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map(formElement => {
            if (formElement.id !== 'address' && formElement.id !== 'municipality' )
            { 
                return (
                    <MyInput
                        key={formElement.id}
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
                );
            }
        });

        const { formControls } = this.state;
        return (
            <Card id={classes.signup_form}>
                <CardHeader id={classes.header}>
                    Εγγραφή Φαρμακείου
                </CardHeader>
                
                <CardBody>

                    <p className="small text-muted">
                        Εγγραφείτε στην πλατφόρμα προκειμένου να προσφέρετε online τα προϊόντα σας και να διευκολύνετε τους πολίτες.
                    </p>

                    <Row className="justify-content-center">
                        <Col className="" xs="4">
                            {formFields}
                        </Col>

                        <Col className="" xs="8"> 
                            <Row>
                                <Col>
                                    <MyInput
                                        id={formControls.address.id}
                                        name={formControls.address.name}
                                        value={formControls.address.value}
                                        type={formControls.address.type}
                                        placeholder={formControls.address.placeholder}
                                        feedback={formControls.address.feedback}
                                        validity={formControls.address.validity}
                                        changed={(event) => this.inputChangedHandler(event, 'address')}
                                        blurred={this.updateMap}
                                    />
                                </Col>

                                {/* <Col>
                                    <MyInput
                                        id={formControls.municipality.id}
                                        name={formControls.municipality.name}
                                        value={formControls.municipality.value}
                                        type={formControls.municipality.type}
                                        placeholder={formControls.municipality.placeholder}
                                        feedback={formControls.municipality.feedback}
                                        validity={formControls.municipality.validity}
                                        changed={(event) => this.inputChangedHandler(event, 'municipality')}
                                        blurred={this.updateMap}
                                    />
                                </Col> */}
                            </Row>
                            
                            <LocationMap   
                                mapHeight={document.documentElement.clientHeight * 0.7}
                
                                startingLat={this.state.startingLat}
                                startingLng={this.state.startingLng}
                                selectedLat={this.state.selectedLat}
                                selectedLng={this.state.selectedLng}
                                hasLocation={this.state.hasLocation}

                                handleMapClick={this.handleMapClick}
                            />
                        </Col>
                    </Row>
                </CardBody>

                <CardFooter>
                    <MyBtn borderWidth='0' classes="float-right" size="MD" clickedHandler={this.submitHandler}>
                        <span >
                            Εγγραφή
                        </span>
                    </MyBtn>
                </CardFooter>
            </Card>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onSignUpSuccess: (token, user) => dispatch(userActions.authSuccess(token, user))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(withRouter(SignUp), axios));