import React, { useState } from 'react';
import {  useHistory,  Redirect} from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'reactstrap';

import { useDispatch, useSelector } from "react-redux";
import axios from '../../services/axiosConfig';

import { storeActions } from '../../stores/storeStore';
import { searchActions } from '../../stores/searchStore';
import { storesApi } from '../../services/storesApi';
import { specifActions } from '../../stores/specifStore';

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
    const [mapFocusPos, setMapFocusPos] = useState({
        lat: addressInfo.lat,
        lng: addressInfo.lng,
    })

    const [{address, addressValid}, setAddress] = useState({address: addressInfo.address, addressValid: true});

    // const [markerPos, setMarkerPos] = useState({
    //     selectedLat: addressInfo.lat,
    //     selectedLng: addressInfo.lng,
    //     hasLocation: addressInfo.lat ? true : false,
    // })

    const addressClickedHandler = (storeId) => {
        // alert(storeId)

        const pins = startingPosAndPins.pins
        setMapFocusPos({lat: stores[storeId].lat, lng: stores[storeId].lng})
    }

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
                    //history.push('/searchresults');
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

    const onRedMarkerClick = (id) => {
        // axios kai apothikeusi mono 1 store sto storeStore
        dispatch(specifActions.redirectToStore(axios, id, history, stores[id].item));
    }

    // console.log('STORES');
    // console.log(stores);
    const createPins = () => {
        const pins = [];
        const storesVisited = {};

        stores.map(store => {
            if (!storesVisited[store.id]) {
                pins.push({
                    lat: store.lat,
                    lng: store.lng,
                    store_name: store.name,
                    store_id: store.id
                });
                storesVisited[store.id] = true;
            }
        })
        return pins;
    } 
    
    if (!address) {
        return (
            <Redirect to="/"/>
        )
    }
    return (
        <Container fluid id={styles.content}>
            <Row className="mt-4">
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
                                addressClickedHandler={addressClickedHandler}
                                item={store.item}

                            />
                        )
                    }) : (
                        <Row  className={"p-2 " + styles.store_pres}>
                            <Col id={styles.no_results} className="p-0 m-0 text-muted d-flex justify-content-center">
                                <i>No results found. Try again</i>
                            </Col>
                        </Row>
                    )}
                
                </Col>
                <Col></Col>
                <Col xs="3" className="border p-0"> 

                    <LocationMap   
                        mapHeight={document.documentElement.clientHeight * 0.7}
        
                        startingLat={mapFocusPos.lat}
                        startingLng={mapFocusPos.lng}
                        selectedLat={startingPosAndPins.startingLat}
                        selectedLng={startingPosAndPins.startingLng}
                        hasLocation={true}

                        pins={createPins()}
                        zoom={14}
                        // handleMapClick={this.handleMapClick}
                        onRedMarkerClick={onRedMarkerClick}
                    />
                
                </Col >
                <Col></Col>
            </Row>
            
        </Container>
    )
}