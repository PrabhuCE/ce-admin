import axios from "axios";
import { apiConfig } from "../../Configs/apiConfigs";
import { dashboardResults } from "../../MockData/b2b_dashboard_data";

export const fetchDashboardDataBtoB = (
  payload,
  successCallBack,
  failureCallBack
) => {
  const url = `${apiConfig.tenants.getTenants}`;
  axios
    .get(url)
    .then(function (response) {
      successCallBack(response.data);
    })
    .catch(function (error) {
      successCallBack(dashboardResults);
      //failureCallBack(error);
    });
};
