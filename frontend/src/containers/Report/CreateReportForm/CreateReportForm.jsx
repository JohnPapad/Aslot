import React from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../../services/axiosConfig';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// import classes from './CitizenSignUp.module.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CustomInput, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import MyInput from '../../../components/UI/MyInput/MyInput';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';

import { authAPI } from '../../../services/authApi';
import { nominatimApi } from '../../../services/nominatimApi';
import { userActions } from '../../../stores/userStore';
import { feedActions } from '../../../stores/feedStore';


import LocationMap from '../../../components/UI/LocationMap/LocationMap';

import { checkValidity } from '../../../utilities/validityUtility';

import { reportApi } from '../../../services/reportApi';
import classes from './CreateReportForm.module.scss';


class CreateReportForm extends React.Component {

    state = {
        startingLat: 38.075331037,
        startingLng: 23.794199477,
        selectedLat: null,
        selectedLng: null,
        hasLocation: false,

        uploadPhoto: null,

        dropdownValue: '3',

        formControls: {
            // title: {
            //     rules: {
            //         required: true,
            //     },
            //     id: "report_title",
            //     name: "Title",
            //     value: '',
            //     type: "text",
            //     placeholder: "",
            //     feedback: null,
            //     validity: ''
            // },

            description: {
                rules: {
                    required: true,
                    minLength: 30,
                    maxLength: 500
                },
                id: "report_description",
                name: "Destription",
                value: '',
                type: "textarea",
                placeholder: "",
                feedback: null,
                validity: ''
            },

            municipality: {
                rules: {
                    required: true,
                    address: true,
                },
                id: "report_munipalicty",
                name: "Municipality",
                value: 'Municipality of Likovrisi - Pefki',
                type: "text",
                placeholder: "",
                feedback: null,
                validity: ''
            },

            address: {
                rules: {
                    required: true,
                    address: true,
                },
                id: "report_address",
                name: "Address",
                value: '',
                type: "text",
                placeholder: "StreetName Number",
                feedback: null,
                validity: ''
            },

        }
    }

