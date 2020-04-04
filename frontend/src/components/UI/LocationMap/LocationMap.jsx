import React from 'react';

import classes from './LocationMap.module.scss';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Row, Col } from 'reactstrap'


export default function LocationMap(props) {

    const { startingLat, startingLng, selectedLat, selectedLng, mapHeight, hasLocation } = props;
    const { handleMapClick } = props;
    const style = { height: mapHeight + 'px' };

    console.log(startingLat);
    console.log(startingLng);

    // If the user has clicked on the map, place a marker
    let marker = null
    if (hasLocation) {
        marker = (
            <Marker position={{ lat: selectedLat, lng: selectedLng }}>
                <Popup>Residence</Popup>
            </Marker>
        );
    }

    return (
        <Row>
            <Col>
                {startingLat && startingLng ? (
                    <div className={classes.map}>
                        <Map
                            center={{ lat: startingLat, lng: startingLng }}
                            zoom={14}
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

                        </Map>
                    </div>
                ) : null}

            </Col>
        </Row>
    );
}