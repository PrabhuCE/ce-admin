import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Grid from "@material-ui/core/Grid";
import TableList from "../Tables";
import Header from "../Header";

import { findRenderedComponentWithType } from "react-dom/test-utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    borderRight: "1px solid #e2e1e1",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Home(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [selComponent, setSelectedComponent] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderComponent = () => {
    if (selComponent === "Dashboard") {
      return null;
    } else if (selComponent === "TableList") {
      return <TableList history={props} />;
    }
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2} style={{ marginTop: "2rem" }}>
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                setSelectedComponent("Dashboard");
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
                setSelectedComponent("TableList");
              }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Tables" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setSelectedComponent("Analytics");
              }}
            >
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10}>
          {renderComponent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
