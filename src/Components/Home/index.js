import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../Header";
import { getTablesList, getTableData } from '../../Store/Data/actionCreator';

export default function Home(props) {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTable, setSelectedTable] = useState();
  const [tablesList, setTablesList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columnsList, setColumnsList] = useState([]);
  const [page, setPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log(props.match);
    fetchTableList();
  }, [])

  const fetchTableList = () => {
    let payload = {
      product: localStorage.getItem('product'),
      tenant_id: props.match.params.tenantId
    }
    getTablesList(payload, successCB, failureCB)
  }

  const successCB = (res) => {
    setTablesList(res.results)
  }

  const failureCB = (error) => {

  }

  const fetchTableData = (item) => {


    let payload = {
      table_id: item,
      tenant_id: props.match.params.tenantId
    }
    getTableData(payload, successCallBack, failureCallBack)
  }

  const successCallBack = (res) => {
    setTableData(res.results.data)
    setColumnsList(res.results.column_list)
  }

  const failureCallBack = (error) => {

  }


  const renderTable = () => {
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                {columnsList.length > 0 && columnsList.map((item, index) => (
                  <TableCell align="center">{item.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {columnsList.length > 0 && columnsList.map((cell, index) => (
                    <TableCell align="center">{row[cell.col_name]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={tableData.length}
          rowsPerPage={10}
          page={page}
        // onChangePage={handleChangePage}
        />
      </React.Fragment>
    );
  };

  return (
    <div className={classes.appsContainer}>
      <Header />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Paper>
            {tablesList.length > 0 ?
              <React.Fragment>
                <div>Table List </div>
                <List component="nav" aria-label="main mailbox folders">
                  {tablesList.map((item, index) => {
                    return (
                      <ListItem key={index} button onClick={() => { fetchTableData(item.code) }}>
                        <ListItemText primary={item.table_name} />
                      </ListItem>
                    );
                  })}
                </List>
                <Divider /> </React.Fragment> : <div>No Data to Display</div>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10}>
          {renderTable()}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  appsContainer: {
    marginTop: "4rem",
  },
  thead: {
    background: "#ebebeb",
  },
}));
