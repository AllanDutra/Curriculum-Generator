import React from 'react';

// material-ui
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

import '../index.css';

const useStyles = makeStyles({
    alert: {
        position:'fixed',
        zIndex:'5',
        right:'0.5rem',
        top:'4.5rem',
        maxWidth:'25rem',
    }
});

const Notification = (props) => {

    const styles = useStyles();

    return (
        <>
        {
            props.type ? 
                <Alert severity={props.type} className={`${styles.alert} fadeInRight`}>{props.msg}</Alert>
            : null
        }
        </>
    )
}

export default Notification;