import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";

import styles from './SearchResults.module.scss';
import SearchResult from '../../components/SeachResult/SearchResult';
import LocationMap from '../../components/UI/LocationMap/LocationMap';
import SearchShopInput from '../LandingPage/SearchShopInput/SearchShopInput';

export default function SearchResults(props) {
    const search = useSelector(state => state.searchReducer);
    const addressInfo = search.addressInfo;
    const stores = useSelector(state => state.storeReducer.stores);
    const history = useHistory();
    
    const [query, setQuery] = useState(search.query);
    const [startingPosAndPins, setStartingPosAndPins] = useState({
        startingLat: addressInfo.lat,
        startingLng: addressInfo.lng,
        pins: null
    })

    const [markerPos, setMarkerPos] = useState({
        selectedLat: addressInfo.lat,
        selectedLng: addressInfo.lng,
        hasLocation: addressInfo.lat ? true : false,
    })
    const [{address, addressValid}, setAddress] = useState({address: addressInfo.address, addressValid: true});
    const dispatch = useDispatch();

    // dispatch(specifActions.redirectToStore(axios, 3, history));
    
    return (
        <Container fluid id={styles.content}>
            <Row>
                <Col></Col>
                <Col xs="6" className="">
                    <Row className="pb-5">
                        <SearchShopInput
                            address={address}
                            addressValid={addressValid}
                            setAddress={setAddress}

                            query={query}
                            setQuery={setQuery}

                            addressDisabled
                        />
                    </Row>

                    {stores.length > 0 ? stores.map((store, i) => {
                        return (
                            <SearchResult 
                                key={i}

                                name={store.name}
                                address={store.address}
                                email={store.email}
                                openingFrom={store.opening_from_hour}
                                openingTo={store.opening_to_hour}

                            />
                        )
                    }) : "No results :("}
                
                </Col>
                <Col></Col>
                <Col xs="3" className="border p-0"> 

                    <LocationMap   
                        mapHeight={document.documentElement.clientHeight * 0.7}
        
                        startingLat={startingPosAndPins.startingLat}
                        startingLng={startingPosAndPins.startingLng}
                        selectedLat={232}
                        selectedLng={3232}
                        hasLocation={true}

                        // handleMapClick={this.handleMapClick}
                    />
                
                </Col >
                <Col></Col>
            </Row>
            
        </Container>
    )


}