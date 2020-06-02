const jwt = require("jsonwebtoken");


const prep_domain = 'https://api.prep.continualengine.com/'
const tv_domain = 'https://api.tablevision.ai/'
const myathina_domain = 'https://api.myathina.com/'

export const parseIDToken = (idToken) => {
    const parsedIDToken = parseJwt(idToken);
    let displayName = parsedIDToken.email.split("@")[0];
    if (parsedIDToken.firstName) {
        displayName = parsedIDToken.firstName;
    }
    if (parsedIDToken.given_name) {
        displayName = parsedIDToken.given_name;
        displayName = parsedIDToken.family_name
            ? `${displayName} ${parsedIDToken.family_name}`
            : displayName;
    }
    return {
        isSignedIn: true,
        userName: parsedIDToken.email,
        email: parsedIDToken.email,
        displayName: displayName,
        firstName: parsedIDToken.given_name
            ? parsedIDToken.given_name
            : parsedIDToken.firstName,
        lastName: parsedIDToken.family_name
            ? parsedIDToken.family_name
            : parsedIDToken.lastName,
        ref: parsedIDToken.ref,
    };
};


export const getLoggedInStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    else {
        return false;
    }
}



export const getProductSelectionStatus = () => {
    const product = localStorage.getItem('product');
    if (product) {
        return true;
    }
    else {
        return false;
    }
}

export const getProductDomain = () => {
    let product_domain = '';
    const product = localStorage.getItem('product');
    console.log("Product", product)

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
    console.log("rpo", product_domain)
    return product_domain;
}


export function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

export const getEnv = () => {
    switch (window.location.origin) {
        case "http://localhost:3000":
            return "dev";
        default:
            return "dev";
    }
};

export const bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

export const openInNewTab = (url = "/") => {
    const win = window.open(url, "_blank");
    win.focus();
};

export const redirectTo = (url = "/", newTab) => {
    if (newTab) {
        openInNewTab(url);
    } else {
        window.location = url;
    }
};

export const generateJwtToken = (obj) => {
    return jwt.sign(obj, "shhhhh");
};
