const initState = {
    appsList: [],
    archivedAppsList: [],
    categoryList: [],
    activeCatList: [],
    archivedCatList: [],
    archivedCatListForApp: [],
    newApp: {},
    newCategory: {},
    thumbImg: '',
    authorImg: '',
    newBlog: {},
    activeBlogList: [],
    archivedBlogList: [],
    isBlogUpdated: false,
    appsAPIStatus: false,
    categoryAPIStatus: false,
    postCategoryAPIStatus: false,
    isSlugUnique: null
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
                archivedCatListForApp: []

            }
        case 'FETCH_CATEGORY_LIST':
            return {
                ...state,
                categoryList: action.payload,
                appsAPIStatus: false,
                categoryAPIStatus: true,
                postCategoryAPIStatus: false,
                archivedCatListForApp: []
            }
        case 'FETCH_ARCHIVED_APPS_LIST':
            return {
                ...state,
                archivedAppsList: action.payload,
            }
        case 'CREATE_APP_DATA':
            return {
                ...state,
                appsList: action.payload,
            }
        case 'EDIT_APP_INFO':
            return {
                ...state,
                archivedAppsList: action.payload,
            }
        case 'ARCHIVE_APP':
            return {
                ...state,
                appsList: action.payload.appsList,
                archivedAppsList: action.payload.archivedList,
            }
        case 'UN_ARCHIVE_APP':
            return {
                ...state,
                appsList: action.payload.appsList,
                archivedAppsList: action.payload.archivedList,
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
                activeCatList: action.payload.activeCatList,
                archivedCatList: action.payload.archivedCatList,
            }
        case 'UN_ARCHIVE_CAT':
            return {
                ...state,
                activeCatList: action.payload.activeCatList,
                archivedCatList: action.payload.archivedCatList,
                archivedCatListForApp: action.payload.archCatListForApp
            }
        case 'FETCH_ARCHIVED_CAT_LIST':
            return {
                ...state,
                //archivedCatList: action.payload.archivedCat,
                archivedCatListForApp: action.payload.archivedResults
            }
        case 'FETCH_ALL_ARCHIVED_CAT_LIST':
            return {
                ...state,
                archivedCatList: action.payload,
            }
        case 'FETCH_ACTIVE_CAT_LIST':
            return {
                ...state,
                activeCatList: action.payload,
            }
        case 'THUMB_IMG':
            return {
                ...state,
                thumbImg: action.payload,
            }
        case 'AUTHOR_IMG':
            return {
                ...state,
                authorImg: action.payload,
            }
        case 'CREATE_BLOG':
            return {
                ...state,
                newBlog: action.payload,
            }
        case 'CLEAR_NEW_BLOG_OBJ':
            return {
                ...state,
                newBlog: {},
                thumbImg: '',
                authorImg: '',
                isBlogUpdated: false,
                isSlugUnique: null
            }
        case 'ACTIVE_BLOG_LIST':
            return {
                ...state,
                activeBlogList: action.payload,
            }
        case 'ARCHIVED_BLOG_LIST':
            return {
                ...state,
                archivedBlogList: action.payload,
            }
        case 'ARCHIVE_BLOG':
            return {
                ...state,
                activeBlogList: action.payload.blogList,
                archivedBlogList: action.payload.archivedList
            }
        case 'UNARCHIVE_BLOG':
            return {
                ...state,
                activeBlogList: action.payload.blogList,
                archivedBlogList: action.payload.archivedList
            }
        case 'UPDATE_BLOG':
            return {
                ...state,
                archivedBlogList: action.payload,
                isBlogUpdated: true
            }
        case 'VALIDATE_SLUG':
            return {
                ...state,
                isSlugUnique: action.payload.is_unique
            }
        case 'RESET_CREATE_CATEGORY':
            return {
                ...state, postCategoryAPIStatus: false,
            }
        default:
            return initState
    }
}



