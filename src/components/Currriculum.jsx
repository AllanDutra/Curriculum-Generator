import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    curriculum:{
        width:'100%',
        minHeight:'90vh',
        backgroundColor:'white',
        boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)',
    }
});

const Curriculum = (props) => {

    const styles = useStyles();

    return (
        <div className={styles.curriculum}>

        </div>
    )
}

export default Curriculum;