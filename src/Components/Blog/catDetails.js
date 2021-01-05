import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CatDetails from './catDetails';
import Header from '../Header';
import { editCatInfo, postCategoryData, archiveCat, unArchiveCat, getArchivedCategory, getActiveCategory, getAllArchivedCategory } from '../../Store/Blog/actionCreator'
import { SettingsApplications } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1rem'
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
        width: '100%',
        maxWidth: '15rem',
        margin: '1rem'
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
        margin: '1rem'
    },
    ctrHdr: {
        display: 'flex',
        margin: '0.5rem',
        justifyContent: 'space-between'
    },
    appsLbl: {
        margin: '1rem',
        fontSize: '1rem',
        fontWeight: 600
    }
}))

function BlogConfig(props) {
    const classes = useStyles();
    const [appList, setAppList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [createNewCat, setCreateNewCat] = useState(false);
    const [editCatName, setEditCatName] = useState(false);
    const [archiveAction, setArchiveAction] = useState(false);
    const [catName, setCatName] = useState('');
    const [catSelApp, setCatSelApp] = useState('');
    const [selectedCat, setSelectedCat] = useState();
    const [selectedApp, setSelectedApp] = useState({});
    const [filterCat, setFilterCat] = useState(0);

    const handleCatFilterChange = (e) => {
        setFilterCat(e.target.value)
        if (e.target.value == 1) {
            props.getActiveCategory(catSelApp)
        } else if (e.target.value == 2) {
            props.getArchivedCategory(catSelApp, props.archivedCatList)
        }
    }

    useEffect(() => { props.getAllArchivedCategory() }, [])

    useEffect(() => {
        if (filterCat == 2) {
            setCategoryList(props.archivedCatListForApp)
        }
    }, [props.archivedCatListForApp])

    useEffect(() => {
        if (props.appsList.length > 0) {
            setAppList(props.appsList);
            setSelectedApp(props.appsList[0])
            setCatSelApp(props.appsList[0].id)
        }
    }, [props.appsList])

    useEffect(() => {
        setCategoryList(props.activeCatList)
    }, [props.activeCatList])

    useEffect(() => {
        setCatName('');
        setCreateNewCat(false);
        setEditCatName(false);
        setArchiveAction(false);
    }, [props.list])

    useEffect(() => {
        if (catSelApp !== '') {
            props.getActiveCategory(catSelApp)
        }
    }, [catSelApp])

    useEffect(() => {
        if (categories.length > 0) {
            let catList = categories.filter(item => (item.application.id == catSelApp));
            setCategoryList(catList)
        }
    }, [editCatName, createNewCat, archiveAction])


    const handleCreateNew = () => {
        setCreateNewCat(true)
    }

    const handleCatNameChange = (e) => {
        setCatName(e.target.value)
    }

    const handleCreateNewCat = () => {
        let payload = {
            application: catSelApp,
            category_name: catName,
        };
        props.postCategoryData(payload, props.activeCatList);
    }

    const handleCatAppChange = (event) => {
        setFilterCat(0)
        setCatSelApp(event.target.value);
    }

    const handleArchiveCat = (cat) => {
        setArchiveAction(true);
        let payload = {
            cat_id: cat.id
        };
        props.archiveCat(payload, props.activeCatList, props.archivedCatList);
    }

    const handleUnArchiveCat = (cat) => {
        setArchiveAction(true);
        let payload = {
            cat_id: cat.id
        };
        props.unArchiveCat(payload, props.activeCatList, props.archivedCatList);
    }

    const handleEditCat = (cat) => {
        setEditCatName(true)
        setCatName(cat.category_name)
        setSelectedCat(cat);
    }

    const handleEditCatName = () => {
        let payload = {
            application: catSelApp,
            category: selectedCat,
            cat_name: catName
        };
        props.editCatInfo(payload, props.archivedCatList);
    }

    return (
        <React.Fragment>
            <Header />

            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} xm={12} md={12} lg={12}>
                        <div className={classes.appsRoot}>

                            <Paper elevation={3} className={classes.leftPaper}>
                                <div className={classes.ctrHdr}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">App</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={catSelApp}
                                            onChange={handleCatAppChange}
                                            label="App"
                                        >
                                            {appList.length > 0 && appList.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.app_name == null ? 'Invalid App Name' : item.app_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={filterCat}
                                            onChange={handleCatFilterChange}
                                            label="Category Type"
                                        >
                                            <MenuItem key={0} value={0}>--Select--</MenuItem>
                                            <MenuItem key={1} value={1}>Active </MenuItem>
                                            <MenuItem key={2} value={2}>Archived </MenuItem>

                                        </Select>
                                    </FormControl>

                                    {createNewCat || editCatName ?
                                        <div className={classes.textFieldCtr}>
                                            <TextField id="outlined-basic" label="Category Name" variant="outlined" value={catName} onChange={(e) => { handleCatNameChange(e) }} className={classes.txtField} />
                                            {editCatName ? <Button variant="outlined" color="primary" className={classes.btn} onClick={() => { handleEditCatName() }}>Update</Button> : <Button variant="outlined" color="primary" className={classes.btn} onClick={() => { handleCreateNewCat() }}>Submit</Button>}
                                        </div>
                                        :
                                        <Button variant="outlined" color="primary" onClick={() => { handleCreateNew() }} className={classes.btn}>Add New Category</Button>
                                    }
                                </div>
                            </Paper>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">S.No</TableCell>
                                            <TableCell align="center">Cat Id</TableCell>
                                            <TableCell align="center">Category Name</TableCell>
                                            <TableCell align="center">Is Active</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categoryList.length > 0 && categoryList.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center" component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.category_name}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.is_active ? 'True' : 'False'}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.is_active ? <Tooltip title="Archive app"><ArchiveOutlinedIcon className={classes.arIcn} onClick={() => { handleArchiveCat(row) }} /></Tooltip> : <Tooltip title="UnArchive app"><UnarchiveOutlinedIcon className={classes.unarIcn} onClick={() => { handleUnArchiveCat(row) }} /></Tooltip>}
                                                    {!row.is_active && <Tooltip title="Edit App Name"><EditIcon className={classes.icn} onClick={() => { handleEditCat(row) }} /></Tooltip>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    postCategoryData: bindActionCreators(postCategoryData, dispatch),
    editCatInfo: bindActionCreators(editCatInfo, dispatch),
    archiveCat: bindActionCreators(archiveCat, dispatch),
    unArchiveCat: bindActionCreators(unArchiveCat, dispatch),
    getArchivedCategory: bindActionCreators(getArchivedCategory, dispatch),
    getActiveCategory: bindActionCreators(getActiveCategory, dispatch),
    getAllArchivedCategory: bindActionCreators(getAllArchivedCategory, dispatch)
})

const mapStateToProps = (state) => {
    const list = state.lists;
    return {
        list,
        appsList: list.appsList,
        activeCatList: list.activeCatList,
        archivedCatList: list.archivedCatList,
        archivedCatListForApp: list.archivedCatListForApp
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogConfig);