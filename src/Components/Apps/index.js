import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AthinaLogo from '../../Static/myAthinaLogo.png';
import PrepLogo from '../../Static/preplogo.svg';
import TVlogo from '../../Static/tv_logo.svg';
import InvictaLogo from '../../Static/invictalogo.png';
import CELogo from '../../Static/ce.png';
import Header from '../Header';
import { style } from '../../Styles/theme';

export default function AppList(props) {
    const classes = useStyles();

    useEffect(() => {
        localStorage.removeItem('product', '')
    }, [])


    const proceedToLogin = (selProduct) => {
        localStorage.setItem('product', selProduct);
        props.history.push(`/tenantlogin?product=${selProduct}`);
        window.location.reload(false)
    };

    const blogLogin = () => {
        props.history.push(`/bloglogin`);
        window.location.reload(false)
    }

    return (
        <React.Fragment>
            <Header />
            <div className={classes.appsContainer}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Card className={classes.blogCard} >
                            <CardHeader
                                title={<div className={classes.blogcardTitle}>Continual Engine Blogs</div>}
                            />
                            <CardContent>
                                <img height="90px" width="140px" src={CELogo}></img>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" className={classes.blogButton} color="primary" onClick={() => { blogLogin() }}>Manage Blogs</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        MA
                                    </Avatar>
                                }
                                title={<div className={classes.cardTitle}>My Athina</div>}
                            />
                            <CardContent>
                                <img height="90px" width="240px" src={AthinaLogo}></img>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" className={classes.button} color="primary" onClick={() => { proceedToLogin('MyAthina') }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        PR
                                </Avatar>
                                }
                                title={<div className={classes.cardTitle}>PREP</div>}
                            />
                            <CardContent>
                                <img height="90px" width="240px" src={PrepLogo}></img>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" className={classes.button} color="primary" onClick={() => { proceedToLogin('PREP') }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        TV
                                </Avatar>
                                }
                                title={<div className={classes.cardTitle}>Table Vision</div>}
                            />
                            <CardContent>
                                <img height="90px" width="240px" src={TVlogo}></img>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" className={classes.button} color="primary" onClick={() => { proceedToLogin('TableVision') }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        IN
                                </Avatar>
                                }
                                title={<div className={classes.cardTitle}>Invicta</div>}
                            />
                            <CardContent>
                                <img height="90px" width="240px" src={InvictaLogo}></img>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <Button variant="contained" className={classes.button} color="primary" onClick={() => { proceedToLogin('Invicta') }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    blogCard: {
        maxWidth: 345,
        backgroundColor: "#6ac685"
    },
    blogcardTitle: {
        fontSize: '1.2rem',
        textAlign: 'start',
        color: style.fontColour._white
    },
    blogButton: {
        marginTop: '1rem',
        marginBottom: '1rem',
        color: style.fontColour._adminBlue,
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: style.fontColour._adminBlue
        },
    },
    button: {
        marginTop: '1rem',
        marginBottom: '1rem',
        backgroundColor: style.fontColour._adminBlue,
        '&:hover': {
            backgroundColor: style.fontColour._adminBlue,
        },
    },
    cardTitle: {
        fontSize: '1.2rem',
        textAlign: 'start',
        color: style.fontColour._adminBlue
    },
    media: {
        height: "120px",
        width: '400px',
    },
    appsContainer: {
        margin: '5rem 3rem 3rem 3rem'

    },
    avatar: {
        backgroundColor: style.fontColour._blue,
    },
}));

