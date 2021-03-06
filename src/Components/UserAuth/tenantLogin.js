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
import Snackbar from '@material-ui/core/Snackbar';
import { apiConfig } from '../../Configs/apiConfigs';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../Static/logo.png';
import myAthinaLogo from '../../Static/myAthinaLogo.png';
import prepLogo from '../../Static/preplogo.svg';
import tvLogo from '../../Static/tv_logo.svg';
import invictaLogo from '../../Static/invictalogo.png';
import { generateJwtToken } from '../../Helpers/basics'
import { tenantList } from '../../MockData/tenantInfo'
import { doTenantLogin } from '../../Store/Login/actionCreator';

export default function TenantLogin(props) {
    const classes = useStyles();
    const [displayProgress, setDisplayProgress] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [renderLogin, setRenderLogin] = useState(true);
    const [productImage, setProductImage] = useState();
    const [tenantsList, setTenantsList] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState('');
    const posVert = "top";
    const posHori = "right";


    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let paramVal = urlParams.get("product");
        if (paramVal !== undefined && paramVal === "MyAthina") {
            setProductImage(myAthinaLogo);
        } else if (paramVal !== undefined && paramVal === "PREP") {
            setProductImage(prepLogo);
        } else if (paramVal !== undefined && paramVal === "TableVision") {
            setProductImage(tvLogo);
        } else if (paramVal !== undefined && paramVal === "Invicta") {
            setProductImage(invictaLogo);
        }
    }, [])

    const validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

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
                doTenantLogin(loginCredentials, successCallBack, failureCallBack)
            } else {
                setOpenSnack(true);
                setSnackBarMsg("Username not valid")
                setDisplayProgress(false);
                setBtnDisabled(false);
            }
        } else {
            setOpenSnack(true);
            setSnackBarMsg("Credentials cannot be Empty!")

            setDisplayProgress(false);
            setBtnDisabled(false);
        }

    }

    const successCallBack = (res) => {
        var userToken = generateJwtToken(res.userDetails)
        localStorage.setItem('ce_admin_user', userToken);
        localStorage.setItem('ce_admin_token', res.token);
        setDisplayProgress(false);
        setTenantsList(res.tenantInfo.tenants);
        setRenderLogin(false)
    }

    const failureCallBack = () => {
        setOpenSnack(true);
        setSnackBarMsg("Login Failed. Please Check your Credentials!")
        setDisplayProgress(false);
        setBtnDisabled(false);
    }

    return (
        <React.Fragment>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center" className={classes.container} spacing={2}>
                <Card className={classes.card}
                    variant="outlined">
                    <CardContent>
                        <img src={productImage} height={90} width={240} />
                        <br /> <br />
                        {renderLogin ? <form className={classes.form} noValidate onSubmit={evnt => { evnt.preventDefault() }} autoComplete="off">
                            <FormControl fullWidth={true} className={classes.formControll} >
                                <InputLabel htmlFor="userName">UserId</InputLabel>
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
                        </form> : <Tenants tenants={tenantsList} history={props.history} />}
                    </CardContent>
                </Card>
            </Grid>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSnack} autoHideDuration={6000} onClose={handleSnackClose} message={snackBarMsg}>
            </Snackbar>
        </React.Fragment>
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
        marginBottom: '1rem',
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
