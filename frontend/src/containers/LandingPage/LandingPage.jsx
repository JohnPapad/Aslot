import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import classes from './LandingPage.module.scss';
import axios from '../../services/axiosConfig';

import { Container, Row, Col } from 'reactstrap';
import SearchShopInput from './SearchShopInput/SearchShopInput';

import { useDispatch, useSelector } from "react-redux";
import { storeActions } from '../../stores/storeStore';
import { searchActions } from '../../stores/searchStore';
import { specifActions } from '../../stores/specifStore';


import { nominatimApi } from '../../services/nominatimApi';
import { storesApi } from '../../services/storesApi';
import LocationMap from '../../components/UI/LocationMap/LocationMap';

export default function LandingPage() {
    const search = useSelector(state => state.searchReducer);
    const history = useHistory();

    const [query, setQuery] = useState(search.query);
    const [startingPosAndPins, setStartingPosAndPins] = useState({
        startingLat: null, 
        startingLng: null,
        pins: null
    })

    const addressInfo = search.addressInfo;
    const [markerPos, setMarkerPos] = useState({
        selectedLat: addressInfo.lat,
        selectedLng: addressInfo.lng,
        hasLocation: addressInfo.lat ? true : false,
    })
    const [{address, addressValid}, setAddress] = useState({address: addressInfo.address, addressValid: true});
    const dispatch = useDispatch();

    const updateSearchStore = (query, address, lat, lng) => {
        dispatch(searchActions.setQuery(query));
        const addressInfo = {
            address,
            lat,
            lng
        }
        dispatch(searchActions.setAddressInfo(addressInfo));
    }

    const onSubmit = () => {
        if (markerPos.hasLocation == false) {
            nominatimApi.getGeoLocation(axios, address.replace(/,/g, ' '))
                .then(data => {
                    if (data && data.features.length > 0) {
                        const coords = data.features[0].geometry.coordinates;
                        // Coordinates are given in reverse order from API
                        
                        // First set search store
                        updateSearchStore(query, address, coords[1].toFixed(9), coords[0].toFixed(9))
                        
                        const searchParams = {
                            searchTerm: query,
                            lat: coords[1].toFixed(9),
                            lng: coords[0].toFixed(9)
                        }
                        storesApi.searchStores(axios, searchParams)
                            .then(res => {
                                // console.log(res);
                                dispatch(storeActions.setStores(res.stores));
                                history.push('/searchresults');
                            });
                    }
                });
        }
        else {
            // First set search store
            updateSearchStore(query, address, markerPos.selectedLat, markerPos.selectedLng)

            const searchParams = {
                searchTerm: query,
                lat: markerPos.selectedLat,
                lng: markerPos.selectedLng
            }
            storesApi.searchStores(axios, searchParams)
                .then(res => {
                    // console.log(res);
                    dispatch(storeActions.setStores(res.stores));
                    history.push('/searchresults');
                });
        }
    }

    
    const onRedMarkerClick = (id) => {
        // axios kai apothikeusi mono 1 store sto storeStore
        dispatch(specifActions.redirectToStore(axios, id, history));
    }



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

        dispatch(specifActions.redirectToStore(axios, 3, history));
    }, [])
    
    const updateMap = () => {
        if (address) {
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

            <Row className={"justify-content-center  mb-3"} >
                <p id={classes.header}>
                    Το φαρμακείο της γειτονιάς σου τώρα online
                </p>
            </Row>


            <Row className={"justify-content-center mb-3"}>    
                <SearchShopInput
                    address={address}
                    addressValid={addressValid}
                    setAddress={setAddress}

                    query={query}
                    setQuery={setQuery}

                    updateMap={updateMap}
                    onSubmit={onSubmit}
                />
            </Row>

            <Row className="justify-content-center mt-4">            
                <Col className="p-0">
                    <LocationMap
                        mapHeight={document.documentElement.clientHeight * 0.6}
                
                        startingLat={startingPosAndPins.startingLat}
                        startingLng={startingPosAndPins.startingLng}
                        pins={startingPosAndPins.pins}

                        selectedLat={markerPos.selectedLat}
                        selectedLng={markerPos.selectedLng}
                        hasLocation={markerPos.hasLocation}

                        handleMapClick={handleMapClick}
                        onRedMarkerClick={onRedMarkerClick}
                    />
                </Col>
            </Row>
        </Container>
    );
}