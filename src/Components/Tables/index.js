import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Table from "@material-ui/core/Table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../Header";
import { MA1_table_info } from "../../MockData/tables";
import { fetchTenantList } from "../../Store/Tenants/actionCreator";
import { getTablesList, getTableData } from "../../Store/Data/actionCreator";

export default function Tables(props) {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTable, setSelectedTable] = useState();
  const [tablesList, setTablesList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columnsList, setColumnsList] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalRecCount, setTotalRecCount] = useState(0);
  const [tableCode, setTableCode] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [tenantsList, setTenantsList] = useState([]);

  const [selectedTenantId, setSelectedTenantId] = useState(
    props.history.match.params.tenantId
  );

  const handleTenantChange = (event) => {
    setSelectedTenantId(event.target.value);
    fetchTableList();
    setSelectedItem("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let l = newPage * rowsPerPage;
    setOffset(l);
    fetchTableData(tableCode, l);
  };

  useEffect(() => {
    fetchTableList();
    getTenantList();
  }, []);

  const getTenantList = () => {
    let payload = {
      product: localStorage.getItem("product"),
    };
    fetchTenantList(payload, successTenantsCallBack, failureTenantsCallBack);
  };

  const successTenantsCallBack = (res) => {
    setTenantsList(res.tenants);
  };

  const failureTenantsCallBack = (error) => {};

  const fetchTableList = () => {
    let payload = {
      product: localStorage.getItem("product"),
      tenant_id: selectedTenantId,
    };
    getTablesList(payload, successCB, failureCB);
  };

  const renderTableCell = (cell, row) => {
    switch (cell.col_type) {
      case "file":
        return (
          <TableCell align="center">
            <a href={row[cell.col_name]} target="_blank">
              <CloudDownloadIcon className={classes.downloadIcon} />
            </a>
          </TableCell>
        );
      case "image":
        return (
          <TableCell align="center">
            <ImageIcon
              className={classes.downloadIcon}
              onClick={() => {
                displayImgDialog(row[cell.col_name]);
              }}
            />
          </TableCell>
        );
      case "hyperlink":
        return (
          <TableCell align="center">
            <a href={row[cell.col_name]} target="_blank">
              <CloudDownloadIcon className={classes.downloadIcon} />
            </a>
          </TableCell>
        );
      default:
        return <TableCell>{row[cell.col_name]}</TableCell>;
    }
  };

  const successCB = (res) => {
    setTablesList(res.results);
  };

  const failureCB = (error) => {};

  const handleTableClick = (code) => {
    setTableCode(code);
    setPage(0);
    setOffset(0);
    fetchTableData(code, 0);
  };

  const fetchTableData = (code, offsetVal) => {
    let payload = {
      table_id: code,
      tenant_id: selectedTenantId,
      offset: offsetVal,
      limit: 10,
    };
    getTableData(payload, successCallBack, failureCallBack);
  };

  const successCallBack = (res) => {
    setTableData(res.results.data);
    setTotalRecCount(res.results.total_count);
    setColumnsList(res.results.column_list);
  };

  const failureCallBack = (error) => {};

  const displayImgDialog = (image) => {
    setDisplayImage(image);
    setOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
    setTableCode(event.target.value);
    setPage(0);
    setOffset(0);
    fetchTableData(event.target.value, 0);
  };

  const renderTable = () => {
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                {columnsList.length > 0 &&
                  columnsList.map((item, index) => (
                    <TableCell key={index}>{item.label}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 &&
                tableData.map((row, index) => (
                  <TableRow key={index}>
                    {columnsList.length > 0 &&
                      columnsList.map((cell, index) => (
                        <React.Fragment key={index}>
                          {renderTableCell(cell, row)}
                        </React.Fragment>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {tableData.length > 0 && (
          <TablePagination
            component="div"
            count={totalRecCount}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={classes.appsContainer}>
      <Header />
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Tenant
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedTenantId}
              onChange={handleTenantChange}
              label="Tenant"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tenantsList &&
                tenantsList.length > 0 &&
                tenantsList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.tenant_id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Tables
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedItem}
              onChange={handleSelectChange}
              label="Tables"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tablesList.map((item, index) => {
                return <MenuItem value={item.code}>{item.table_name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {/* <Grid item xs={12} sm={12} md={2} lg={2}>

          <Paper>
            {tablesList.length > 0 ?
              <React.Fragment>
                <List component="nav" aria-label="main mailbox folders">
                  {tablesList.map((item, index) => {
                    return (
                      <ListItem key={index} className={tableCode === item.code ? classes.activeTablesList : classes.tablesList} button onClick={() => { handleTableClick(item.code) }}>
                        <ListItemText primary={item.table_name} />
                      </ListItem>
                    );
                  })}
                </List>
                <Divider /> </React.Fragment> : <div>No Data to Display</div>}
          </Paper>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {tableData.length > 0 && renderTable()}
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Image</DialogTitle>
        <DialogContent>
          <img src={displayImage} height="320px" width="540px" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  appsContainer: {
    marginTop: "3rem",
  },
  downloadIcon: {
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  thead: {
    background: "#ebebeb",
  },
  activeTablesList: {
    backgroundColor: "#f0f8fe",
  },
}));
