import React, { useEffect, useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from "@material-ui/core/styles";
import { style } from "../../Styles/theme";
import "./custom.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InfoIcon from "@material-ui/icons/Info";
import { uploadAdapterPlugin } from './uploadAdapter';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
        height: "42px",
        backgroundColor: "#F5F5F5",
        marginBottom: "10px",
    },
    icon: {
        fontSize: 14,
        paddingTop: "0.1rem",
        padding: "0 0.2rem 0 0",
        color: style.fontColour._tory_blue,
    },
    tooltipCntr: {
        float: "right",
        display: "flex",
        padding: "0 0.2rem 0 0",
    },
    tooltip: {
        cursor: "pointer",
        textDecoration: "underline",
        color: style.fontColour._darkBlue,
        fontSize: style.fontSize._smallDesc,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        marginTop: "-24px",
        color: "black",
    },
    iconWrapper: {
        marginTop: "-24px",
    },
    buttonWrapper: {
        float: "right",
    },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function TextEditorClassic(props) {
    const classes = useStyles();
    const [defaultData, setDefaultData] = useState(props.description);
    const [openDialog, setOpenDialog] = useState(false);
    const [previewDialog, setPreviewDialog] = useState(false);

    useEffect(() => {
        let data = props.description ? props.description : "";
        setDefaultData(data);
    }, [props]);

    const onChangeData = (data) => {
        setDefaultData(data);
    };
    const previewContent = () => {
        setPreviewDialog(true);
    };

    const handleDialogClose = () => {
        setPreviewDialog(false);
    };

    const changeTextEditorView = () => {
        setOpenDialog(true);
    };
    const closeTextEditorView = () => {
        setOpenDialog(false);
    };

    const textEditor = () => {

        return (
            <div className="App">
                <CKEditor
                    editor={ClassicEditor}
                    data={defaultData}
                    onInit={(editor) => {
                        editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
                        uploadAdapterPlugin(editor)
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChangeData(data);
                        // props.onChangeEditorContent(data);
                    }}
                    config={{
                        fontColor: {
                            colors: [
                                {
                                    color: "rgb(0, 0, 0)",
                                    label: "Black",
                                },
                                {
                                    color: "rgb(77, 77, 77)",
                                    label: "Dim grey",
                                },
                                {
                                    color: "rgb(153, 153, 153)",
                                    label: "Grey",
                                },
                                {
                                    color: "rgb(230, 230, 230)",
                                    label: "Light grey",
                                },
                                {
                                    color: "rgb(255, 255, 255)",
                                    label: "White",
                                    hasBorder: true,
                                },
                                {
                                    color: "rgb(255, 0, 0)",
                                    label: "Red",
                                },
                                {
                                    color: "rgb(255, 102, 0)",
                                    label: "Orange",
                                },
                                {
                                    color: "rgb(255, 255, 0)",
                                    label: "Yellow",
                                },
                                {
                                    color: "rgb(102, 255, 51)",
                                    label: "Light green",
                                },
                                {
                                    color: "rgb(0, 153, 0)",
                                    label: "Green",
                                },
                                {
                                    color: "rgb(0, 0, 255)",
                                    label: "Blue",
                                },
                            ],
                        },
                        fontBackgroundColor: {
                            colors: [
                                {
                                    color: "rgb(0, 0, 0)",
                                    label: "Black",
                                },
                                {
                                    color: "rgb(77, 77, 77)",
                                    label: "Dim grey",
                                },
                                {
                                    color: "rgb(153, 153, 153)",
                                    label: "Grey",
                                },
                                {
                                    color: "rgb(230, 230, 230)",
                                    label: "Light grey",
                                },
                                {
                                    color: "rgb(255, 255, 255)",
                                    label: "White",
                                    hasBorder: true,
                                },
                                {
                                    color: "rgb(255, 0, 0)",
                                    label: "Red",
                                },
                                {
                                    color: "rgb(255, 102, 0)",
                                    label: "Orange",
                                },
                                {
                                    color: "rgb(255, 255, 0)",
                                    label: "Yellow",
                                },
                                {
                                    color: "rgb(102, 255, 51)",
                                    label: "Light green",
                                },
                                {
                                    color: "rgb(0, 153, 0)",
                                    label: "Green",
                                },
                                {
                                    color: "rgb(0, 0, 255)",
                                    label: "Blue",
                                },
                            ],
                        },
                        toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "blockQuote",
                            "underline",
                            "link",
                            "fontSize",
                            "fontColor",
                            "fontBackgroundColor",
                            "numberedList",
                            "bulletedList",
                            "imageUpload",
                            "imageStyle:full",
                            "imageStyle:side",
                            "mediaEmbed",
                            "undo",
                            "redo",
                        ],
                    }}

                />
            </div>
        );
    }

    return (
        <div>
            <React.Fragment>
                <Dialog id="popupEditor" fullScreen open={openDialog} onClose={closeTextEditorView} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Description
                            </Typography>
                            <IconButton edge="start" className={classes.iconWrapper} onClick={closeTextEditorView} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div>{textEditor()}</div>
                </Dialog>
            </React.Fragment>
            {textEditor()}
            <div className={classes.tooltipCntr}>
                <IconButton onClick={previewContent}>
                    <VisibilityIcon className={classes.icon} />
                    <div className={classes.tooltip}>Preview</div>
                </IconButton>
            </div>
            <div className={classes.tooltipCntr}>
                <IconButton onClick={changeTextEditorView}>
                    <InfoIcon className={classes.icon} />
                    <div className={classes.tooltip}>Expand Editor</div>
                </IconButton>
            </div>
            <Dialog fullWidth={true} maxWidth="lg" open={previewDialog} onClose={handleDialogClose} aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Assignment Description</DialogTitle>
                <Divider />
                <DialogContent>
                    {defaultData && defaultData.length > 0 ? (
                        <div className={classes.previewDesc} dangerouslySetInnerHTML={{ __html: defaultData }} />
                    ) : (
                            <div> Please add some content to preview. </div>
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
