import React, { Component }  from 'react';
import { connect } from 'react-redux';
import styles from './StorePage.module.scss';
import produce from 'immer';

import axios from '../../services/axiosConfig';
import { withRouter } from 'react-router-dom';

import { Container, Row, Col, Button, Input, Badge } from 'reactstrap';
import TimeSlotModal from '../../components/TimeSlotModal/TimeSlotModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faClock, faMapMarkedAlt, faHourglassHalf, faUsers, faTrashAlt, faAt, faShoppingBasket, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import LocationMap from '../../components/UI/LocationMap/LocationMap';
import InventoryItem from './InventoryItem/InventoryItem';
import MyBtn from '../../components/UI/MyBtn/MyBtn';

import { useDispatch, useSelector } from "react-redux";
import { specifActions } from '../../stores/specifStore';
import { storesApi } from '../../services/storesApi';
import { checkValidity } from '../../utilities/validityUtility';

class StorePage extends Component {

    slotClickedHandler = (day, timeSlot) =>{
        console.log(day, timeSlot);
        this.setState(
            produce(draft => {
                draft.selectedTimeSlot = {
                    day,
                    timeSlot
                };
            })
        );
    }

    deleteSlotClickedHandler = () => {
        this.setState(
            produce(draft => {
                draft.selectedTimeSlot = null;
            })
        );
    }

    submitHandler = () => {
        const res = this.checkFormValidity();
        if (res.report)
        {
            const formData = {
                items: this.state.amountValues,
                email: this.state.email.value,
                timeSlot: this.state.selectedTimeSlot,
            }

            alert("form submited")
            console.log("form data: ", formData);
            this.props.history.push('/');
            //axios call
        }
        else 
        {
            alert("FORM INVALID")
        }
        
        
    }

    getInitialAmountValues = (selectedItem) => {
        if (selectedItem) 
        {
            let initialAmountValues = {};
            initialAmountValues[selectedItem.id] = 1;
            return initialAmountValues;
        }
        else 
        {
            return {};
        }
    }

    state = {
        amountValues: this.getInitialAmountValues(this.props.specifics.selectedItem),  // key: item_id, value: item_quantity 
        email: {
            value: '',
            isValid: false,
            rules: {
                required: true,
                isEmail: true
            }
        },
        selectedTimeSlot: null,
    }


    checkFormValidity = () => {
        if (!this.state.selectedTimeSlot) 
        {
            return {
                report: false,
                msg: "Επιλέξτε μια διαθέσιμη χρονοθυρίδα."
            };
        }

        if (!this.state.email.isValid)
        {
            return {
                report: false,
                msg: "Εισάγετε μια σωστή διεύθυνση email."
            };
        }

        if ((Object.keys(this.state.amountValues)).length === 0)
        {
            return {
                report: false,
                msg: "Το καλάθι αγορών σας είναι άδειο."
            };
        }

        return {
            report: true,
            msg: ""
        };
    }


    emailInputChangedHandler = (e) => {
        const emailVal = e.target.value;
        const res = checkValidity(emailVal, this.state.email.rules);

        this.setState(
            produce(draft => {
                draft.email.value = emailVal;
                draft.email.isValid = res.report;
            })
        );
    }


    deleteItem = (itemId) => {
        this.setState(
            produce(draft => {
                delete draft.amountValues[itemId];
            })
        );
    }

    changeAmountValue = (itemId, itemQuantity, max_to_buy) => {

        const res = checkValidity(itemQuantity, { isNumeric: true, required: true, maxValue: Number(max_to_buy), minValue: 0 })
        if (!res.report)
        {
            console.log("validity check ERROR in item changeAmountValue")
            return;
        }

        if (Number(itemQuantity) === 0)
        {
            this.deleteItem(itemId);
            return;
        }

        this.setState(
            produce(draft => {
                draft.amountValues[itemId] = Number(itemQuantity);
            })
        );
    }

    getTotalPrice = (items) => {
        let price = 0;
        for (let [itemId, itemQuantity] of Object.entries(this.state.amountValues)) 
        {
            price += itemQuantity * items[itemId].price;
        }

        return price;
    }

    // getItemWithId = (items, id) => {
    //     let retItem = null;
    //     items.map(item => {
    //         if (item.id == id)
    //             retItem = item;
    //     })
    //     return retItem;
    // }

    render (){

        console.log("render state: ", this.state)

    // call specifActions get everything 
    //const dispatch = useDispatch(); // <- me higher order
    if (this.props.specifics.noData === true && this.props.specifics.fetching === false) {
        const idFromUrl = this.props.match.params.id;
        this.props.dispatch(specifActions.redirectToStore(axios, idFromUrl));
        return null;
    }
    if (!this.props.specifics.store) {
        return null;
    }

    const store = this.props.specifics.store;
    const items = this.props.specifics.items;
    const timeslots = this.props.specifics.timeslots;
    const selectedItem = this.props.specifics.selectedItem;

    const isShopOwner = false;

    // console.log("store: items: ", items)
    return (
        <Container fluid id={styles.content}>
            <Row className="mb-5">
                <Col xs="8" className="pr-5">
                    <Row  className={"p-2 " + styles.store_pres}>
                        <Col xs="4" className="p-0 m-0 border">
                            <img src={"https://kdi.gr/wp-content/uploads/2017/01/KDICONTRACT_Katsaris_Pharmacy1.jpg"} style={{height: "100%", width: "100%", height: "30vh"}} alt="Shop Photo" className="img-fluid rounded"/>
                        </Col>

                        <Col xs="8" className="p-0 m-0 pl-2 d-flex-column ">
                            <div className="d-flex align-items-center mb-2">
                                <div className={styles.shop_name}>
                                    {store.name}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faMapMarkedAlt } className={"mr-2"}/>
                                    Διεύθυνση: 
                                </div>

                                <div>
                                    {store.address}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faPhoneAlt} className={"mr-2"}/>
                                    Τηλέφωνο επικοινωνίας:
                                </div>

