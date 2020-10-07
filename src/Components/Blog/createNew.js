import React, { useState, useEffect } from 'react';
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
import Input from "@material-ui/core/Input";
//import TextEditorClassic from '../Shared/TextEditorClassic';
import TextEditor from '../Shared/TextEditor';
import Header from '../../Components/Header';
import { getBlogContent } from '../../Store/Blog/actionCreator';


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
        marginTop: '0.5rem',
        color: '#fff',
        backgroundColor: '#2e8eec',
        '&:hover': {
            backgroundColor: '#2e8eec',
        }
    },
    uploadCtr: {
        textAlign: 'initial'
    },
    formControl: {
        width: '100%'
    },
    addBtn: {
        marginTop: '0.5rem',
        backgroundColor: '#2e8eec',
        '&:hover': {
            backgroundColor: '#2e8eec',
        }
    },
    chip: {
        color: '#2e8eec',
        border: '1px solid #2e8eec',
        margin: '0.5rem'
    },
    chipCtr: {
        display: 'flex',
        textAlign: 'initial',
        margin: '0.5rem'
    },
    divider: {
        margin: '1rem 0 1rem 0',
        fontSize: '5px'
    },
    uploadFileName: {
        textAlign: 'initial',
        marginTop: '1rem'
    },
    button: {

    }
}))


