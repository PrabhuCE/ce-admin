import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TimelineIcon from '@material-ui/icons/Timeline';
import Divider from "@material-ui/core/Divider";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CustomizedProgressBars from './progress';
import { getStorageDetails } from '../../Store/Billing/actionCreator';
import CELogo from '../../Static/ce.svg';
import FalabellaLogo from '../../Static/falabella_logo.png';
import GoniyoLogo from '../../Static/goniyo_logo.png';
import LowesLogo from '../../Static/lowesLogo.svg';
import MyAthinaLogo from '../../Static/myathina-logo-1.svg';
import ZopsmartLogo from '../../Static/zopsmart_logo.png';
import PrepLogo from '../../Static/prep.svg';


export default function Storage(props) {
    const classes = useStyles();
    const [selType, setSelType] = useState();
    let stDate = new Date();
    stDate.setDate(stDate.getDate() - 7);
    const [startDate, setStartDate] = useState(stDate);
    const [endDate, setEndDate] = useState(new Date());
    const [storageOvwDet, setStorageOvwDet] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState(props.tenant.name);

    useEffect(() => {
        getStorageOverview();
        setSelectedTenant(props.tenant.name);
    }, [props]);



    const getStorageOverview = () => {
        let payload = {};
        getStorageDetails(payload, succCB, failCB);
    }

    const succCB = (res) => {
        setStorageOvwDet(res.pricing_blocks);
    }

    const failCB = (err) => {

    }

    const viewSelectedData = () => {

    }

    const selectedData = (val) => {
        setSelType(val)
    }

    const renderTenantLogo = () => {
        switch (selectedTenant) {
            case 'Zopsmart':
                return (<img src={ZopsmartLogo} height="60px" width="180px" alt="tenant Logo" />);
                break;
            case 'B2C':
                return (<img src={MyAthinaLogo} height="60px" width="120px" alt="tenant Logo" />);
                break;
            case 'ContinualEngine':
                return (<img src={CELogo} height="60px" width="90px" alt="tenant Logo" />)
                break;
            case 'Falabella':
                return (<img src={FalabellaLogo} height="60px" width="120px" alt="tenant Logo" />)
                break;
            case 'GoNiyo':
                return (<img src={GoniyoLogo} height="40px" width="40px" alt="tenant Logo" />)
                break;
            case 'prep':
                return (<img src={PrepLogo} height="60px" width="80px" alt="tenant Logo" />)
                break;
            case 'Lowes':
                return (<img src={LowesLogo} height="60px" width="120px" alt="tenant Logo" />)
                break;
            default:
                return null
        }

    }


    return (
        <div className={classes.container}>
            <Paper className={classes.paperHdr}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div style={{ textAlign: 'initial', marginLeft: '0.5rem' }}>
                            {renderTenantLogo()}
                        </div>
                        <div style={{ display: 'flex', }}>
                            <div className={classes.dataCtr}><div className={classes.hdrLbl}>Total Files:</div> <div className={classes.hdrVal}>872 </div></div>
                            <div className={classes.dataCtr}><div className={classes.hdrLbl}>Total Storage Used:</div> <div className={classes.hdrVal}>22.32 GB / 30</div></div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div style={{ margin: '0.5rem 1.2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <div>
                                <div className={classes.dataCtr}>
                                    <div className={classes.hdrLblSec}>Current billing Period : </div> <div className={classes.hdrValSec}>March 10 - April 9 </div>
                                </div>
                                <div className={classes.dataCtr}>
                                    <div className={classes.hdrLblSec}>Last Bill Paid : </div> <div className={classes.hdrValSec}>Feb 10 </div>
                                    <div className={classes.link}><a href="" className={classes.downloadLink}>View Bill</a> </div>
                                </div>
                            </div>



                            <Button variant="outlined" className={classes.btnFilled}>
                                Generate Bill
                            </Button>

                        </div>
                        <div style={{ display: "flex", margin: "0.8rem", justifyContent: 'flex-end' }}>
                            <DatePicker
                                aria-label="select meeting filter start date"
                                className={classes.datePicker}
                                selected={startDate}
                                maxDate={new Date()}
                                onChange={date => setStartDate(date)}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Click to select a date"
                            />
                            <DatePicker
                                aria-label="select meeting filter end date"
                                className={classes.datePicker}
                                selected={endDate}
                                minDate={startDate}
                                maxDate={new Date()}
                                onChange={date => setEndDate(date)}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Click to select a date"
                            />
                        </div>
                    </Grid>
                </Grid>

            </Paper>
            <Grid container spacing={1}>
                {storageOvwDet.length > 0 && storageOvwDet.map((item, index) => {
                    let percent = item.consumed_space / item.allocated_space;
                    percent = percent * 100;
                    return (
                        <Grid key={index} item xs={12} sm={12} md={4} lg={4}>
                            <Card className={classes.root}>
                                <CardHeader
                                    title={<div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {/* <VideocamOutlinedIcon className={classes.cardIcon} /> */}
                                        <div style={{ color: '#4285f4' }}>{item.content_type}</div>
                                    </div>}
                                    subheader={item.sub_header}
                                />
                                <Divider />
                                <CardContent>
                                    <div style={{ display: 'flex' }}>
                                        <div className={classes.dataCtr}>
                                            <div className={classes.dataLbl}>Total Files:</div>
                                            <div className={classes.dataVal}>{item.file_count} </div>
                                        </div>
                                        <div className={classes.dataCtr}>
                                            <div className={classes.dataLbl}>Consumed Space:</div>
                                            <div className={classes.dataVal}>{item.consumed_space} GB / {item.allocated_space} GB</div>
                                        </div>
                                    </div>
                                    {item.content_type.toLowerCase() !== 'downloads' ?
                                        <div style={{ margin: '1rem 0rem', display: 'flex', justifyContent: 'center' }}>
                                            <CustomizedProgressBars value={percent} />
                                        </div> :
                                        <div style={{ margin: '1rem 0rem', display: 'flex', justifyContent: 'center' }}>

                                        </div>
                                    }
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button variant="outlined" className={classes.btn} onClick={() => { selectedData() }}>
                                        View More <TimelineIcon className={classes.btnIcn} />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>)
                })}

            </Grid>
            <Grid container spacing={1}>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Paper elevation={2} className={classes.detailsCtr}>
                        {viewSelectedData()}
                    </Paper>
                </Grid>

            </Grid>
        </div >
    );
}



const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '1rem'
    },
    root: {
        margin: '1rem'
    },
    dataCtr: {
        display: 'flex',
        margin: '0.2rem'
    },
    dataLbl: {
        fontSize: '0.8rem',
        color: '#999',
        marginTop: '0.1rem'
    },
    dataVal: {
        fontSize: '0.9rem',
        color: '#4285f4',
        marginLeft: '0.1rem'
    },
    hdrLbl: {
        fontSize: '1rem',
        fontWeight: 600,
        color: 'orange',
        marginTop: '0.2rem'
    },
    hdrVal: {
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#4285f4',
        marginLeft: '0.5rem'
    },
    paperHdr: {
        marginBottom: '1rem'
    },
    btn: {
        '&:hover': {
            border: '1px solid #4285f4',
            color: '#4285f4',
        },
        marginBottom: '1rem'

    },
    btnFilled: {
        '&:hover': {
            backgroundColor: '#4285f4',
            color: '#fff',
        },
        backgroundColor: '#4285f4',
        color: '#fff',
        marginLeft: '1rem',
        textAlign: 'center'
    },
    btnIcn: {
        marginLeft: '0.5rem',
        '&:hover': {
            color: '#4285f4',
        },
    },
    cardIcon: {
        color: '#4285f4',
        fontSize: '2rem',
        margin: '0 1rem'
    },
    hdrLblSec: {
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#999',
        marginTop: '0.2rem'
    },
    hdrValSec: {
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#999',
        marginTop: '0.2rem',
        marginLeft: '0.5rem'
    },
    detailsCtr: {
        minHeight: '12rem',
        margin: '1rem'
    },
    datePicker: {
        border: '1px solid',
        borderRadius: '5px',
        width: 120,
        padding: '0.5rem',
        margin: '0.5rem 0.5rem 0 0'
    },
    dtPkrMob: {
        textAlign: 'initial'
    },
    downloadLink: {
        fontSize: '0.8rem',
        cursor: 'pointer',
        color: '#4285f4',
    },
    link: {
        marginLeft: '0.5rem'
    }
}));
