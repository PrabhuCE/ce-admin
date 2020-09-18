import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
//import TextEditorClassic from '../Shared/TextEditorClassic';
import TextEditor from '../Shared/TextEditor';
import Header from '../../Components/Header';


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: '6rem'
    },
    title: {
        width: '100%'
    },
    detailsWrapper: {
        padding: '1rem'
    },
    uploadBtn: {
        marginTop: '0.5rem'
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
    uploadFileName: {
        textAlign: 'initial',
        marginTop: '1rem'
    }
}))


function CreateBlog(props) {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState();
    const [urlSlug, setUrlSlug] = useState();
    const [shortDesc, setShortDesc] = useState();
    const [thumbnailImg, setThumbnailImg] = useState();
    const [blogContent, setBlogContent] = useState();
    const [author, setAuthor] = useState();
    const [keywords, setKeywords] = useState([]);
    const [app, setApp] = useState();
    //Meta Content Object
    const [metaContent, setMetaContent] = useState({
        "meta-title": '',
        "meta-desc": '',
        "meta-keyword": '',
        "meta-author": '',
        "meta-robot": '',
        "meta-copyright": ''
    })

    //OG SMO Object
    const [OGContent, setOGContent] = useState({
        "og-title": '',
        "og-url": '',
        "og-desc": '',
        "og-keywords": '',
        "og-imaget": '',

    })

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleAppChange = (event) => {
        setApp(event.target.value);
    };





    return (
        <div>
            <Header />
            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={2}>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <Paper elevation={2}>
                            <Grid container spacing={1} className={classes.detailsWrapper}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Apps</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={app}
                                            onChange={handleAppChange}
                                            label="Apps"
                                        >
                                            <MenuItem value={1}>TableVision</MenuItem>
                                            <MenuItem value={2}>PREP</MenuItem>
                                            <MenuItem value={3}>MyAthina</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={category}
                                            onChange={handleChange}
                                            label="Category"
                                        >
                                            <MenuItem value={1}>Programming</MenuItem>
                                            <MenuItem value={2}>Design</MenuItem>
                                            <MenuItem value={3}>Dev-Ops</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField className={classes.title} variant='outlined' label="Blog Title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4} lg={4}>
                                            <div className={classes.uploadCtr}>
                                                <Button
                                                    variant="contained"
                                                    color="default"
                                                    className={classes.uploadBtn}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Thumbnail
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8} lg={8}>
                                            <div className={classes.uploadFileName}>File_name_1.jpeg</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="URL Slug">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2} lg={2}>
                                    <TextField className={classes.title} variant='outlined' label="Duration(Mins)">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField className={classes.title} variant='outlined' label="Author">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className={classes.uploadCtr}>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.uploadBtn}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Author Img
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className={classes.uploadFileName}>File_name_1.jpeg</div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={9} md={9} lg={9}>
                                            <TextField className={classes.title} variant='outlined' label="Keywords">

                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={9} md={9} lg={3}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.addBtn}
                                            >
                                                Add
                                     </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextEditor />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-description">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-keyword">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-author">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-robot">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="meta-copyright">
                                    </TextField>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="og-title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="og-url">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="og-description">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="og-keyword">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' label="og-image">
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2}>

                    </Grid>


                </Grid>
            </div>
        </div >
    )
}

export default CreateBlog;