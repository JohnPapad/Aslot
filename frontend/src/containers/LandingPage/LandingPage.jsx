import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import classes from './LandingPage.module.scss';
import axios from '../../services/axiosConfig';

import { Container, Row, Col } from 'reactstrap';
import SearchShopInput from './SearchShopInput/SearchShopInput';

import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { nominatimApi } from '../../services/nominatimApi';
import { storesApi } from '../../services/storesApi';
import LocationMap from '../../components/UI/LocationMap/LocationMap';

export default function LandingPage() {

    const history = useHistory();
    const [query, setQuery] = useState('');
    const [startingPosAndPins, setStartingPosAndPins] = useState({
        startingLat: null, 
        startingLng: null,
        pins: null
    })
    const [markerPos, setMarkerPos] = useState({
        selectedLat: null,
        selectedLng: null,
        hasLocation: false,
    })
    const [{address, addressValid}, setAddress] = useState({address: '', addressValid: true});


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


    //---------------------Map Stuff------------------------
    useEffect(() => {
        storesApi.getPins(axios)
            .then(res => {
                if (res) {
                    setStartingPosAndPins({
                        startingLat: res.center.lat, 
                        startingLng: res.center.lng,
                        pins: res.pins
                    });
                }
            })
    }, [])
    
    const updateMap = () => {
        nominatimApi.getGeoLocation(axios, address.replace(/,/g, ' '))
            .then(data => {
                if (data && data.features.length > 0) {
                    const coords = data.features[0].geometry.coordinates;
                    // Coordinates are given in reverse order from API
                    setStartingPosAndPins({
                        startingLat: coords[1].toFixed(9),
                        startingLng: coords[0].toFixed(9),
                        pins: startingPosAndPins.pins
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
                    const comma = street + strNumber != '' ? ", " : '';  
                    const newAddress = street + strNumber + comma + city;
                    setAddress({address: newAddress, addressValid: newAddress != ''});
                }
            });
    }

    return (
        <Container id={classes.content}>
            <Row className={"justify-content-center pb-5"}>    
                <SearchShopInput
                    address={address}
                    addressValid={addressValid}
                    setAddress={setAddress}

                    query={query}
                    setQuery={setQuery}

                    updateMap={updateMap}
                />
            </Row>

            <Row className="justify-content-center">            
                <Col className="p-0">
                    <LocationMap
                        mapHeight={document.documentElement.clientHeight * 0.7}
                
                        startingLat={startingPosAndPins.startingLat}
                        startingLng={startingPosAndPins.startingLng}
                        pins={startingPosAndPins.pins}

                        selectedLat={markerPos.selectedLat}
                        selectedLng={markerPos.selectedLng}
                        hasLocation={markerPos.hasLocation}

                        handleMapClick={handleMapClick}
                    />
                </Col>
            </Row>
        </Container>
    );
}