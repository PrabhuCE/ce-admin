import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AthinaLogo from "../../Static/myAthinaLogo.png";
import PrepLogo from "../../Static/preplogo.svg";
import TVlogo from "../../Static/tv_logo.svg";


export default function Tenants(props) {
  const classes = useStyles();
  const [tenants, setTenants] = useState(props.tenants);
  const [selectedTenantId, setSelectedTenantId] = useState("");

  const handleChange = (event) => {
    setSelectedTenantId(event.target.value);
  };

  const proceedToDashboard = () => {
    props.history.push(`/${selectedTenantId}/home`);
  };

  return (
    <div>
      <div>Choose Tenant</div>
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
          onClick={() => {
            proceedToDashboard();
          }}
        >
          Proceed
          </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "100px",
  },
  buttonContainer: {
    marginTop: "1rem",
  },
  button: {
    marginTop: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#4285f4',
    '&:hover': {
      backgroundColor: '#4285f4',
      color: '#fff',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: "-23px",
  },
  progressIcon: {
    paddingLeft: "0.5rem",
  },
  card: {
    maxWidth: 300,
    textAlign: "center",
  },
  form: {
    flexGrow: 1,
  },
  formControl: {
    marginTop: "1rem",
    minWidth: 250,
  },
  buttonWrapper: {
    marginTop: 15,
  },
  cardFrame: {
    display: "flex",
  },
}));
