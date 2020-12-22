import { getProductDomain } from "../Helpers/basics";
import { getCategoryList } from "../Store/Blog/actionCreator";

const base_domain = "https://cmns.api.moocpedia.com/";

const prep_domain = "https://api.prep.continualengine.com/";
const tv_domain = "https://api.tablevision.ai/";
const myathina_domain = "https://api.myathina.com/";
const invicta_domain = "https://invictaapi.continualengine.com/";

//localstorage tenant name, update on switch, importing folder path should vary acoordingly

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

export const apiConfig = {
  userAuth: {
    loginUrl: `${base_domain}accounts/auth/`,
    tenantLoginUrl: `${product_domain}user/admin-login/`,
  },
  getTables: {
    fetchTablesList: `${product_domain}ceadmin/component/`,
    fetchTableData: `${product_domain}ceadmin/component/data/`,
  },
  tenants: {
    getTenants: `${product_domain}ceadmin/component/tenants/`,
  },
  apps: {
    getAppsList: `${base_domain}blogs/application/`
  },
  blog: {
    getCategoryList: `${base_domain}blogs/category/`,
    createCategory: `${base_domain}blogs/category/`,
    getBlogListData: `${base_domain}ceadmin/blog/categories`,
    getBlogContent: `${base_domain}ceadmin/blog/categories`
  }
};