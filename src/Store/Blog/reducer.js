const initState = {
    appsList: [],
    categoryList: [],
    appsAPIStatus: false,
    newCategory: [],
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
        case 'CREATE_CATEGORY_DATA':
            return {
                ...state,
                newCategory: action.payload,
                //appsAPIStatus: false,
                categoryAPIStatus: false,
                postCategoryAPIStatus: true,
            }
        case 'RESET_CREATE_CATEGORY':
            return {
                ...state, postCategoryAPIStatus: false,
            }
        default:
            return initState
    }
}



