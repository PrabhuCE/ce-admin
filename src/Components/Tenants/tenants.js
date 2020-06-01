import React from "react";
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
  const [tenant, setTenant] = React.useState("");
  const [selectedTenantId, setSelectedTenantId] = React.useState("mdb-050520");

  const handleChange = (event) => {
    setTenant(event.target.value);
  };

  const proceedToDashboard = () => {
    props.history.push(`/${selectedTenantId}/home`);
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <br /> <br />
        <div>Choose Tenant</div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Teanant
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={tenant}
            onChange={handleChange}
            label="Tenant"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>AnsrSource-B2B</MenuItem>
            <MenuItem value={2}>Myathina-B2C</MenuItem>
            <MenuItem value={3}>ABC University-B2B</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            onClick={() => {
              proceedToDashboard();
            }}
          >
            Proceed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "100px",
  },
  buttonContainer: {
    marginTop: "1rem",
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
