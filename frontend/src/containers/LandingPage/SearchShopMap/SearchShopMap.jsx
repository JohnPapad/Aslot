import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


import axios from '../../../services/axiosConfig';


import classes from './SearchShopMap.module.scss';
import { Container, Col, Row } from 'reactstrap';


import MyInput from '../../../components/UI/MyInput/MyInput';
import MyBtn from '../../../components/UI/MyBtn/MyBtn';

import { nominatimApi } from '../../../services/nominatimApi';
import { storesApi } from '../../../services/storesApi';
import LocationMap from '../../../components/UI/LocationMap/LocationMap';


export default function SearchShopMap() {
    
    const history = useHistory();
    const [startingPos, setStartingPos] = useState({
        startingLat: 38.075331037, 
        startingLng: 23.794199477
    })
    const [markerPos, setMarkerPos] = useState({
            selectedLat: null,
            selectedLng: null,
            hasLocation: false,
        })
    const [address, setAddress] = useState(' ');

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


    const getPins = () => {
        console.log("TESTING PINS API");
        storesApi.getPins(axios)
            .then(res => console.log(res));
    }

    useEffect(() => {
        getPins();
    })


    //---------------------Map Stuff------------------------
    
    const updateMap = () => {
        nominatimApi.getGeoLocation(axios, address.replace(/,/g, ' '))
            .then(data => {
                if (data && data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    setStartingPos({
                        startingLat: coords[1].toFixed(9),
                        startingLng: coords[0].toFixed(9)
                    });
                }
            });
    }

    const handleMapClick = (e) => {
        nominatimApi.getAddress(axios, { lat: e.latlng.lat, lng: e.latlng.lng })
            .then(data => {
                if (data && data.features.length > 0) {
                    const locData = data.features[0].properties.geocoding;
                    const street = locData.street ? locData.street : '';
                    const strNumber = locData.housenumber ? ' ' + locData.housenumber : '';
                    const city = locData.city ? locData.city : ''

                    // Coordinates are given in reverse order from API
                    console.log('LOCDATA');
                    console.log(locData)

                    setMarkerPos({
                        selectedLat: e.latlng.lat.toFixed(9),
                        selectedLng: e.latlng.lng.toFixed(9),
                        hasLocation: true
                    });
                    setAddress(street + strNumber + ", " + city);
                    
                }
            });
    }

    return (
        <Container id={classes.signup_form}>
            <Col >
                {/* <Row className="justify-content-center">     */}
                    <MyInput
                        id={"signup_shop_address"}
                        name={"Διεύθυνση"}
                        value={address}
                        type={"text"}
                        placeholder={"Οδός Αριθμός"}
                        feedback={null}
                        validity={''}
                        changed={(e) => setAddress(e.target.value)}
                        blurred={updateMap}
                    />            
                {/* </Row> */}

                {/* <Row className="justify-content-center">             */}
                    <LocationMap
                        mapHeight={document.documentElement.clientHeight * 0.7}
                
                        startingLat={startingPos.startingLat}
                        startingLng={startingPos.startingLng}
                        selectedLat={markerPos.selectedLat}
                        selectedLng={markerPos.selectedLng}
                        hasLocation={markerPos.hasLocation}

                        handleMapClick={handleMapClick}
                    />
                {/* </Row> */}
            </Col>
        </Container>
    );
}