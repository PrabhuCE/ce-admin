import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { blogListData, categoryListData, getAppsList, getCategoryList, postCategoryData, resetCreateCategory } from '../../Store/Blog/actionCreator'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0.5rem',

    },
    categoryCtr: {
        marginRight: '1rem',
        display: 'flex',
        padding: '1rem',
        justifyContent: 'space-between'
    },
    catName: {
        color: '#82827f',
        fontSize: "1rem",
    },
    editIconCtr: {
        fontSize: '0.8rem'
    },
    editIcon: {
        fontSize: '1rem'
    },
    icnBtn: {
        borderRadius: '5px',
        padding: '5px',
        textAlign: 'end',
        marginRight: '0.5rem'
    },
    desc: {
        color: "#999",
        fontSize: "0.8rem"
    },
    date: {
        fontSize: '0.7rem',
        color: '#999'
    },
    category: {
        fontSize: '0.7rem',
        color: '#999',
        marginLeft: '0.5rem',
        textTransform: 'uppercase'
    },
    title: {
        textAlign: 'initial',
        color: "#000",
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.5,
        textDecoration: 'none',
        marginTop: "0.5rem",
        cursor: 'pointer',
        '&hover:': {
            color: '#28ecee'
        }
    },
    card: {
        maxHeight: '400px',
        height: '365px'
    },
    itemDesc: {
        color: "#000",
        fontSize: "0.9rem",
        margin: "0.5rem 0 0 0",
        textAlign: 'justify',
        lineHeight: 1.5
    },
    media: {
        height: 140,
        margin: '1rem',
        cursor: 'pointer'
    },

    infoCtr:
    {
        display: 'flex',
        //marginLeft: '1rem'
        textAlign: 'initial'
    },
    itemDate: {
        fontSize: '0.8rem',
        color: '#999'
    },
    btn: {
        backgroundColor: '#62d894',
        '&:hover': {
            backgroundColor: '#62d894',
        }
    },
    catButton: {
        backgroundColor: '#d9d9d9',
        margin: '0.5rem',
        padding: '0.5rem',
        color: '#000',
        minWidth: 'fit-content',
        fontSize: '1rem',
        textAlign: 'center',
        borderRadius: '5px',
        textDecoration: 'none',
        '&:hover': {
            background: 'linear-gradient(to right, #2e5f9b, #2196F3)',
            color: '#fff',
            borderRadius: '5px',
        }
    },
    imgTxt: {
        bottom: '5px',
        //opacity: '0.9',
        position: 'absolute',
        fontSize: '2rem',
        color: '#fff',
        //background: 'linear-gradient(to right, #11998e, #38ef7d)',
        background: 'linear-gradient(to right, #2e5f9b, #2196F3)'
    },
    cardActions: {
        justifyContent: 'center',
        padding: '0.5rem'
    },
    formControl: {
        width: '80%',
        margin: '1rem'
    },
    leftPaper: {
        marginTop: '0.5rem',
    },
    button: {
        marginTop: '1rem',
        width: '80%'
    },
    catTitle: {
        width: '80%',
        margin: '1rem'
    },
    selCatName: {
        margin: '1rem'
    }
}));

