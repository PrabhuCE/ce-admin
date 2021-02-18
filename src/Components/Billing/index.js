import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import MyAthinaBilling from "./myAthinaBilling";
import Header from '../Header';

export default function Billing(props) {
    const classes = useStyles();
    return (
        <div>
            <Header />
            <div className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <MyAthinaBilling />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "60px",
    },
    buttonContainer: {
        marginTop: "1rem",
    },
    button: {
        marginTop: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#4285f4',
        '&:hover': {
            backgroundColor: '#4285f4',
            color: '#fff',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    divider: {
        marginTop: "-23px",
    },
    progressIcon: {
        paddingLeft: "0.5rem",
    },
    card: {
        maxWidth: 300,
        textAlign: "center",
    },
    form: {
        flexGrow: 1,
    },
    formControl: {
        marginTop: "1rem",
        minWidth: 250,
    },
    buttonWrapper: {
        marginTop: 15,
    },
    cardFrame: {
        display: "flex",
    },
}));
