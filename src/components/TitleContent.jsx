import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    titleContent:{
        borderBottom:'2px solid black',
        fontSize:'1.2rem',
        fontWeight:'bold',
        width:'100%',
    }
});

const TitleContent = (props) => {

    const styles = useStyles();

    return (
        <div className={styles.titleContent}>
            <p>{props.txt}</p>
        </div>
    )
}

export default TitleContent;