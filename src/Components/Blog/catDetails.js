import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Header from '../Header'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '6rem'
    },
    title: {
        width: '100%'
    },
    detailsWrapper: {
        padding: '1rem'
    },
    uploadBtn: {
        margin: '1rem'
    },
    uploadCtr: {
        textAlign: 'initial'
    },
    formControl: {
        width: '100%'
    },
    addBtn: {
        marginTop: '0.5rem'
    },
    chipCtr: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0.5rem'
    },
    divider: {
        margin: '1rem 0 1rem 0',
        fontSize: '5px'
    },
    uploadImg: {
        display: 'flex'
    },
    uploadTxt: {
        marginTop: '1.5rem'
    }
}))

function CategoryDetails(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Header />
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} lg={2}>

                    </Grid>
                    <Grid item xs={12} xm={12} md={8} lg={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField className={classes.title} variant='outlined' label="Category Title">
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={classes.uploadImg}>
                                    <div className={classes.uploadTxt}>Upload Primary Banner Image</div>
                                    <div className={classes.uploadCtr}>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.uploadBtn}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField className={classes.title} variant='outlined' label="Primary Banner Content 1">
                                </TextField>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={classes.uploadImg}>
                                    <div className={classes.uploadTxt}>Upload Secondary Banner Image 1</div>
                                    <div className={classes.uploadCtr}>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.uploadBtn}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload
                            </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField className={classes.title} variant='outlined' label="Secondary Banner Content 2">
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className={classes.uploadImg}>
                                    <div className={classes.uploadTxt}>Upload Secondary Banner Image 2</div>
                                    <div className={classes.uploadCtr}>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.uploadBtn}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload
                            </Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField className={classes.title} variant='outlined' label="Secondary Banner Content 1">
                                </TextField>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2}>

                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default CategoryDetails;