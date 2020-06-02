import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';


export const login = (payload, successCallBack, failureCallBack) => {
    const url = `${apiConfig.userAuth.loginUrl}`
    axios.post(url, payload)
        .then(function (response) {
            successCallBack(response.data)
        })
        .catch(function (error) {
            //failureCallBack(error)
            successCallBack()
        })
}

export const doTenantLogin = (payload, successCallBack, failureCallBack) => {
    const url = `${apiConfig.userAuth.tenantLoginUrl}`
    axios.post(url, payload)
        .then(function (response) {
            successCallBack(response.data)
        })
        .catch(function (error) {
            failureCallBack(error)
            //successCallBack()
        })
}

