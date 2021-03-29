import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PageHeaderLogo from '../../Static/myAthinaLogo.png';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { style } from '../../Styles/theme';
import { Link } from 'react-router-dom';
import { getLoggedInStatus } from '../../Helpers/basics'
import Logo from '../../Static/logo.png';

export default function Header(props) {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:600px)');

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
            >
                <div>
                    {matches === true ?
                        <div >
                            <Grid container spacing={2} style={{ backgroundColor: '#f0f8ff' }} >
                                <Grid item xs={6} sm={6} >
                                    <img src={Logo} style={{ height: "40px", width: "140px", marginRight: "15px" }} alt="client.myathina logo" />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <div className={classes.sectionDesktop}>
                                        <div style={{ display: "flex" }}>
                                            <React.Fragment>
                                                <Avatar style={{ "alignSelf": "end", backgroundColor: '#205f9d', textTransform: 'uppercase' }} >'US'</Avatar>
                                                <IconButton aria-label="profile and logout" className={classes.margin} size="small" >
                                                    <MoreVertIcon style={{ fontSize: "30px", "paddingTop": "5px" }} />
                                                </IconButton>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        <Grid container spacing={2}>
                            <Grid item xs={11} sm={6} md={4} lg={4}>
                                <div style={{ margin: '0.3rem', textAlign: 'start', display: 'flex' }}>
                                    <img style={style.logoImg} src={Logo} alt="Myathina Logo" />
                                    <div className={classes.title}>Continual Engine - Admin</div>
                                </div>
                            </Grid>
                            <Grid item xs={1} sm={6} md={8} lg={8}>
                                {getLoggedInStatus() && <div className={classes.sectionDesktop}>
                                    <div style={{ display: "flex" }}>
                                        <React.Fragment>
                                            <Avatar style={{ "alignSelf": "end", backgroundColor: '#205f9d', textTransform: 'uppercase' }} >US</Avatar>
                                            <IconButton aria-label="profile and logout" className={classes.margin} size="small" >
                                                <MoreVertIcon style={{ fontSize: "30px", "paddingTop": "5px" }} />
                                            </IconButton>
                                        </React.Fragment>
                                    </div>
                                </div>}
                            </Grid>
                        </Grid>
                    }
                </div>


            </AppBar>

            {/* <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List aria-label="profile and logout options">
                    <ListItem >
                        <IconButton style={{ borderRadius: "5px" }} >
                            <div style={{ display: 'flex' }}>
                                <AccountCircleIcon style={{ color: style.fontColour._orange, padding: "0.2rem 0.2rem 0 0", fontSize: "1.2rem" }} /><div style={{ color: style.fontColour._orange, paddingRight: "0.2rem", fontSize: "1.2rem" }}>Profile</div>
                            </div>
                        </IconButton>
                    </ListItem>
                    <ListItem >
                        <IconButton capture style={{ borderRadius: "5px" }} >
                            <React.Fragment><PowerSettingsNewIcon style={{ color: style.fontColour._orange, padding: "0.2rem 0.2rem 0 0", fontSize: "1.2rem" }} /> <div style={{ color: style.fontColour._orange, paddingRight: "0.2rem", fontSize: "1.2rem" }}>Logout</div></React.Fragment>
                        </IconButton>
                    </ListItem>
                </List>
            </Popover> */}
        </div>
    );
}
const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            //zIndex: 1,
        }),
        "box-shadow": "none",
        "backgroundColor": "#f0f8ff",
        "color": "#3f51b5",
        "border": "none"
    },
    root: {
        display: 'flex',

    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: style.fontColour._blue,
        margin: '0.5rem 0 0 0.5rem'
    },

    sectionDesktop: {
        float: 'right',
        marginRight: '0.5rem',
        marginTop: '0.5rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    list: {
        marginTop: "4rem"
    },
    iconButton: {
        padding: "8px 12px 12px 8px"
    },
    icon: {
        color: style.fontColour._green,
        fontSize: "1.8rem"
    },
    buttonContainer: {
        paddingRight: "1rem"
    },
    button: {
        marginRight: "1rem",
        backgroundColor: style.button._backgroundColor
    },
    link: {
        color: style.fontColour._orange,
        textDecoration: "none",
        fontSize: "1rem",
        marginLeft: "0.2rem"
    }
}));
