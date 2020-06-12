import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';
import { tenantList } from '../../MockData/tenantInfo';

export const fetchTenantList = (payload, successCallBack, failureCallBack) => {
    const url = `${apiConfig.tenants.getTenants}`
    axios.get(url)
        .then(function (response) {
            successCallBack(response.data)
        })
        .catch(function (error) {
            //failureCallBack(error)
            successCallBack(tenantList)
        })
}