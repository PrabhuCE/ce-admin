import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NavLink, withRouter } from "react-router-dom";
import Tenants from '../Tenants/tenants';
// import { connect } from 'react-redux';
// import { apiConfig } from '../../Configs/apiConfigs';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../Static/logo.png';
// import { showSnackBar } from '../../store/AlertMessages/actionCreator';
// import { doLogin } from '../../store/Login/actionCreator';
// import { googleSignIn } from '../../Helpers/googleSignIn';
// import { generateJwtToken } from '../../Helpers/constants';
// import GoogleIcon from '../../Static/Images/google.png'


export default function TenantLogin(props) {
    const [displayProgress, setDisplayProgress] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [renderLogin, setRenderLogin] = useState(true);
    const classes = useStyles();


    const validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const doSignIn = (event) => {
        event.preventDefault();
        // setDisplayProgress(true);
        // setBtnDisabled(true);
        // const userName = document.getElementById('username').value;
        // const password = document.getElementById('password').value;
        // let isValid;
        // if (userName !== '' && password !== '') {
        //     isValid = validateEmail(userName);
        //     if (isValid) {
        //         let loginCredentials = {}
        //         loginCredentials.username = userName;
        //         loginCredentials.password = password;

        //     } else {
        //         props.showSnackBar(
        //             {
        //                 state: true,
        //                 message: 'Username Not Valid!',
        //                 type: 'error'
        //             }
        //         )
        //         setDisplayProgress(false);
        //         setBtnDisabled(false);
        //     }


        // } else {
        //     props.showSnackBar(
        //         {
        //             state: true,
        //             message: 'Credentials cannot be Empty!',
        //             type: 'error'
        //         }
        //     )
        //     setDisplayProgress(false);
        //     setBtnDisabled(false);
        // }
        setRenderLogin(false)
    }

    const successCallBack = (res) => {
        // var userToken = generateJwtToken(res.user)
        // localStorage.setItem('tv_user', userToken);
        // localStorage.setItem('tv_token', res.token);
        // setDisplayProgress(false);
        // props.history.replace('/dashboard');
    }

    const failureCallBack = () => {
        // props.showSnackBar(
        //     {
        //         state: true,
        //         message: 'Login Failed.Please Check Your Credentials!',
        //         type: 'error'
        //     }
        // )
        // setDisplayProgress(false);
        // setBtnDisabled(false);
    }

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="center" className={classes.container} spacing={2}>
            {renderLogin ?
                <Card className={classes.card}
                    variant="outlined">
                    <CardContent>
                        <img src={Logo} height={100} width={100} />
                        <br /> <br />
                        <form className={classes.form} noValidate onSubmit={evnt => { evnt.preventDefault() }} autoComplete="off">
                            <FormControl fullWidth={true} className={classes.formControll} >
                                <InputLabel htmlFor="userName">Email address</InputLabel>
                                <Input id="username" />
                            </FormControl>
                            <FormControl fullWidth={true} className={classes.formControll}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" />
                            </FormControl>
                            <Button
                                variant="contained"
                                disabled={btnDisabled}
                                type="submit"
                                color="primary"
                                className={classes.button}
                                onClick={(event) => { doSignIn(event) }}
                            >
                                Sign In  {displayProgress && <CircularProgress className={classes.progressIcon} size={20} />}
                            </Button>
                        </form>
                    </CardContent>
                </Card> : <Tenants history={props.history} />}

        </Grid>
    )
}



const useStyles = makeStyles({
    container: {
        paddingTop: "100px"
    },
    orText: {
        fontWeight: 700,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        display: 'inline-block'
    },
    divider: {
        marginTop: '-23px'
    },
    buttonGoogle: {
        margin: '1rem',
        //backgroundImage: `url(${GoogleIcon})`,
        backgroundSize: 'contain',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 49,
        backgroundRepeat: 'no-repeat',
        border: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    progressIcon: {
        paddingLeft: '0.5rem'
    },
    card: {
        maxWidth: 300,
        textAlign: "center"
    },
    form: {
        flexGrow: 1
    },
    alreadyAccount: {
        paddingTop: 15
    },
    buttonWrapper: {
        marginTop: 15
    },
    formControll: {
        marginBottom: 20,
    },
    cardFrame: {
        display: "flex"
    }
});
