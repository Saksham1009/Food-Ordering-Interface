import { Fragment } from 'react';
import React from 'react-dom'
import styles from './Modal.module.css';
const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.closecart}/>;
};
const ModalOverlay = props => {
    return (<div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>);
};
const Modal = props => {
    return(
        <Fragment>
            {React.createPortal(<Backdrop closecart={props.closecart}/>,document.getElementById('overlays'))}
            {React.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
        </Fragment>
    );
};

export default Modal;