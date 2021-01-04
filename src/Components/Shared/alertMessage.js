import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeAlertMsg } from '../../Store/Alert/actionCreator';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertMsg(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.type && props.type == 'error' &&
                <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={() => { props.closeAlertMsg() }}>
                    <Alert onClose={() => { props.closeAlertMsg() }} severity="error">This is an error alert — check it out!</Alert>
                </Snackbar>
            }
            {props.type && props.type == 'warning' &&
                <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={() => { props.closeAlertMsg() }}>
                    <Alert onClose={() => { props.closeAlertMsg() }} severity="warning">This is a warning alert — check it out!</Alert>
                </Snackbar>
            }

            {
                props.type && props.type == 'info' &&
                <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={() => { props.closeAlertMsg() }}>
                    <Alert severity="info">This is an info alert — check it out!</Alert>
                </Snackbar >
            }
            {
                props.type && props.type == 'success' &&
                <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={() => { props.closeAlertMsg() }}>
                    <Alert severity="success">This is a success alert — check it out!</Alert>
                </Snackbar >
            }

        </div >
    );
}

const mapStateToProps = (state) => {
    let alertContent = state.alert
    return {
        alertContent,
        alertMessage: alertContent.alertMessage,
        type: alertContent.type,
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeAlertMsg: bindActionCreators(closeAlertMsg, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(AlertMsg)
