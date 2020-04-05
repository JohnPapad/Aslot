import React, { useState } from 'react';
import {  useHistory,  Redirect} from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";
import axios from '../../services/axiosConfig';

import { storeActions } from '../../stores/storeStore';
import { searchActions } from '../../stores/searchStore';
import { storesApi } from '../../services/storesApi';

import styles from './SearchResults.module.scss';
import SearchResult from '../../components/SeachResult/SearchResult';
import LocationMap from '../../components/UI/LocationMap/LocationMap';
import SearchShopInput from '../LandingPage/SearchShopInput/SearchShopInput';

export default function SearchResults(props) {
    const search = useSelector(state => state.searchReducer);
    const addressInfo = search.addressInfo;
    const stores = useSelector(state => state.storeReducer.stores);
    const history = useHistory();
    const dispatch = useDispatch();

    const [query, setQuery] = useState(search.query);
    const [startingPosAndPins, setStartingPosAndPins] = useState({
        startingLat: addressInfo.lat,
        startingLng: addressInfo.lng,
        pins: null
    })

    // const [markerPos, setMarkerPos] = useState({
    //     selectedLat: addressInfo.lat,
    //     selectedLng: addressInfo.lng,
    //     hasLocation: addressInfo.lat ? true : false,
    // })

    const onSubmit = () => {
        if (query != '') {
            // First set search store
            updateSearchStore(query, addressInfo.address, startingPosAndPins.startingLat, startingPosAndPins.startingLng)

            const searchParams = {
                searchTerm: query,
                lat: startingPosAndPins.startingLat,
                lng: startingPosAndPins.startingLng
            }
            storesApi.searchStores(axios, searchParams)
                .then(res => {
                    // console.log(res);
                    dispatch(storeActions.setStores(res.stores));
                    history.push('/searchresults');
                });
        }
    }

    const updateSearchStore = (query, address, lat, lng) => {
        dispatch(searchActions.setQuery(query));
        const addressInfo = {
            address,
            lat,
            lng
        }
        dispatch(searchActions.setAddressInfo(addressInfo));
    }

    const [{address, addressValid}, setAddress] = useState({address: addressInfo.address, addressValid: true});
    
    if (!address)
    {
        return (
            <Redirect to="/"/>
        )
    }
    
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
                            onSubmit={onSubmit}
                        />
                    </Row>

                    {stores.length > 0 ? stores.map(store => {
                        return (
                            <SearchResult 
                                key={store.id}

                                id={store.id}
                                name={store.name}
                                address={store.address}
                                email={store.email}
                                openingFrom={store.opening_from_hour}
                                openingTo={store.opening_to_hour}
                                telephone={store.telephone}

                                item={store.item}

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
                        selectedLat={startingPosAndPins.startingLat}
                        selectedLng={startingPosAndPins.startingLng}
                        hasLocation={true}

                        // handleMapClick={this.handleMapClick}
                    />
                
                </Col >
                <Col></Col>
            </Row>
            
        </Container>
    )


}