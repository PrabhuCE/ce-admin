import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { fetchTenantList } from "../../Store/Tenants/actionCreator";

export default function MyAthinaBilling(props) {
    const classes = useStyles();
    const [tenants, setTenants] = useState([]);
    const [selectedTenantId, setSelectedTenantId] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("Dashboard");

    const handleChange = (event) => {
        setSelectedTenantId(event.target.value);
    };

    useEffect(() => {
        let payload = {
            product: localStorage.getItem("product"),
        };
        fetchTenantList(payload, successTenantsCallBack, failureTenantsCallBack);
    }, [])

    const successTenantsCallBack = (res) => {
        setTenants(res.results);
    };

    const failureTenantsCallBack = (error) => { };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={classes.selCtr}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">
                                Tenant
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={selectedTenantId}
                                onChange={handleChange}
                                label="Tenant"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {tenants.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.tenant_id}>{item.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <div className={classes.buttonContainer}>
                            <Button
                                variant="outlined"
                                className={classes.button}
                                color="primary"
                            >
                                Proceed
                        </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: "2rem" }}>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >
                        <ListItem
                            button
                            onClick={() => {
                                setSelectedMenu("Dashboard");
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setSelectedMenu("Storage");
                            }}
                        >
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Storage" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setSelectedMenu("Users");
                            }}
                        >
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={10}>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme) => ({
    selCtr: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        margin: "0.5rem"
    },
    button: {
        backgroundColor: '#4285f4',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#4285f4',
            color: '#fff',
        },
    },
    form: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 250,
    },

}));
