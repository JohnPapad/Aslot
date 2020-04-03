import React from 'react';
import { NavLink as RouterNavLink, withRouter }  from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';
import classes from './NavigationButton.module.scss'

const navigationButton = ( props ) => {

    const isActive = props.isActive ? props.isActive : false
    
    return (
        <NavItem className="d-flex align-content-center p-1 mr-2">
            <Button id={classes.nav_item} className={isActive ? classes.nav_item_active : ""} block size="sm" onClick={props.toggle}>
                <span className={classes.text}>
                    {props.children}
                </span>
            </Button>
        </NavItem>
    );
}

export default withRouter(navigationButton);