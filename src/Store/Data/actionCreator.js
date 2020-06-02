import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';

export const getTablesList = (payload, successCallBack, failureCallBack) => {
    const url = `${apiConfig.getTables.fetchTablesList}`
    console.log("url================", url);
    let header = { headers: { 'Authorization': 'Token ' + localStorage.getItem('ce_admin_token') } };
    axios.post(url,
        payload,
        header,
    )
        .then(function (response) {
            successCallBack(response.data)
        })
        .catch(function (error) {
            failureCallBack(error)
            //successCallBack()
        })
}

export const getTableData = (payload, successCallBack, failureCallBack) => {
    const url = `${apiConfig.getTables.fetchTableData}`
    console.log("url================", url);
    let header = { headers: { 'Authorization': 'Token ' + localStorage.getItem('ce_admin_token') } };
    axios.post(url, payload,
        header)
        .then(function (response) {
            successCallBack(response.data)
        })
        .catch(function (error) {
            failureCallBack(error)
            //successCallBack()
        })
}
