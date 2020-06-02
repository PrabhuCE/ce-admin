const tenant_domain = 'https://api.prep.continualengine.com/'

export const prep_apiConfig = {
    userAuth: {
        loginUrl: `${tenant_domain}accounts/auth/`,
        tenantLoginUrl: `${tenant_domain}accounts/auth/profile/`
    }
}
