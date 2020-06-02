import { getProductDomain } from '../Helpers/basics'

const base_domain = 'https://cmns.api.moocpedia.com/'

const prep_domain = 'https://api.prep.continualengine.com/'
const tv_domain = 'https://api.tablevision.ai/'
const myathina_domain = 'https://api.myathina.com/'

//localstorage tenant name, update on switch, importing folder path should vary acoordingly

let product_domain = '';
const product = localStorage.getItem('product');
switch (product) {
    case 'PREP':
        console.log("Inside Prep")
        product_domain = prep_domain;
        break;
    case 'MyAthina':
        console.log("Inside MA")
        product_domain = myathina_domain;
        break;
    case 'TableVision':
        console.log("Inside TV")
        product_domain = tv_domain;
        break;
    default:
        console.log("Inside Def")
        product_domain = ''
}


export const apiConfig = {
    userAuth: {
        loginUrl: `${base_domain}accounts/auth/`,
        tenantLoginUrl: `${product_domain}user/admin-login/`
    },
    getTables: {
        fetchTablesList: `${product_domain}ceadmin/component/`,
        fetchTableData: `${product_domain}ceadmin/component/data/`
    }
}
