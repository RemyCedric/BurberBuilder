import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    const attachedClasses = props.show ? [classes.Modal, classes.Show] : [classes.Modal, classes.NotShow];
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.backdropCancelled} />
            <div className={attachedClasses.join(' ')} >
                {props.children}
            </div>
        </React.Fragment >
    );
}
export default modal;