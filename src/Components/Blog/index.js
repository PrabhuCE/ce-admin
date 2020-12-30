import React from 'react';
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Header from '../Header';
import CreateBlog from './createNew';
import BlogList from './blogList';

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
                </Breadcrumbs>
            }
        </Route>
    );
};


function Blogs(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Header />
            <div style={{ marginTop: '5rem' }}>
                {SimpleBreadcrumbs()}
                <BlogList history={props.history} />
            </div>
        </React.Fragment>
    )
}

export default Blogs;