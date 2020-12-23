const initState = {
    appsList: [],
    categoryList: [],
    appsAPIStatus: false,
    newApp: {},
    newCategory: {},
    categoryAPIStatus: false,
    postCategoryAPIStatus: false
}


export const listData = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_APPS_LIST':
            return {
                ...state,

                appsList: action.payload,
                appsAPIStatus: true,
                categoryAPIStatus: false,
                postCategoryAPIStatus: false,

            }
        case 'FETCH_CATEGORY_LIST':
            return {
                ...state,
                categoryList: action.payload,
                appsAPIStatus: false,
                categoryAPIStatus: true,
                postCategoryAPIStatus: false,
            }
        case 'CREATE_APP_DATA':
            return {
                ...state,
                appsList: action.payload,
            }
        case 'EDIT_APP_INFO':
            return {
                ...state,
                appsList: action.payload,
            }
        case 'ARCHIVE_APP':
            return {
                ...state,
                appsList: action.payload,
            }
        case 'UN_ARCHIVE_APP':
            return {
                ...state,
                appsList: action.payload,
            }
        case 'CREATE_CATEGORY_DATA':
            return {
                ...state,
                categoryList: action.payload,
            }
        case 'EDIT_CAT_INFO':
            return {
                ...state,
                categoryList: action.payload,
            }
        case 'ARCHIVE_CAT':
            return {
                ...state,
                categoryList: action.payload,
            }
        case 'UN_ARCHIVE_CAT':
            return {
                ...state,
                categoryList: action.payload,
            }
        case 'RESET_CREATE_CATEGORY':
            return {
                ...state, postCategoryAPIStatus: false,
            }
        default:
            return initState
    }
}



