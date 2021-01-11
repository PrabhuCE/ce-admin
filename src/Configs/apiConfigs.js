import { getProductDomain } from "../Helpers/basics";
import { getCategoryList } from "../Store/Blog/actionCreator";
import { getEnv } from '../Helpers/basics';


const apiDomain = (env) => {
  switch (env) {
    case "prod":
      return "https://api.myathina.com/";
    case "dev":
      return "https://cmns.api.moocpedia.com/";
    default:
      return "https://cmns.api.moocpedia.com/";
  }
};

const base_domain = apiDomain(getEnv());
// console.log("base_domain", base_domain)
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
    blogLoginURL: `${base_domain}user/admin-login/`
  },
  getTables: {
    fetchTablesList: `${product_domain}ceadmin/component/`,
    fetchTableData: `${product_domain}ceadmin/component/data/`,
  },
  tenants: {
    getTenants: `${product_domain}ceadmin/component/tenants/`,
  },
  apps: {
    getAppsList: `${base_domain}blogs/application/`,
    createApps: `${base_domain}blogs/application/`,
    editAppInfo: `${base_domain}blogs/application/`,
    archiveApp: `${base_domain}blogs/application/`,
    unArchiveApp: `${base_domain}blogs/application/`,
  },
  categories: {
    catURL: `${base_domain}blogs/category/`,
  },
  blog: {
    getCategoryList: `${base_domain}blogs/category/`,
    createCategory: `${base_domain}blogs/category/`,
    getBlogListData: `${base_domain}ceadmin/blog/categories`,
    getBlogContent: `${base_domain}ceadmin/blog/categories`,
    contImg: `${base_domain}blogs/multimedia/`,
    createBlog: `${base_domain}blogs/blog/`,
    blogListing: `${base_domain}blogs/blog/`,
    editBlog: `${base_domain}blogs/blog/`,
    validateSlug: `${base_domain}blogs/slug_unique_check/`,
  }
};
