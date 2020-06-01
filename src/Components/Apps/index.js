import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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
import Header from '../Header';
import { style } from '../../Styles/theme';

export default function AppList(props) {
    const classes = useStyles();


    const proceedToLogin = () => {
        props.history.push('/tenantlogin');
    };

    return (
        <div className={classes.appsContainer}>
            <Header />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card className={classes.root} onClick={() => { proceedToLogin() }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    MA
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="My Athina"
                        />
                        <CardContent>
                            <img height="90px" width="240px" src={AthinaLogo}></img>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card className={classes.root} onClick={() => { proceedToLogin() }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    PR
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="PREP"
                        />
                        <CardContent>
                            <img height="90px" width="240px" src={PrepLogo}></img>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card className={classes.root} onClick={() => { proceedToLogin() }}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    TV
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Table Vision"
                        />
                        <CardContent>
                            <img height="90px" width="240px" src={TVlogo}></img>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: "120px",
        width: '400px',
    },
    appsContainer: {
        marginTop: '4rem'
    },
    avatar: {
        backgroundColor: style.fontColour._blue,
    },
}));

