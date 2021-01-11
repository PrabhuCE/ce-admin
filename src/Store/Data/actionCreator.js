import axios from "axios";
import { apiConfig } from "../../Configs/apiConfigs";

const prep_domain = "https://api.prep.continualengine.com/";
const tv_domain = "https://api.tablevision.ai/";
const myathina_domain = "https://api.myathina.com/";
const invicta_domain = "https://invictaapi.continualengine.com/";


let product_domain = "";
const product = localStorage.getItem("product");
switch (product) {
  case "PREP":
    console.log("Inside Prep");
    product_domain = prep_domain;
    break;
  case "MyAthina":
    console.log("Inside MA");
    product_domain = myathina_domain;
    break;
  case "TableVision":
    console.log("Inside TV");
    product_domain = tv_domain;
    break;
  case "Invicta":
    product_domain = invicta_domain;
    break;
  default:
    console.log("Inside Def");
    product_domain = "";
}


export const getTablesList = (payload, successCallBack, failureCallBack) => {
  const url = `${apiConfig.getTables.fetchTablesList}`;
  let header = {
    headers: {
      Authorization: "Token " + localStorage.getItem("ce_admin_token"),
    },
  };
  axios
    .post(url, payload, header)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
      //successCallBack()
    });
};

export const getTableData = (payload, successCallBack, failureCallBack) => {
  const url = `${apiConfig.getTables.fetchTableData}`;
  let header = {
    headers: {
      Authorization: "Token " + localStorage.getItem("ce_admin_token"),
    },
  };
  axios
    .post(url, payload, header)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
      //successCallBack()
    });
};


export const postFile = (payload, successCallBack, failureCallBack) => {

  const url = `${product_domain + payload.apiEP}`;
  let header = {
    headers: {
      Authorization: "Token " + localStorage.getItem("ce_admin_token"),
    },
  };
  const data = new FormData()
  data.append("file", payload.file)
  data.append("table_code", payload.table_code);
  data.append("tenant_id", payload.tenant_id);

  axios
    .post(url, data, header)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      failureCallBack(error);
    });
};

