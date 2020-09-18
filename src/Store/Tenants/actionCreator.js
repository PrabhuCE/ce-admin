import axios from "axios";
import { apiConfig } from "../../Configs/apiConfigs";
import { tenantList } from "../../MockData/tenantInfo";

export const fetchTenantList = (payload, successCallBack, failureCallBack) => {
  const url = `${apiConfig.tenants.getTenants}`;
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
    });
};
