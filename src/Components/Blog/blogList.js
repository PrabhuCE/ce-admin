import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import moment from 'moment';
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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { blogListData, categoryListData, unArchiveBlog, archiveBlog, getArchivedBlogsForCategory, getAppsList, getCategoryList, postCategoryData, resetCreateCategory, getActiveBlogsForCategory } from '../../Store/Blog/actionCreator'

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
        textAlign: 'initial'
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
    logoutBtn: {
        margin: '0.5rem'
    },
    catTitle: {
        width: '80%',
        margin: '1rem'
    },
    selCatName: {
        margin: '1rem'
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function BlogList(props) {
    const classes = useStyles();
    const [appsFetch, setAppsFetch] = useState(true);
    const [categoryFetch, setCategoryFetch] = useState(true);
    const [appsList, setAppsList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [archBlogList, setArchBlogList] = useState([]);
    const [app, setApp] = useState(0);
    const [catList, setCatList] = useState([]);
    const [selectedCatTitle, setSelectedCatTitle] = useState('');
    const [selectedCat, setSelectedCat] = useState();
    const [value, setValue] = useState(0);

    const editBlogContent = (blogId) => {
        props.history.push(`/createBlog?blog_id=${blogId}`)
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleCatSelection = (item) => {
        setSelectedCatTitle(item.category_name);
        setSelectedCat(item.id);
        props.getActiveBlogsForCategory(item.id);
        props.getArchivedBlogsForCategory(item.id);
    }

    useEffect(() => {
        props.getAppsList();
        props.getCategoryList();
    }, [])

    useEffect(() => {
        setAppsList(props.appsList);
        setAppsFetch(false);
        setApp(props.appsList.length > 0 && props.appsList[0].id)
    }, [props.appsList])

    useEffect(() => {
    }, [props.activeBlogList, props.archivedBlogList])

    const archiveBlog = (blog) => {
        props.archiveBlog(blog.id, blogList, archBlogList);
    }

    const unArchiveBlog = (blog) => {
        props.unArchiveBlog(blog.id, blogList, archBlogList);
    }


    useEffect(() => {

        if (props.activeBlogList.length > 0 && selectedCat) {
            setBlogList(props.activeBlogList);
        } else {
            setBlogList([])
        }

        if (props.archivedBlogList.length > 0 && selectedCat) {
            setArchBlogList(props.archivedBlogList);
        } else {
            setArchBlogList([])
        }

    }, [props.list])

    // const handleBlogLogout = () => {
    //     localStorage.setItem('blog_user', "");
    //     localStorage.setItem('blog_token', "");
    //     props.history.push('/bloglogin')
    // }

    useEffect(() => {
        setCategoryFetch(false);
        if (props.categoryList.length > 0 && appsList.length > 0) {
            let categoryObj = props.categoryList.filter((item) => (item.application.id === appsList[0].id));
            setCatList(categoryObj);
            setSelectedCat(categoryObj.length > 0 && categoryObj[0].id)
            if (categoryObj.length > 0) {
                props.getActiveBlogsForCategory(categoryObj[0].id)
                props.getArchivedBlogsForCategory(categoryObj[0].id)
            } else {
                setBlogList([])
                setArchBlogList([])
            }
            setSelectedCatTitle(categoryObj.length > 0 && categoryObj[0].category_name)
        }
    }, [props.categoryList])


    const handleChange = (event) => {
        setApp(event.target.value);
        if (props.categoryList.length > 0) {
            let categoryObj = props.categoryList.filter((item) => (item.application.id === event.target.value));
            setCatList(categoryObj);
            setSelectedCat(categoryObj.length > 0 && categoryObj[0].id)
            if (categoryObj.length > 0) {
                props.getActiveBlogsForCategory(categoryObj[0].id)
                props.getArchivedBlogsForCategory(categoryObj[0].id)
            }
            else {
                setBlogList([])
                setArchBlogList([])
            }
            setSelectedCatTitle(categoryObj.length > 0 && categoryObj[0].category_name)
        }
    };

    const renderBlogCard = (item) => {
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="div"
                        className={classes.media}
                        image={item.thumbnail_image}
                        title={item.title}
                        alt={item.title}
                    />
                    <CardContent className={classes.cardContent}>
                        <div className={classes.infoCtr}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <div className={classes.itemDate}> {moment(item.modified_date).format('DD-MMM-YYYY')} </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <div className={classes.itemDate}>  {item.duration} Min </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.title}>
                            {item.title}
                        </div>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.cardActions}>
                    {item.is_active ? <Button color="primary" variant='outlined' onClick={() => { archiveBlog(item) }} style={{ marginRight: '0.5rem' }}>
                        Archive
                    </Button> :
                        <Button color="primary" variant='outlined' onClick={() => { unArchiveBlog(item) }} style={{ marginRight: '0.5rem' }}>
                            Activate
                    </Button>
                    }
                    {!item.is_active && <Button color="primary" variant='outlined' onClick={() => { editBlogContent(item.id) }}>
                        Edit Blog
                    </Button>}
                </CardActions>
            </Card >
        )
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Paper elevation={3} className={classes.leftPaper}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => { props.history.push('/blogconfig') }}>Blog Configs</Button>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => { props.history.push('/createblog') }}>Create Blog</Button>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">App</InputLabel>
                            {!appsFetch ? <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={app}
                                onChange={handleChange}
                                label="Age"
                            >
                                {appsList.length > 0 && appsList.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.app_name || 'Invalid App Name'}</MenuItem>
                                ))}
                            </Select> : <CircularProgress color="primary" />}
                        </FormControl>
                    </Paper>
                    <Paper elevation={3} className={classes.leftPaper}>
                        {!categoryFetch ? <List component="nav" aria-label="blog categories">
                            {catList && catList.length > 0 ? catList.map((item, index) => {
                                return (<React.Fragment key={index}>
                                    <div className={classes.listRoot}>
                                        <ListItem button onClick={() => handleCatSelection(item)} key={index}>
                                            <ListItemText primary={
                                                <div className={classes.catName}>
                                                    {item.category_name}
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
                            ) : <div>No Data to Display</div>}
                        </List> : <CircularProgress color="secondary" />}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Paper elevation={2} className={classes.categoryCtr}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={9} lg={10} style={{ padding: '1px' }}>
                                        <div className={classes.catName}>
                                            Category -&nbsp;{selectedCatTitle}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                            <Tab label="Active Blogs" {...a11yProps(0)} />
                            <Tab label="Archived Blogs" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <Paper elevation={2} className={classes.categoryCtr}>

                        <TabPanel value={value} index={0} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                {blogList.length > 0 ? blogList.map((item, index) => {
                                    return (
                                        <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                                            {renderBlogCard(item)}
                                        </Grid>)
                                }) : <div>No Data to Display</div>}

                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                {archBlogList.length > 0 ? archBlogList.map((item, index) => {
                                    return (
                                        <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                                            {renderBlogCard(item)}
                                        </Grid>)
                                }) : <div>No Data to Display</div>}
                            </Grid>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </div >)
}

const mapDispatchToProps = (dispatch) => ({
    getAppsList: bindActionCreators(getAppsList, dispatch),
    getCategoryList: bindActionCreators(getCategoryList, dispatch),
    postCategoryData: bindActionCreators(postCategoryData, dispatch),
    resetCreateCategory: bindActionCreators(resetCreateCategory, dispatch),
    getActiveBlogsForCategory: bindActionCreators(getActiveBlogsForCategory, dispatch),
    getArchivedBlogsForCategory: bindActionCreators(getArchivedBlogsForCategory, dispatch),
    archiveBlog: bindActionCreators(archiveBlog, dispatch),
    unArchiveBlog: bindActionCreators(unArchiveBlog, dispatch)
})

const mapStateToProps = (state) => {
    const list = state.lists;
    return {
        list,
        appsList: list.appsList,
        categoryList: list.categoryList,
        newCategory: list.newCategory,
        appsAPIStatus: list.appsAPIStatus,
        categoryAPIStatus: list.categoryAPIStatus,
        postCategoryAPIStatus: list.postCategoryAPIStatus,
        activeBlogList: list.activeBlogList,
        archivedBlogList: list.archivedBlogList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);

