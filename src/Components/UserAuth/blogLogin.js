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
import { apiConfig } from '../../Configs/apiConfigs';
import CircularProgress from '@material-ui/core/CircularProgress';
import CELogo from '../../Static/ce.png';
import { bloglogin } from '../../Store/Login/actionCreator';
import { generateJwtToken, getBlogLoggedInStatus } from '../../Helpers/basics';


export default function Login(props) {
    const [displayProgress, setDisplayProgress] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [renderLogin, setRenderLogin] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const classes = useStyles();

    useEffect(() => {
        if (getBlogLoggedInStatus()) {
            props.history.push('/blog')
        }
    }, [])


    const validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const doSignIn = (event) => {
        event.preventDefault();
        setDisplayProgress(true);
        setBtnDisabled(true);
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let isValid;
        if (userName !== '' && password !== '') {
            isValid = validateEmail(userName);
            if (isValid) {
                let loginCredentials = {}
                loginCredentials.username = userName;
                loginCredentials.password = password;
                bloglogin(loginCredentials, successCallBack, failureCallBack)
            } else {
                //props.showSnackBar(
                //     {
                //         state: true,
                //         message: 'Username Not Valid!',
                //         type: 'error'
                //     }
                // )
                setErrorMsg('Username Not Valid');
                setDisplayProgress(false);
                setBtnDisabled(false);
            }
        } else {
            // props.showSnackBar(
            //     {
            //         state: true,
            //         message: 'Credentials cannot be Empty!',
            //         type: 'error'
            //     }
            // )
            setErrorMsg('Credentials cannot be Empty!');
            setDisplayProgress(false);
            setBtnDisabled(false);
        }
    }

    const successCallBack = (res) => {
        console.log("test res", res)
        var userToken = generateJwtToken(res.userDetails)
        console.log("user", userToken)
        localStorage.setItem('blog_user', userToken);
        localStorage.setItem('blog_token', res.token);
        setDisplayProgress(false);
        props.history.push('/blog');
    }

    const failureCallBack = () => {
        setErrorMsg('Something went wrong.Try again later')
        setDisplayProgress(false);
        setBtnDisabled(false);
    }

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="center" className={classes.container} spacing={2}>
            {renderLogin && <Card className={classes.card}
                variant="outlined">
                <CardContent>
                    <img src={CELogo} height={100} width={140} />
                    <br />
                    <div style={{
                        margin: '1rem', color: '#2d94dd', fontSize: '1.5rem'
                    }}>Blogs Login </div>
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
                            Login  {displayProgress && <CircularProgress className={classes.progressIcon} size={20} />}
                        </Button>
                        {errorMsg !== '' && <div style={{ justifyContent: 'center', marginTop: '0.5rem', color: 'red' }}>{errorMsg}</div>}
                    </form>
                </CardContent>
            </Card>}
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
    button: {
        marginTop: '1rem',
        backgroundColor: '#4285f4',
        '&:hover': {
            backgroundColor: '#4285f4',
        },
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
        maxWidth: 320,
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
