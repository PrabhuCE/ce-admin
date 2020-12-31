import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CatDetails from './catDetails';
import Header from '../Header';
import { createApp, editAppInfo, unArchiveApp, archiveApp, getArchivedAppsList, blogListData, categoryListData, getAppsList, getCategoryList, postCategoryData, resetCreateCategory } from '../../Store/Blog/actionCreator'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2rem'
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
    },
    icn: {
        cursor: 'pointer',
        margin: '0.5rem'
    },
    arIcn: {
        cursor: 'pointer',
        margin: '0.5rem',
        color: '#999'
    },
    unarIcn: {
        cursor: 'pointer',
        margin: '0.5rem',
        color: 'red'
    },
    textFieldCtr: {
        display: 'flex',
        margin: '0.5rem'
    },
    txtField: {
        margin: '0.5rem'
    },
    btn: {
        margin: '0.5rem 1rem'
    },
    formControl: {
        margin: '0.5rem 1rem'
    },
    ctrHdr: {
        display: 'flex',
        margin: '0.5rem',
        justifyContent: 'space-between'
    },
    appsFilterCtr: {
        display: 'flex',
        margin: '0.5rem',
    },
    appsLbl: {
        margin: '1rem',
        fontSize: '1rem',
        fontWeight: 600
    },
    appsRoot: {
        flexGrow: 1
    },
    brdcrmbWrapper: {
        marginTop: '5rem',
        marginLeft: '1rem'
    },
    brdCrmbPrimary: {
        color: '#2368a9',
        fontWeight: 500,
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

function BlogConfig(props) {
    const classes = useStyles();
    const [selMenu, setSelMenu] = useState('apps');
    const [appList, setAppList] = useState([]);
    const [fetchApps, setFetchApps] = useState(false);
    const [createNewApp, setCreateNewApp] = useState(false);
    const [editAppName, setEditAppName] = useState(false);
    const [appName, setAppName] = useState('');
    const [selectedApp, setSelectedApp] = useState();
    const [filterType, setFilterType] = useState(0);

    useEffect(() => {
        setAppList(props.appsList);
    }, [props.appsList])

    useEffect(() => {
        setAppName('');
        setCreateNewApp(false);
        setEditAppName(false);
    }, [props.list])

    useEffect(() => {
        if (filterType == 2) {
            setAppList(props.archivedAppsList)
        }
    }, [props.archivedAppsList])


    const handleClick = (type) => {
        setSelMenu(type)
    }

    const handleAppNameChange = (e) => {
        setAppName(e.target.value)
    }

    const handleCreateNew = () => {
        setCreateNewApp(true)
    }

    const handleCreateNewApp = () => {
        let payload = {
            app_name: appName,
        };
        setFetchApps(true);
        props.createApp(payload, props.appsList);
    }

    const handleEditApp = (app) => {
        setEditAppName(true)
        setAppName(app.app_name)
        setSelectedApp(app);
    }

    const handleEditAppName = () => {
        let payload = {
            app_id: selectedApp.id
        };
        props.editAppInfo(payload, props.appsList);
    }

    const handleArchiveApp = (app) => {
        let payload = {
            app_id: app.id
        };
        props.archiveApp(payload, props.archivedAppsList, props.appsList);
    }

    const handleUnArchiveApp = (app) => {
        let payload = {
            app_id: app.id
        };
        props.unArchiveApp(payload, props.archivedAppsList, props.appsList);
    }

    const handleFilterChange = (event) => {
        setFilterType(event.target.value)
        if (event.target.value == 1) {
            setAppList(props.appsList);
        } else if (event.target.value == 2) {
            props.getArchivedAppsList();
        }
    }

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


    return (

        <React.Fragment>
            <Header />
            <div className={classes.brdcrmbWrapper}>
                {SimpleBreadcrumbs()}
            </div>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Paper elevation={3} className={classes.leftPaper}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem button onClick={() => { handleClick("apps") }}>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Apps" />
                                </ListItem>
                                <Divider />
                                <ListItem button onClick={() => { handleClick("category") }}>
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Category" />
                                </ListItem>
                                <Divider />
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xm={12} md={8} lg={8}>
                        <Paper elevation={3} className={classes.leftPaper}>
                            {
                                selMenu == 'apps' ?
                                    <div className={classes.appsRoot}>
                                        {createNewApp || editAppName ? <Paper elevation={3} className={classes.leftPaper}>
                                            <div className={classes.textFieldCtr}>
                                                <TextField id="outlined-basic" label="AppName" variant="outlined" value={appName} onChange={(e) => { handleAppNameChange(e) }} className={classes.txtField} />
                                                {editAppName ? <Button variant="outlined" color="primary" className={classes.btn} onClick={() => { handleEditAppName() }}>Update</Button> : <Button variant="outlined" color="primary" className={classes.btn} onClick={() => { handleCreateNewApp() }}>Submit</Button>}
                                            </div>
                                        </Paper> :
                                            <div className={classes.ctrHdr}>
                                                <div className={classes.appsLbl}>Apps</div>
                                                <div className={classes.appsFilterCtr}>
                                                    <FormControl variant="outlined" className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={filterType}
                                                            onChange={handleFilterChange}
                                                            label="Type"
                                                        >

                                                            <MenuItem key={0} value={0}>--Select--</MenuItem>
                                                            <MenuItem key={1} value={1}>Active Apps</MenuItem>
                                                            <MenuItem key={2} value={2}>Archived Apps</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <Button variant="outlined" color="primary" onClick={() => { handleCreateNew() }} className={classes.btn}>Add New</Button></div>
                                            </div>}
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">S.No</TableCell>
                                                        <TableCell align="center">AppId</TableCell>
                                                        <TableCell align="center">App Name</TableCell>
                                                        <TableCell align="center">Is Active</TableCell>
                                                        <TableCell align="center">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {appList.length > 0 && appList.map((row, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell align="center" component="th" scope="row">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell align="center" component="th" scope="row">
                                                                {row.id}
                                                            </TableCell>
                                                            <TableCell align="center" component="th" scope="row">
                                                                {row.app_name}
                                                            </TableCell>
                                                            <TableCell align="center" component="th" scope="row">
                                                                {row.is_active ? 'True' : 'False'}
                                                            </TableCell>
                                                            <TableCell align="center" component="th" scope="row">
                                                                {row.is_active ? <Tooltip title="Archive app"><ArchiveOutlinedIcon className={classes.arIcn} onClick={() => { handleArchiveApp(row) }} /></Tooltip> : <Tooltip title="UnArchive app"><UnarchiveOutlinedIcon className={classes.unarIcn} onClick={() => { handleUnArchiveApp(row) }} /></Tooltip>}
                                                                {!row.is_active && <Tooltip title="Edit App Name"><EditIcon className={classes.icn} onClick={() => { handleEditApp(row) }} /></Tooltip>}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    : <CatDetails />
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    createApp: bindActionCreators(createApp, dispatch),
    editAppInfo: bindActionCreators(editAppInfo, dispatch),
    archiveApp: bindActionCreators(archiveApp, dispatch),
    unArchiveApp: bindActionCreators(unArchiveApp, dispatch),
    getArchivedAppsList: bindActionCreators(getArchivedAppsList, dispatch)
})

const mapStateToProps = (state) => {
    const list = state.lists;
    return {
        list,
        appsList: list.appsList,
        archivedAppsList: list.archivedAppsList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogConfig);