import React from 'react';
import {  withRouter } from 'react-router-dom';
import { Spinner, Container, Row, Col } from 'reactstrap';
import styles from './SearchResults.module.scss';
import SearchResult from '../../components/SeachResult/SearchResult';

import LocationMap from '../../components/UI/LocationMap/LocationMap';


class SearchResults extends React.Component {

    render () {


        return (

            <Container fluid id={styles.content}>
                <Row>
                    <Col></Col>

                    <Col xs="6" className="">
                        <SearchResult />
                        <SearchResult />
                    
                    </Col>

                    <Col></Col>

                    <Col xs="3" className="border p-0"> 

                        <LocationMap   
                            mapHeight={document.documentElement.clientHeight * 0.7}
            
                            startingLat={2323}
                            startingLng={3232}
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


}


export default SearchResults