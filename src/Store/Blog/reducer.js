const initState = {
    appsList: [],
    archivedAppsList: [],
    categoryList: [],
    activeCatList: [],
    archivedCatList: [],
    newApp: {},
    newCategory: {},
    thumbImg: '',
    authorImg: '',
    newBlog: {},
    activeBlogList: [],
    archivedBlogList: [],
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
                appsList: action.payload,
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
            }
        case 'FETCH_ARCHIVED_CAT_LIST':
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
                authorImg: ''
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
                archivedBlogList: action.payload
            }
        case 'RESET_CREATE_CATEGORY':
            return {
                ...state, postCategoryAPIStatus: false,
            }
        default:
            return initState
    }
}



