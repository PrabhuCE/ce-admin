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
import VisibilityIcon from '@material-ui/icons/Visibility';
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateEditor from '../../Components/Shared/CreateBlogEditor';
//import TextEditorClassic from '../Shared/TextEditorClassic';
import TextEditor from '../Shared/TextEditor';
import Header from '../../Components/Header';
import { getBlogContent, uploadThumbImg, uploadAuthorImg, createBlog, updateBlog, clearNewBlogObj } from '../../Store/Blog/actionCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirectTo } from '../../Helpers/basics'
import { Tooltip } from '@material-ui/core';


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
        display: 'flex',
        textAlign: 'center'
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
    prevIcn: {
        margin: '1rem 0.5rem',
        cursor: 'pointer'
    }
}))


function CreateBlog(props) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);
    const [category, setCategory] = useState('');
    const [apps, setApps] = useState(props.appsList && props.appsList || []);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [urlSlug, setUrlSlug] = useState();
    const [duration, setDuration] = useState();
    const [shortDesc, setShortDesc] = useState();
    const [thumbnailImg, setThumbnailImg] = useState();
    const [thumbnailFileName, setThumbnailFileName] = useState('');
    const [authorImg, setAuthorImg] = useState();
    const [authorFileName, setAuthorFileName] = useState('');
    const [blogContent, setBlogContent] = useState(null);
    const [author, setAuthor] = useState();
    const [keywordTxt, setKeywordTxt] = useState();
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [app, setApp] = useState(0);
    const [ogImg, setOgImg] = useState();
    const [ogFileName, setOgFileName] = useState('');
    const [blogSuccess, setBlogSuccess] = useState(false);
    const [metaContent, setMetaContent] = useState({
        "meta-title": '',
        "meta-desc": '',
        "meta-keyword": '',
        "meta-author": ''
    })
    const [OGContent, setOGContent] = useState({
        "og-title": '',
        "og-url": '',
        "og-desc": '',
        "og-keywords": ''
    })
    const [previewImg, setPreviewImg] = useState('');
    const [updateThumbnail, setUpdateThumbnail] = useState(false);
    const [updateAuthorImg, setUpdateAuthorImg] = useState(false);
    const [editThumbURL, setEditThumbURL] = useState();
    const [editAuthImgURL, setEditAuthImgURL] = useState();
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        if (props.categoryList.length > 0) {
            let categoryArr = props.categoryList.filter((item) => (item.application.id === 1));
            setCategories(categoryArr);
        }
    }, [props.categoryList])

    useEffect(() => {
        props.clearNewBlogObj();
        let urlParams = new URLSearchParams(window.location.search);
        let paramVal = urlParams.get("blog_id");
        if (paramVal) {
            setIsEdit(true);
            if (props.archivedBlogList.length > 0) {
                let editBlog = props.archivedBlogList.find(item => item.id == paramVal);
                setApp(editBlog.category.application.id);
                setCategory(editBlog.category.id);
                setTitle(editBlog.title);
                setUrlSlug(editBlog.url_slug);
                setDuration(editBlog.duration);
                setEditThumbURL(editBlog.thumbnail_image);
                setEditAuthImgURL(editBlog.author_image);
                setAuthor(editBlog.author_name);
                let keywordArr = editBlog.keywords.map((item) => item["keyword"])
                setKeywords(keywordArr);
                setKeywordTxt(keywordArr.toString());
                setBlogContent(editBlog.content);
                setMetaContent({
                    "meta-title": editBlog.meta_title,
                    "meta-desc": editBlog.meta_description,
                    "meta_keyword": editBlog.meta_keyword,
                    "meta_author": editBlog.meta_author,
                });
                setOGContent({
                    "og-title": editBlog.og_title,
                    "og-url": editBlog.og_url,
                    "og-desc": editBlog.og_description,
                    "og-keywords": editBlog.og_keyword,
                });
            }
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(props.newBlog).length > 0) {
            setBlogSuccess(true);
        }
    }, [props.list])

    useEffect(() => {
        if (props.thumbImg !== '') {
            setEditThumbURL(props.thumbImg.temp_url)
        }
    }, [props.thumbImg])

    useEffect(() => {
        if (props.authorImg !== '') {
            setEditAuthImgURL(props.authorImg.temp_url)
        }
    }, [props.authorImg])


    const onFileToUploadClick = (imgType) => {
        document.getElementById(imgType).click();
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAppChange = (event) => {
        setApp(event.target.value);
        if (props.categoryList.length > 0) {
            let categoryArr = props.categoryList.filter((item) => (item.application.id === event.target.value));
            setCategories(categoryArr);
        }
    };

    useEffect(() => {
        if (props.categoryList.length > 0) {
            let categoryArr = props.categoryList.filter((item) => (item.application.id === app));
            setCategories(categoryArr);
        }
    }, [app])

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
            if (isEdit) {
                setUpdateThumbnail(true);
            }
            reader.readAsDataURL(event.target.files[0]);
            props.uploadThumbImg(event.target.files[0]);
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
            if (isEdit) {
                setUpdateAuthorImg(true);
            }
            reader.readAsDataURL(event.target.files[0]);
            props.uploadAuthorImg(event.target.files[0]);
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

    const onChangeEditorContent = (data) => {
        setBlogContent(data);
    }

    const createBlog = () => {
        let payload = {};
        payload["category"] = category;
        payload["title"] = title;
        if (props.thumbImg) {
            payload["thumbnail_image_key"] = props.thumbImg.s3_key;
        }
        payload["duration"] = duration;
        payload["url_slug"] = urlSlug;
        payload["author_name"] = author;
        if (props.thumbImg) {
            payload["author_image_key"] = props.authorImg.s3_key;
        }
        payload["keywords"] = keywords;
        payload["content"] = blogContent;
        payload["meta_title"] = metaContent["meta-title"];
        payload["meta_description"] = metaContent["meta-desc"];
        payload["meta_keyword"] = metaContent["meta-keyword"];
        payload["meta_author"] = metaContent["meta-author"];
        payload["og_title"] = OGContent["og-title"];
        payload["og_url"] = OGContent["og-url"];
        payload["og_keyword"] = OGContent["og-keywords"];
        payload["og_desc"] = OGContent["og-desc"];
        if (props.thumbImg) {
            payload["og_image_key"] = props.thumbImg.s3_key;
        }
        props.createBlog(payload);
    }

    const updateBlog = () => {
        let payload = {};
        payload["category"] = category;
        payload["title"] = title;
        if (updateThumbnail) {
            payload["thumbnail_image_key"] = props.thumbImg.s3_key;
        }
        payload["duration"] = duration;
        payload["url_slug"] = urlSlug;
        payload["author_name"] = author;
        if (updateAuthorImg) {
            payload["author_image_key"] = props.authorImg.s3_key;
        }
        payload["keywords"] = keywords;
        payload["content"] = blogContent;
        payload["meta_title"] = metaContent["meta-title"];
        payload["meta_description"] = metaContent["meta-desc"];
        payload["meta_keyword"] = metaContent["meta-keyword"];
        payload["meta_author"] = metaContent["meta-author"];
        payload["og_title"] = OGContent["og-title"];
        payload["og_url"] = OGContent["og-url"];
        payload["og_keyword"] = OGContent["og-keywords"];
        payload["og_desc"] = OGContent["og-desc"];
        if (props.thumbImg) {
            payload["og_image_key"] = props.thumbImg.s3_key;
        }
        let urlParams = new URLSearchParams(window.location.search);
        let paramVal = urlParams.get("blog_id");
        props.updateBlog(paramVal, payload, props.archivedBlogList);
    }

    const openPreviewDialog = (type) => {
        setOpenDialog(true)
        if (type == 'thumbnail') {
            setPreviewImg(editThumbURL)
        } else {
            setPreviewImg(editAuthImgURL)
        }
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
                                            {apps.length > 0 && apps.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.app_name}</MenuItem>
                                            ))}
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
                                            {categories.length > 0 && categories.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField className={classes.title} variant='outlined' value={title} onChange={handleTitleChange} label="Blog Title">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
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
                                                <Tooltip title="preview"><VisibilityIcon className={classes.prevIcn} onClick={() => { openPreviewDialog('thumbnail') }} /></Tooltip>
                                            </div>
                                            <Input accept="image/*" capture type="file" style={{ display: "none" }} id="thumbnailImage" onChange={onThumbnailChangeHandler} />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <div className={classes.uploadFileName}>{thumbnailFileName}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} onChange={handleUrlSlugChange} value={urlSlug} variant='outlined' label="URL Slug">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2} lg={2}>
                                    <TextField className={classes.title} onChange={handleDurationChange} value={duration} variant='outlined' label="Duration(Mins)">
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField className={classes.title} onChange={handleAuthorChange} value={author} variant='outlined' label="Author">
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
                                        <Tooltip title="preview"><VisibilityIcon className={classes.prevIcn} onClick={() => { openPreviewDialog('author') }} /></Tooltip>
                                    </div>
                                    <Input accept="image/*" capture type="file" style={{ display: "none" }} id="authorImage" onChange={onAuthorImgChangeHandler} />

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
                                    {isEdit ? <TextEditor description={blogContent} onChangeEditorContent={onChangeEditorContent} /> : <CreateEditor description={blogContent} onChangeEditorContent={onChangeEditorContent} />}
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
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-keyword', e) }} value={metaContent["meta-keyword"]} label="meta-keyword (Ex:e-Learning,analytics,alt-text)">
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField className={classes.title} variant='outlined' onChange={(e) => { handleMetaContentChange('meta-author', e) }} value={metaContent["meta-author"]} label="meta-author">
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
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {!isEdit ? <Button variant="contained" color="primary" className={classes.uploadBtn} onClick={() => { createBlog() }}>
                                        Submit
                                    </Button> : <Button variant="contained" color="primary" className={classes.uploadBtn} onClick={() => { updateBlog() }}>
                                            Update
                                    </Button>}
                                </Grid>
                            </Grid>
                            {blogSuccess && !isEdit && <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div style={{ display: 'flex' }}>
                                        <div>Blog Created Successfully</div>
                                        <Button variant="contained" color="primary" className={classes.uploadBtn} onClick={() => { redirectTo('/blog') }}>
                                            View List
                                    </Button>
                                    </div>
                                </Grid>
                            </Grid>}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <Dialog fullWidth={true}
                maxWidth="sm" open={openDialog} onClose={() => { setOpenDialog(false) }}  >
                <Paper elevation={2}>
                    <img src={previewImg} height="400px" width="600px" />
                </Paper>
            </Dialog>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    uploadThumbImg: bindActionCreators(uploadThumbImg, dispatch),
    uploadAuthorImg: bindActionCreators(uploadAuthorImg, dispatch),
    createBlog: bindActionCreators(createBlog, dispatch),
    updateBlog: bindActionCreators(updateBlog, dispatch),
    clearNewBlogObj: bindActionCreators(clearNewBlogObj, dispatch)
})

const mapStateToProps = (state) => {
    const list = state.lists
    return {
        list,
        appsList: list.appsList,
        categoryList: list.categoryList,
        thumbImg: list.thumbImg,
        authorImg: list.authorImg,
        newBlog: list.newBlog,
        archivedBlogList: list.archivedBlogList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
