import React from 'react';
import { connect } from 'react-redux';
import classes from './NavBar.module.scss';
import { NavLink as RouterNavLink, withRouter }  from 'react-router-dom';
// import logo_path from '../../../assets/images/nmm_board.png';
import NavigationItem from '../../../components/Navigation/NavigationItem';
import NavigationButton from '../../../components/Navigation/NavigationButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faUserEdit, faListOl, faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    } from 'reactstrap';

const hardRedirectPaths = ["/gamelobby", "/game"];

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    unAuthNavItems = () => {
		return(
			<>
				<NavigationButton isActive={this.props.isSignInModalOpen} toggle={this.props.toggleSignInModalOpen}>
                    Είσοδος Φαρμακείου
                    <FontAwesomeIcon icon={faSignInAlt} className="ml-2"/>
                </NavigationButton>

                <NavigationItem link="/signup">
                    Εγγραφή Φαρμακείου
                    <FontAwesomeIcon icon={faEdit} className="ml-2"/>
                </NavigationItem>								
			</>
		);
    }

    authNavItems = () => {
		return(
			<>
                {/* <NavigationItem link="/profile">
                    Profile
                    <FontAwesomeIcon icon={faUserCircle} className="ml-2"/>
                </NavigationItem>  */}

                {
                    this.props.type === 'citizen' 
                    ? this.citizenNavItems()
                    : this.authorityNavItems()
                }

                <NavigationItem link="/logout">
                    Log Out
                    <FontAwesomeIcon icon={faSignOutAlt} className="ml-2"/>
                </NavigationItem>								
			</>
		);
    }
    
    citizenNavItems = () => {
        return (
            <>
            <NavigationItem link="/feed">
                My Feed
                {/* <FontAwesomeIcon icon={faUserCircle} className="ml-2"/> */}
            </NavigationItem>
            <NavigationItem link="/reportform">
                Create Report
            {/* <FontAwesomeIcon icon={faUserCircle} className="ml-2"/> */}
            </NavigationItem>
            </>
        );
    }

    authorityNavItems = () => {
        return (
            null
        );
    }

    render() {
        return (
            <Navbar light expand="sm" id={classes.navbar} className="fixed-top pl-4 pb-2 pt-2" >
              
                <RouterNavLink to="/" exact id={classes.remFor}>
                    {/* <img src={logo_path} id={classes.img} alt="Logo" className="img-fluid"/> */}
                   <i>e-Pharmacy</i>
                </RouterNavLink> 

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {
                            ! this.props.isAuthed ?
                                this.unAuthNavItems()
                            :
                                this.authNavItems()                        
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}



const mapStateToProps = state => {
    return {
        isAuthed : state.userReducer.token ? true : false,
        type : state.userReducer.user ? state.userReducer.user.userType : null,
    }
}


export default withRouter(connect(mapStateToProps)(NavBar));
