import React from "react";
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
import { tables, table_data, table_data1 } from "../../MockData/tables";

export default function Home(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const renderTable = () => {
    let header = Object.keys(table_data1[0]);
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                {header.map((item, index) => (
                  <TableCell align="center">{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {table_data1.map((row, index) => (
                <TableRow key={index}>
                  {header.map((cell, index) => (
                    <TableCell align="center">{row[cell]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={table_data1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          // onChangePage={handleChangePage}
          // onChangeRowsPerPage={handleChangeRowsPerPage}
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
            <div>Select to Overview</div>
            <List component="nav" aria-label="main mailbox folders">
              {tables.map((item, index) => {
                return (
                  <ListItem key={index} button>
                    <ListItemText primary={item.table_name} />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
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