    selectDropdown = (event) => {
        const num = event.target.value;
        this.setState(
            produce(draft => {
                draft.dropdownValue = num;
            })
        );
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
                        console.log('invalid' + key);
                    }
                })
            );

            return;
        }

        let formReq = new FormData();
        formReq.append('description', this.state.formControls.description.value);
        formReq.append('significance', this.state.dropdownValue);
        formReq.append('municipality', this.state.formControls.municipality.value);
        formReq.append('address', this.state.formControls.address.value);
        formReq.append('img', this.state.uploadPhoto);
        formReq.append('lat', this.state.selectedLat);
        formReq.append('lng', this.state.selectedLng);

        console.log("---Create report Data---");
        console.log(formReq);
        console.log("---------------");

        reportApi.createReport(axios, formReq).then(res => {

            // alert("Form Submitted");
            console.log("res:",res);
            if (!res) {
                return;
            }

            // this.props.addFeed();
            this.props.history.push("/feed");

            // if (!res.success) {
            //     console.log("signup NOT successful");
            //     if (res.data.message === "Sign up error: email is already taken") {
            //         this.setFormField("email", "This email address is connected with an existing account", 'is-invalid', null);
            //     }
            //     else if (res.data.message === "Sign up error: mismatching password") {
            //         this.setFormField("password1", "Passwords don't match", "is-invalid", null);
            //     }
            // }
            // else {
            //     console.log("signup Successful");
            //     this.props.onSignUpSuccess(res.data.token, res.data.userId, res.data.username);
            //     this.props.history.replace("/");
            // }
        });
    }


    //---------------------Map Stuff------------------------

    updateMap = () => {
        const { formControls } = this.state;
        const query = formControls.address.value + ' ' + formControls.municipality.value;
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
                    const strNumber = locData.housenumber ? ' ' + locData.housenumber : '';
                    // Coordinates are given in reverse order from API
                    this.setState(
                        produce(draft => {
                            draft.formControls.address.value = locData.street ? locData.street + strNumber : draft.formControls.address.value;
                            draft.formControls.municipality.value = locData.county ? locData.county : draft.formControls.municipality.value;

                            draft.selectedLat = e.latlng.lat.toFixed(9);
                            draft.selectedLng = e.latlng.lng.toFixed(9);
                            draft.hasLocation = true;
                        })
                    );


                }
            });
    }


    //---------------------Photo Stuff------------------------

    onPhotoSelect = (event) => {
        event.persist();

        this.setState((prevState, props) => {
            return produce(prevState, draft => {
                draft.uploadPhoto = event.target.files[0];
            });
        });
    }


    //----------------------------------------------------------------

    render() {
        const descElement = { id: 'description', config: this.state.formControls['description'] };

        let formFields = (
            <>
                <Col>
                    <MyInput
                        key={descElement.id}
                        id={descElement.config.id}
                        name={descElement.config.name}
                        value={descElement.config.value}
                        type={descElement.config.type}
                        placeholder={descElement.config.placeholder}
                        feedback={descElement.config.feedback}
                        validity={descElement.config.validity}
                        changed={(event) => this.inputChangedHandler(event, descElement.id)}
                    />
                </Col>

            </>
        );

        const { formControls } = this.state;
        return (
            <>
                <Row className={" border " + classes.verHeight}>
                    <Col className="" xs="5">
                        <Row>
                            {formFields}
                        </Row>
                        <Row>
                            {/* <input
                                    accept="image/*"
                                    className={classes.imgUpBtn}
                                    id="contained-button-file"
                                    // multiple
                                    type="file"
                                    onChange={this.onPhotoSelect}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span">
                                        Upload Photo
                                        </Button>
                                </label> */}
                            <Col>
                                <FormGroup className="ml-0 mr-0 ">
                                    <Label for="photoCustomFileBrowser" className="font-weight-bold small ">Upload Photo</Label>
                                    <CustomInput className="small " type="file" id="photoCustomFileBrowser" name="uploadPhoto" label="Take a photo of the issue!" onChange={this.onPhotoSelect} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                            {
                                this.state.uploadPhoto ?
                                    (
                                        <img 
                                            // style={{height: document.documentElement.clientHeight * 0.50 + 'px '}} 
                                            className={classes.reportImg} 
                                            src={URL.createObjectURL(this.state.uploadPhoto)} 
                                            alt={""} 
                                        />
                                    ) : ''
                            }
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="7">
                        <Row>
                            <Col xs="2" className="pl-3">
                                <FormGroup>
                                    <Label for="signSelect" className="font-weight-bold small ">Significance</Label>
                                    <Input type="select" value={this.state.dropdownValue} bsSize="md" id="signSelect" onChange={this.selectDropdown}>
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                        <option value="3" >3</option>
                                        <option value="4" >4</option>
                                        <option value="5" >5</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col xs="5">
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

                            <Col xs="5">
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
                            </Col>
                        </Row>
                        <LocationMap
                            mapHeight={document.documentElement.clientHeight * 0.68}

                            startingLat={this.state.startingLat}
                            startingLng={this.state.startingLng}
                            selectedLat={this.state.selectedLat}
                            selectedLng={this.state.selectedLng}
                            hasLocation={this.state.hasLocation}

                            handleMapClick={this.handleMapClick}
                        />
                    </Col>
                </Row>

                <MyBtn classes="float-right mt-3" size="MD" clickedHandler={this.submitHandler}>
                    <span style={{ textShadow: "2px 2px 2px black" }}>
                        Create Report
                    </span>
                </MyBtn>
            </>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {
        addFeed: (feed) => dispatch(feedActions.addFeed(feed)),
        onSignUpSuccess: (token, user) => dispatch(userActions.authSuccess(token, user))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(withRouter(CreateReportForm), axios));