function CreateBlog(props) {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [urlSlug, setUrlSlug] = useState();
    const [duration, setDuration] = useState();
    const [shortDesc, setShortDesc] = useState();
    const [thumbnailImg, setThumbnailImg] = useState();
    const [thumbnailFileName, setThumbnailFileName] = useState('');
    const [authorImg, setAuthorImg] = useState();
    const [authorFileName, setAuthorFileName] = useState('');
    const [blogContent, setBlogContent] = useState();
    const [author, setAuthor] = useState();
    const [keywordTxt, setKeywordTxt] = useState();
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [app, setApp] = useState(0);
    const [ogImg, setOgImg] = useState();
    const [ogFileName, setOgFileName] = useState('');
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
        "og-keywords": ''
    })

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let paramVal = urlParams.get("blog_id");
        if (paramVal) {
            getBlogContent(paramVal, successCB, failureCB);
        } else {
            setLoading(false)
        }
    }, [])

    const onFileToUploadClick = (imgType) => {
        document.getElementById(imgType).click();
    };

    const successCB = (res) => {
        setTitle(res.title);
        setAuthor(res.author_name);
        setLoading(false)
    }

    const failureCB = (err) => {

    }

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleAppChange = (event) => {
        setApp(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlSlugChange = (event) => {
        setUrlSlug(event.target.value)
    }

    const handleDurationChange = (event) => {
        setDuration(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const onThumbnailChangeHandler = (event) => {
        if (
            event.target.files.length > 0 &&
            (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg")
        ) {
            setThumbnailFileName(event.target.files[0].name);
            let reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailImg(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            // props.showSnackBar({
            //     state: true,
            //     message: "Please Upload a Valid png/jpg/jpeg file!",
            //     type: "error",
            // });
        }
        event.target.value = '';
    }

    const onAuthorImgChangeHandler = (event) => {
        if (
            event.target.files.length > 0 &&
            (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg")
        ) {
            setAuthorFileName(event.target.files[0].name);
            let reader = new FileReader();
            reader.onloadend = () => {
                setAuthorImg(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            // props.showSnackBar({
            //     state: true,
            //     message: "Please Upload a Valid png/jpg/jpeg file!",
            //     type: "error",
            // });
        }
        event.target.value = '';
    }

    const onOGImgChangeHandler = (event) => {
        if (
            event.target.files.length > 0 &&
            (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg")
        ) {
            setOgFileName(event.target.files[0].name);
            let reader = new FileReader();
            reader.onloadend = () => {
                setOgImg(reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            // props.showSnackBar({
            //     state: true,
            //     message: "Please Upload a Valid png/jpg/jpeg file!",
            //     type: "error",
            // });
        }
        event.target.value = '';
    }

    const handleKeywordTxtChange = (event) => {
        setKeywordTxt(event.target.value);
    }

    const handleChipDelete = (chipToDelete) => () => {
        setKeywords((keywords) => keywords.filter((chip) => chip !== chipToDelete));
    };

    const addKeyword = () => {
        let arr = [...keywords, keywordTxt]
        setKeywords(arr)
        setKeywordTxt('');
    }

    const handleMetaContentChange = (field, event) => {
        setMetaContent({ ...metaContent, [field]: event.target.value })
    }

    const handleOGContentChange = (field, event) => {
        setOGContent({ ...OGContent, [field]: event.target.value })
    }

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
                                    <TextField className={classes.title} variant='outlined' value={title} onChange={handleTitleChange} label="Blog Title">
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
                                                    onClick={() => {
                                                        onFileToUploadClick("thumbnailImage");
                                                    }}
                                                >
                                                    Thumbnail
                                                </Button>
                                            </div>
                                            <Input accept="image/*" capture type="file" style={{ display: "none" }} id="thumbnailImage" onChange={onThumbnailChangeHandler} />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8} lg={8}>
                                            <div className={classes.uploadFileName}>{thumbnailFileName}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} onChange={handleUrlSlugChange} variant='outlined' label="URL Slug">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2} lg={2}>
                                    <TextField className={classes.title} onChange={handleDurationChange} variant='outlined' label="Duration(Mins)">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField className={classes.title} onChange={handleAuthorChange} variant='outlined' label="Author">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className={classes.uploadCtr}>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.uploadBtn}
                                            startIcon={<CloudUploadIcon />}
                                            onClick={() => {
                                                onFileToUploadClick("authorImage");
                                            }}
                                        >
                                            Author Img
                                        </Button>
                                        <Input accept="image/*" capture type="file" style={{ display: "none" }} id="authorImage" onChange={onAuthorImgChangeHandler} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3}>
                                    <div className={classes.uploadFileName}>{authorFileName}</div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={9} md={9} lg={9}>
                                            <TextField className={classes.title} variant='outlined' value={keywordTxt} onChange={handleKeywordTxtChange} label="Keywords" >

                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={9} md={9} lg={3}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { addKeyword() }}
                                                className={classes.addBtn}
                                            >
                                                Add
                                     </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className={classes.chipCtr}>
                                            {keywords.length > 0 && keywords.map((item, index) => (
                                                <Chip
                                                    variant="outlined"
                                                    label={item}
                                                    onDelete={handleChipDelete(item)}
                                                    className={classes.chip}
                                                />
                                            ))}
                                        </div>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextEditor />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-title', e) }} value={metaContent["meta-title"]} label="meta-title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-desc', e) }} value={metaContent["meta-desc"]} label="meta-description">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-keyword', e) }} value={metaContent["meta-keyword"]} label="meta-keyword">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-author', e) }} value={metaContent["meta-author"]} label="meta-author">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-robot', e) }} value={metaContent["meta-robot"]} label="meta-robot">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-copyright', e) }} value={metaContent["meta-copyright"]} label="meta-copyright">
                                    </TextField>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleOGContentChange('og-title', e) }} value={OGContent["og-title"]} label="og-title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleOGContentChange('og-url', e) }} value={OGContent["og-url"]} label="og-url">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleOGContentChange('og-desc', e) }} value={OGContent["og-desc"]} label="og-description">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleOGContentChange('og-keywords', e) }} value={OGContent["og-keywords"]} label="og-keyword">
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
                                                    onClick={() => {
                                                        onFileToUploadClick("ogImage");
                                                    }}
                                                >
                                                    OG Image
                                        </Button>
                                                <Input accept="image/*" capture type="file" style={{ display: "none" }} id="ogImage" onChange={onOGImgChangeHandler} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8} lg={8}>
                                            <div className={classes.uploadFileName}>{ogFileName}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button variant="contained" color="primary" className={classes.uploadBtn}>
                                        Submit
                        </Button>
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