function BlogList(props) {
    const classes = useStyles();
    const [appsList, setAppsList] = useState(props.appsList && props.appsList || [])
    const [blogList, setBlogList] = useState(blogListData.results || []);
    const [app, setApp] = useState(1);
    const [catList, setCatList] = useState([]);
    const [catName, setCatName] = useState('')
    const [catSelApp, setCatSelApp] = useState(1);
    const [selectedCatTitle, setSelectedCatTitle] = useState('');
    const [selectedCat, setSelectedCat] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [appName, setAppName] = useState('PREP');
    const [catEditFlag, setCatEditFlag] = useState(false);
    const [createCatLoading, setCreateCatLoading] = useState(false);

    const editBlogContent = () => {
        props.history.push('/createBlog?blog_id=123')
    }

    const handleCategoryChange = (e) => {
        setCatName(e.target.value)
    }

    const handleCatSelection = (item) => {
        setSelectedCatTitle(item.categoryTitle);
    }

    useEffect(() => {
        props.getAppsList();
        props.getCategoryList(1);
    }, [])

    useEffect(() => {
        if (props.postCategoryAPIStatus) {
            setCreateCatLoading(false)
            setDialogOpen(false)
            setCatName('');
        }
    }, [props.postCategoryAPIStatus])

    useEffect(() => {
        if (props.categoryList.length > 0) {
            let categoryObj = props.categoryList.find((item) => (item.id === 1));
            setCatList(categoryObj.categories);
            console.log("test", categoryObj);
            setSelectedCat(categoryObj.categories[0].id)
            setSelectedCatTitle(categoryObj.categories[0].categoryTitle)
        }
    }, [props.categoryList])


    const handleDialogOpen = (type) => {
        if (type === 'create') {
            setCatEditFlag(false);
            setDialogOpen(true);
        } else if (type === 'edit') {
            setDialogOpen(true);
            setCatEditFlag(true);
        }

    };

    const handleCreateCategory = () => {
        props.resetCreateCategory();
        let payload = {
            id: catList.length + 1,
            appId: catSelApp,
            categoryTitle: catName,
            slug: 'new-category'
        };
        setCreateCatLoading(true);
        props.postCategoryData(payload);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleCatAppChange = (event) => {
        setCatSelApp(event.target.value);
    }

    const handleChange = (event) => {
        setApp(event.target.value);
        console.log("sds", event.target.value);
        let appName = event.target.value === 1 ? 'PREP' : event.target.value === 2 ? 'MyAthina' : 'TableVision';
        setAppName(appName);
        if (props.categoryList.length > 0) {
            let categoryObj = props.categoryList.find((item) => (item.id === event.target.value));
            console.log("sds", categoryObj);
            setCatList(categoryObj.categories);
        }
    };

    const renderBlogCard = (item) => {
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="div"
                        className={classes.media}
                        image={item.thumbnail_img}
                        title={item.title}
                        alt={item.title}
                    />
                    <CardContent className={classes.cardContent}>
                        <div className={classes.infoCtr}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <div className={classes.itemDate}> {item.date_posted} </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <div className={classes.itemDate}> {item.duration} </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.title}>
                            {item.title}
                        </div>
                        <div className={classes.itemDesc}>
                            {item.desc && item.desc.length > 70 ? item.desc.substring(0, 70) + '...' : item.desc}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.cardActions}>
                    <Button color="primary" variant='outlined' style={{ marginRight: '0.5rem' }}>
                        Publish
                    </Button>
                    <Button color="primary" variant='outlined' onClick={editBlogContent}>
                        Edit Blog
                    </Button>
                </CardActions>

            </Card >
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Paper elevation={3} className={classes.leftPaper}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => { props.history.push('/createblog') }}>Create Blog</Button>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">App</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={app}
                                onChange={handleChange}
                                label="Age"
                            >
                                {appsList.length > 0 && appsList.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.app_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                    <Paper elevation={3} className={classes.leftPaper}>
                        <List component="nav" aria-label="blog categories">
                            {catList && catList.length > 0 && catList.map((item, index) => {
                                return (<React.Fragment key={index}>
                                    <div className={classes.listRoot}>
                                        <ListItem button onClick={() => handleCatSelection(item)} key={index}>
                                            <ListItemText primary={
                                                <div className={classes.catName}>
                                                    {item.categoryTitle}
                                                </div>
                                            } />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="view">
                                                    <KeyboardArrowRightIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </div>
                                    <Divider />
                                </React.Fragment>)
                            }
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Paper elevation={2} className={classes.categoryCtr}>
                                <div className={classes.catName}>
                                    Category -&nbsp;{selectedCatTitle}
                                </div>
                                <div className={classes.editIconCtr}>
                                    <Tooltip title="Add Category">
                                        <IconButton className={classes.icnBtn} onClick={() => { handleDialogOpen('create') }}>
                                            <AddIcon className={classes.editIcon} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit Category Details">
                                        <IconButton className={classes.icnBtn} onClick={() => { handleDialogOpen('edit') }}>
                                            <EditIcon className={classes.editIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {blogList.length > 0 && blogList.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                                    {renderBlogCard(item)}
                                </Grid>)
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"> {catEditFlag ? "Update Category Info" : "Create New Category"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {catEditFlag ?
                                <React.Fragment>
                                    <div className={classes.selCatName}>{appName}</div>
                                    <TextField className={classes.catTitle} variant='outlined' value={catName} onChange={handleCategoryChange} label="Category Title">
                                    </TextField>
                                </React.Fragment>
                                : <React.Fragment>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">App</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={catSelApp}
                                            onChange={handleCatAppChange}
                                            label="App"
                                        >
                                            {appsList.length > 0 && appsList.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.app_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField className={classes.catTitle} variant='outlined' value={catName} onChange={handleCategoryChange} label="Category Title">
                                    </TextField>
                                </React.Fragment>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {catEditFlag ?
                        <Button color="primary" variant='outlined'>
                            Update
                    </Button>
                        : <Button onClick={() => { handleCreateCategory() }} disabled={createCatLoading} color="primary" variant='outlined'>
                            Submit
                            </Button>}
                    <Button onClick={handleDialogClose} color="primary" variant='outlined'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >)
}

const mapDispatchToProps = (dispatch) => ({
    getAppsList: bindActionCreators(getAppsList, dispatch),
    getCategoryList: bindActionCreators(getCategoryList, dispatch),
    postCategoryData: bindActionCreators(postCategoryData, dispatch),
    resetCreateCategory: bindActionCreators(resetCreateCategory, dispatch)
})

const mapStateToProps = (state) => {
    return {
        appsList: state.lists.appsList,
        categoryList: state.lists.categoryList,
        appsAPIStatus: state.lists.appsAPIStatus,
        categoryAPIStatus: state.lists.categoryAPIStatus,
        postCategoryAPIStatus: state.lists.postCategoryAPIStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);

