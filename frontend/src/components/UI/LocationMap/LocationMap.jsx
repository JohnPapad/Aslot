import React from 'react';

import classes from './LocationMap.module.scss';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Row, Col } from 'reactstrap'
import L from 'leaflet';
import iconImp from '../../../assets/images/location-pin-red.png';

export const redIcon = new L.Icon({
    iconUrl: iconImp,
    // iconRetinaUrl: '../../../assets/images/pointer-icon.svg',
    iconSize: [45, 45],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: '../../../assets/images/marker-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
})



export default function LocationMap(props) {

    const { startingLat, startingLng, selectedLat, selectedLng, mapHeight, hasLocation, pins, zoom } = props;
    const { handleMapClick, onRedMarkerClick } = props;
    const style = { height: mapHeight + 'px' };

    // If the user has clicked on the map, place a marker
    let marker = null
    if (hasLocation) {
        marker = (
            <Marker position={{ lat: selectedLat, lng: selectedLng }} >
                <Popup>Residence</Popup>
            </Marker>
        );
    }

    let initPins = null;
    if (pins) {
        initPins = pins.map((pin, i) => {
                return (
                    <Marker position={{ lat: pin.lat, lng: pin.lng }} key={i} icon={redIcon}> 
                        <Popup onClick={() => onRedMarkerClick(pin.store_id)}>{pin.store_name}</Popup>
                    </Marker>
                )
            })
    }
    console.log(initPins);


    return (
        <Row>
            <Col>
                {startingLat && startingLng ? (
                    <div className={classes.map}>
                        <Map
                            center={{ lat: startingLat, lng: startingLng }}
                            zoom={zoom ? zoom : 16}
                            onClick={handleMapClick}
                            // onLocationfound={this.handleLocationFound}
                            //ref={this.mapRef}

                            style={style}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />

                            {marker}
                            {initPins}

                        </Map>
                    </div>
                ) : null}

            </Col>
        </Row>
    );
}