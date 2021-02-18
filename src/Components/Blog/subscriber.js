import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CSVLink } from "react-csv";
import Header from '../Header';
import { fetchSubscribers } from '../../Store/Blog/actionCreator';

const headers = [
    { label: "S.No", key: "id" },
    { label: "Email", key: "email" }
];


const useStyles = makeStyles((theme) => ({
    brdCrmbPrimary: {
        color: '#2368a9',
        fontWeight: 500,
        marginLeft: '1rem',
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    brdCrmbSeparator: {
        color: '#2e8eec',
    },
    brdCrmbSecondary: {
        color: '#2e8eec',
    },
    logoutBtnCtr: {
        textAlign: 'right'
    }
}))

const SimpleBreadcrumbs = () => {
    const classes = useStyles();

    return (
        <Route>
            {
                <Breadcrumbs separator={<NavigateNextIcon className={classes.brdCrmbSeparator} fontSize="small" />} aria-label="Breadcrumb">
                    <RouterLink className={classes.brdCrmbPrimary} to="/">
                        Home
                    </RouterLink>
                    <RouterLink className={classes.brdCrmbPrimary} to="/blog">
                        Blogs
                    </RouterLink>
                </Breadcrumbs>
            }
        </Route>
    );
};




function Subscribers(props) {
    const classes = useStyles();
    const [subscribersList, setSubscribersList] = useState([]);

    useEffect(() => {
        fetchSubscribersInfo()
    }, [])



    const fetchSubscribersInfo = () => {
        fetchSubscribers(33, successCB, failureCB)
    }

    const successCB = (res) => {
        setSubscribersList(res.data)
    }

    const failureCB = (err) => {

    }


    const handleBlogLogout = () => {
        localStorage.setItem('blog_user', "");
        localStorage.setItem('blog_token', "");
        props.history.push('/bloglogin')
    }


    return (
        <React.Fragment>
            <Header />
            <div style={{ marginTop: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {SimpleBreadcrumbs()}
                </div>
            </div>
            <Grid container spacing={2}>
                <Hidden only={['xs', 'sm']}>
                    <Grid item md={3} lg={3}>

                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    {subscribersList.length > 0 && <div className={classes.logoutBtnCtr} >
                        <Button variant="contained" color="primary" className={classes.logoutBtn} >
                            <CSVLink data={subscribersList} headers={headers}>
                                <div style={{ color: '#fff' }}> Download As CSV</div>
                            </CSVLink>
                        </Button>
                    </div>}
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">S.No</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subscribersList.length > 0 && subscribersList.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Hidden only={['xs', 'sm']}>
                    <Grid item md={3} lg={3}>

                    </Grid>
                </Hidden>
            </Grid>
        </React.Fragment>
    )
}

export default Subscribers;