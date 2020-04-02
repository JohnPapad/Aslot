import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import classes from './SignUp.module.scss';
import { Card, CardHeader, CardBody,  Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
//import MyInput from '../../components/UI/MyInput/MyInput';
import CitizenSignUp from './CitizenSignUp/CitizenSignUp';
import AuthoritySignUp from './AuthoritySignUp/AuthoritySignUp';
import Header from '../../../components/UI/Header/Header';
import { checkValidity } from '../../../utilities/validityUtility';
import qs from 'querystring';


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //modalIsOpen: true,
            activeTab: 'citizen'
        };

        this.toggleTabs = this.toggleTabs.bind(this);
    }
    
    // closeModal = () => {
    //     // this.setState(
    //     //     produce(draft => {
    //     //         draft.modalIsOpen = false;
    //     //     })
    //     // );

    //     this.props.history.push("/");
    // }

    toggleTabs = (tab) => {
        if (this.state.activeTab !== tab) 
        {
            this.setState(
                produce(draft => {
                    draft.activeTab = tab;
                })
            );
        }
    }

   



    render() {

        console.log(this.props);

        return (
                <Row className="justify-content-center " id={classes.content} >
                    <Col xs="2"></Col>
                    <Col className="align-self-center p-0" xs="8">
                        <Card id={classes.signup_form}>
                            <CardHeader id={classes.header}>
                                 {/* <Header> */}
                                    Sign Up
                                 {/* </Header> */}
                            </CardHeader>
            
                            <Nav tabs className="justify-content-center" style={{backgroundColor: 'white'}}>
                                <NavItem>
                                    <NavLink
                                        className={"border-bottom-0 " + classnames({ active: this.state.activeTab === 'citizen' })}
                                        onClick={ () => this.toggleTabs('citizen') }
                                        id={ this.state.activeTab === 'citizen' ? classes.activeTabStyle : classes.inactiveTabStyle }
                                    >
                                        Citizen
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={"border-bottom-0 " +  classnames({ active: this.state.activeTab === 'authority' })}
                                        onClick={() => this.toggleTabs('authority')}
                                        id={ this.state.activeTab === 'authority' ? classes.activeTabStyle : classes.inactiveTabStyle }
                                    >
                                        Municipality
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <CardBody>
                                <TabContent activeTab={this.state.activeTab}>
                                    
                                    <p className="small text-muted">
                                        {this.state.activeTab === 'citizen' ? (
                                            "Sign up and improve your city"
                                        ) : (
                                            "Register to make your city better"
                                        )}
                                    </p>

                                    <TabPane tabId="citizen" className="">
                                        {this.state.activeTab === "citizen" 
                                        ? 
                                            <CitizenSignUp 
                                                inputBlurredHandler={this.inputBlurredHandler}
                                                inputChangedHandler={this.inputChangedHandler}
                                                submitHandler={this.submitHandler}
                                            /> 
                                        : null} 
                                    </TabPane>

                                    <TabPane tabId="authority" className="">
                                        {this.state.activeTab === "authority" 
                                        ? 
                                            <AuthoritySignUp
                                                inputBlurredHandler={this.inputBlurredHandler}
                                                inputChangedHandler={this.inputChangedHandler}
                                                submitHandler={this.submitHandler}
                                            /> 
                                        : null} 
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="2"></Col>
                </Row>

        );
    }

}


export default withRouter(Signup);