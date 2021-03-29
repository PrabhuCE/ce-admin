import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: "relative",
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
    },
    top: {
        color: "#1a90ff",
        animationDuration: "550ms",
        position: "absolute",
        left: 0,

    },
    topMid: {
        color: "orange",
        animationDuration: "550ms",
        position: "absolute",
        left: 0
    },
    topMax: {
        color: "red",
        animationDuration: "550ms",
        position: "absolute",
        left: 0
    },
    valMax: {
        color: "red",
        fontSize: '1rem',
        position: "absolute",
        top: '40%'
    },
    valMid: {
        color: "orange",
        fontSize: '1rem',
        position: "absolute",
        top: '40%'
    },
    val: {
        color: "#1a90ff",
        fontSize: '1rem',
        position: "absolute",
        top: '40%'
    },
    circle: {
        strokeLinecap: "round"
    }
}));

function CircularProgressWithLabel(props) {
    const classes = useStylesFacebook();
    return (
        <React.Fragment>
            <CircularProgress
                variant="determinate"
                value={props.value}
                style={{ transform: 'rotate(-90deg)' }}
                className={props.value >= 90 ? classes.topMax : props.value > 70 && props.value <= 89 ? classes.topMid : classes.top}
                classes={{
                    circle: classes.circle
                }}
                size={100}
                thickness={4}

            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <div className={props.value >= 90 ? classes.valMax : props.value > 70 && props.value <= 89 ? classes.valMid : classes.val}>{`${Math.round(
                    props.value,
                )}%`}</div>
            </Box>
        </React.Fragment>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();
    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={100}
                thickness={4}
                {...props}
                value={100}
            />
            {/* <CircularProgress
                variant="determinate"
                disableShrink
                value={props.val}
                className={props.val >= 90 ? classes.topMax : props.val > 70 && props.val <= 89 ? classes.topMid : classes.top}
                classes={{
                    circle: classes.circle
                }}
                size={120}
                thickness={4}
                {...props}
            /> */}
            <CircularProgressWithLabel
                value={props.val}
            />
        </div>
    );
}

export default function CustomizedProgressBars(props) {
    return <FacebookCircularProgress val={props.value} />;
}
