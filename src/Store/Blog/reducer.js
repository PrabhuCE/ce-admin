const initState = {
    appsList: [],
    categoryList: [],
    appsAPIStatus: false,
    categoryAPIStatus: false,
    postCategoryAPIStatus: false
}


export const listData = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_APPS_LIST':
            return {
                ...state,
                appsList: action.payload,
                appsAPIStatus: true
            }
        case 'FETCH_CATEGORY_LIST':
            return {
                ...state,
                categoryAPIStatus: true,
                categoryList: action.payload
            }
        case 'CREATE_CATEGORY_DATA':
            let categories = state.categoryList.push(action.payload);
            return {
                ...state,
                postCategoryAPIStatus: true,
                categoryList: categories
            }
        default:
            return initState
    }
}