                                <div>
                                    {store.telephone}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faAt} className={"mr-2"}/>
                                    Email:
                                </div>

                                <div>
                                    {store.email}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faClock} className={"mr-2"}/>
                                    Ωράριο λειτουργίας:
                                </div>

                                <div>
                                    {store.opening_from_hour + '-' + store.opening_to_hour}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faHourglassHalf} className={"mr-2"}/>
                                    Διάρκεια Χρονοθυρίδας:
                                </div>

                                <div>
                                    {store.time_slot_duration}
                                </div>
                            </div>

                            <div className={"d-flex align-items-center mb-1"}> 
                                <div className={"mr-2 font-weight-bold " + styles.icon}>
                                    <FontAwesomeIcon icon={faUsers} className={"mr-2"}/>
                                    Μέγιστος αριθμός ατόμων ανά Χρονοθυρίδα:
                                </div>

                                <div>
                                    {store.persons_per_slot}
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </Col>

                <Col xs="4" className="border p-0">
                    <LocationMap   
                        mapHeight={document.documentElement.clientHeight * 0.32}
        
                        startingLat={store.lat}
                        startingLng={store.lng}
                        selectedLat={store.lat}
                        selectedLng={store.lng}
                        hasLocation={true}
                        msg={store.name}

                        // handleMapClick={this.handleMapClick}
                    />
                </Col>
            </Row>

            { !isShopOwner &&
                <Row className={"mb-3 d-flex align-items-stretch justify-content-start pb-5 " + styles.b_border}>
                    { selectedItem ? (
                        <InventoryItem 
                            selected={true} 
                            item={selectedItem} 
                            itemQuantity={selectedItem.id in this.state.amountValues ? this.state.amountValues[selectedItem.id] : 0}
                            changeAmountValue={this.changeAmountValue}
                        />) : null
                    }

                    <div className="d-flex align-items-stretch" id={styles.selected_items} style={{marginLeft: selectedItem ? "8vh" : "0"}}>

                        <div className="flex-shrink-1 p-1" id={styles.basket}>
                            <FontAwesomeIcon icon={faShoppingBasket} size="5x" id={styles.basket_color}/>
                        </div>

                        <div className="d-flex flex-column" >
                            <div id={ Object.keys(this.state.amountValues).length > 0 ? styles.items_sum : "" } className={"d-flex flex-wrap align-items-center justify-content-start " + (Object.keys(this.state.amountValues).length > 0 ? " pt-2 pb-2" : "")} >
                                
                                {Object.keys(this.state.amountValues).map((itemId, i) => (
                                    <div className={"d-flex align-items-center pr-3 pl-3 " + styles.r_border} key={itemId}>
                                    {/* <div className={"d-flex align-items-center pr-3 pl-3 " + (i !== Object.keys(this.state.amountValues).length - 1 ? styles.r_border : '') } key={itemId}> */}
                                        <div>
                                            <span className={"mr-2 " + styles.item}>
                                                { items[itemId].name + ":"}
                                            </span>
                                        </div>

                                        <div>
                                            <Badge pill id={styles.icon_bg}> { this.state.amountValues[itemId] }</Badge>
                                        </div>

                                        <div>
                                            <FontAwesomeIcon onClick={()=>this.deleteItem(itemId)}  className="mt-2 ml-3" icon={faTrashAlt} id={styles.delete_item}/>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>

                            <div className="d-flex h-100 pl-2 pr-2 align-items-center justify-content-between">
                                <div className="mr-4">
                                    <span className="font-weight-bold mr-2">
                                        Συνολικό κόστος:
                                    </span>
                                    <Badge id={styles.icon_bg} className="p-2">{this.getTotalPrice(items)} {' '} €</Badge>
                                </div>

                                <div className="mr-4">
                                    <Input value={this.state.email.value} onChange={ (event) => this.emailInputChangedHandler(event) } bsSize="md" type="text" placeholder="email" id={styles.input_email} />
                                </div>

                                <div>
                                    <TimeSlotModal selectedTimeSlot={this.state.selectedTimeSlot} slotClickedHandler={this.slotClickedHandler} deleteSlotClickedHandler={this.deleteSlotClickedHandler} formInvalidFeedback={this.checkFormValidity().msg} submitHandler={this.submitHandler}/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Row>
            }

            <Row className="">
                <Col>
                    <span id={styles.all_items_tittle}>
                        'Ολα τα προϊόντα
                    </span>
                </Col>
            </Row>

            <Row className="mt-3">
                {Object.values(items).map(item => {
                    if (!selectedItem || item.id != selectedItem.id) {
                        return (
                            <InventoryItem
                                renderBtns={isShopOwner}
                                key={item.id}
                                item={item} 
                                itemQuantity={item.id in this.state.amountValues ? this.state.amountValues[item.id] : 0}
                                changeAmountValue={this.changeAmountValue}
                            />
                        );
                    }
                    else {
                        return null;
                    }
                })}
            </Row>

        </Container>
    );
    }


}



const mapStateToProps = state => {
    return {
        specifics : state.specifReducer
    }
}

// const mapDispatchToProps = dispatch => {
//     return {        
//         redirectToStore: redirectToStore(axios, idFromUrl)
//     };
// }

export default withRouter(connect(mapStateToProps, null)(StorePage));
