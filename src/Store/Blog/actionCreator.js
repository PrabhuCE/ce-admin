import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';
import Image1 from '../../Static/1.png';
import Image2 from '../../Static/2.png';
import Image3 from '../../Static/3.jpg';
import Image4 from '../../Static/4.png';
import { showAlertMsg } from '../Alert/actionCreator'

const apps = {
    results: [{
        "id": 1,
        "app_name": 'TableVision'
    }, {
        "id": 2,
        "app_name": 'PREP'
    }, {
        "id": 3,
        "app_name": 'MyAthina'
    }
    ]
}



export const getAppsList = () => {
    let url = apiConfig.apps.getAppsList;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {

                dispatch({
                    type: "FETCH_APPS_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                throw (error);
            });
    };
}

export const getArchivedAppsList = () => {
    let url = apiConfig.apps.getAppsList + `?archive=true`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {

                dispatch({
                    type: "FETCH_ARCHIVED_APPS_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                throw (error);
            });
    };
}

export const clearNewBlogObj = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_NEW_BLOG_OBJ",
            payload: {}
        })
    }
}

export const categoryListDataNew = [{
    id: 1,
    name: "TableVision",
    categories: [{
        id: 1,
        categoryTitle: 'Programming',
        slug: 'programming'
    }, {
        id: 2,
        categoryTitle: 'Leadership',
        slug: 'leadership'
    }]
},
{
    id: 2,
    name: "PREP",
    categories: [{
        id: 1,
        categoryTitle: 'Programming',
        slug: 'programming'
    }, {
        id: 2,
        categoryTitle: 'Leadership',
        slug: 'leadership'
    }, {
        id: 3,
        categoryTitle: 'Marketing',
        slug: 'marketing'
    }, {
        id: 4,
        categoryTitle: 'General',
        slug: 'general'
    }, {
        id: 5,
        categoryTitle: 'Computer Science',
        slug: 'computer-science'
    }]
},
{
    id: 3,
    name: "MyAthina",
    categories: [{
        id: 1,
        categoryTitle: 'Programming',
        slug: 'programming'
    }, {
        id: 2,
        categoryTitle: 'Leadership',
        slug: 'leadership'
    }, {
        id: 3,
        categoryTitle: 'Marketing',
        slug: 'marketing'
    }]
}
]

export const categoryListData = {
    results: [{
        id: 1,
        categoryTitle: 'Programming',
        slug: 'programming'
    }, {
        id: 2,
        categoryTitle: 'Leadership',
        slug: 'leadership'
    }, {
        id: 3,
        categoryTitle: 'Marketing',
        slug: 'marketing'
    }, {
        id: 4,
        categoryTitle: 'General',
        slug: 'general'
    }, {
        id: 5,
        categoryTitle: 'Computer Science',
        slug: 'computer-science'
    }
    ]
}

export const resetCreateCategory = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_CREATE_CATEGORY",
            payload: ''
        })
    }
}

export const getCategoryList = (payload) => {
    let url = apiConfig.blog.getCategoryList;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "FETCH_CATEGORY_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                console.log("Error")
            });
    };
}

export const getCategoryListForApp = (payload) => {
    let url = apiConfig.blog.getCategoryList + `?application_id=${payload}`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "FETCH_APP_CATEGORY_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                console.log("Error")
            });
    };
}


export const createApp = (payload, existingList) => {

    let url = apiConfig.apps.createApps;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                existingList.push(data.data);
                dispatch({
                    type: "CREATE_APP_DATA",
                    payload: existingList
                })

            })
            .catch(error => {

            });
    };
}


export const editAppInfo = (payload, existingList) => {

    let url = apiConfig.apps.editAppInfo + `${payload.app_id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    let editPayload = {
        app_name: payload.app_name
    }
    return (dispatch) => {
        return axios.put(url, editPayload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                existingList.find(item => item.id === payload.app_id).app_name = payload.app_name;

                dispatch({
                    type: "EDIT_APP_INFO",
                    payload: existingList
                })

            })
            .catch(error => {

            });
    };
}

export const archiveApp = (payload, archivedList, existingList) => {

    let url = apiConfig.apps.archiveApp + `${payload.app_id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    return (dispatch) => {
        return axios.delete(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let newList = existingList.filter(item => item.id !== payload.app_id);
                let archivedApp = existingList.find(item => item.id === payload.app_id);
                archivedApp.is_active = false;

                archivedList.push(archivedApp);
                let appsObj = {
                    appsList: newList,
                    archivedList: archivedList
                }
                dispatch({
                    type: "ARCHIVE_APP",
                    payload: appsObj
                })

            })
            .catch(error => {

            });
    };
}



export const unArchiveApp = (payload, archivedAppsList, appsList) => {

    let url = apiConfig.apps.unArchiveApp + `${payload.app_id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {

                let newArchivedList = archivedAppsList.filter(item => item.id !== payload.app_id);
                let unArchivedApp = archivedAppsList.find(item => item.id === payload.app_id);
                unArchivedApp.is_active = true;
                appsList.push(unArchivedApp);
                let appsObj = {
                    appsList: appsList,
                    archivedList: newArchivedList
                }
                dispatch({
                    type: "UN_ARCHIVE_APP",
                    payload: appsObj
                })
            })
            .catch(error => {

            });
    };
}

export const postCategoryData = (payload, existingCatList) => {

    let url = apiConfig.blog.createCategory;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                existingCatList.push(data.data);
                dispatch({
                    type: "CREATE_CATEGORY_DATA",
                    payload: existingCatList
                })
                let alert = {
                    message: 'Added category Successfully',
                    type: 'success',
                };

            })
            .catch(error => {

            });
    };
}

export const editCatInfo = (payload, existingCatList) => {
    let url = apiConfig.categories.catURL + `${payload.category.id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    let editPayload = {
        application: payload.application,
        category_name: payload.cat_name
    }
    return (dispatch) => {
        return axios.put(url, editPayload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                existingCatList.find(item => item.id === payload.category.id).category_name = payload.cat_name;
                dispatch({
                    type: "EDIT_CAT_INFO",
                    payload: existingCatList
                })
            })
            .catch(error => {

            });
    };
}

export const archiveCat = (payload, activeCatList, archivedCatList) => {
    let url = apiConfig.categories.catURL + `${payload.cat_id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.delete(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {

                let newList = activeCatList.filter(item => item.id !== payload.cat_id);
                let archivedCat = activeCatList.find(item => item.id === payload.cat_id);
                archivedCat.is_active = false;
                archivedCatList.push(archivedCat);
                let appsObj = {
                    activeCatList: newList,
                    archivedCatList: archivedCatList,
                }
                dispatch({
                    type: "ARCHIVE_CAT",
                    payload: appsObj
                })
            })
            .catch(error => {

            });
    };
}

export const unArchiveCat = (payload, activeCatList, archivedCatList) => {
    console.log("activeCatList", activeCatList);
    console.log("archivedCatList", archivedCatList);

    let url = apiConfig.categories.catURL + `${payload.cat_id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let activeCat = archivedCatList.find(item => item.id == payload.cat_id);
                let newList = archivedCatList.filter(item => item.id !== payload.cat_id);
                let archiveListOfApp = newList.filter(item => item.id == payload.cat_id);
                activeCat.is_active = true;
                activeCatList.push(activeCat);


                let appsObj = {
                    activeCatList: activeCatList,
                    archivedCatList: newList,
                    archCatListForApp: archiveListOfApp
                }
                console.log("test-====", appsObj)
                dispatch({
                    type: "UN_ARCHIVE_CAT",
                    payload: appsObj
                })
            })
            .catch(error => {

            });
    };
}

export const getActiveCategory = (payload) => {
    let url = apiConfig.categories.catURL + `?application_id=${payload}`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "FETCH_ACTIVE_CAT_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
            });
    };
}

export const getAllArchivedCategory = () => {
    let url = apiConfig.categories.catURL + `?archive=true`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {

                dispatch({
                    type: "FETCH_ALL_ARCHIVED_CAT_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
            });
    };
}


export const getArchivedCategory = (payload, archivedList) => {
    let url = apiConfig.categories.catURL + `?archive=true&application_id=${payload}`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let archivedCat = archivedList.filter(item => item.application.id == payload);
                let archivedData = {
                    archivedCat: archivedCat,
                    archivedResults: data.results
                }
                dispatch({
                    type: "FETCH_ARCHIVED_CAT_LIST",
                    payload: archivedData
                })
            })
            .catch(error => {
            });
    };
}

export const uploadThumbImg = (payload) => {
    let url = apiConfig.blog.contImg;
    let header = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    const data = new FormData()
    data.append("file", payload)

    return (dispatch) => {
        return axios.post(url, data, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "THUMB_IMG",
                    payload: data
                })
            })
            .catch(error => {

            });
    };
}

export const uploadAuthorImg = (payload) => {
    let url = apiConfig.blog.contImg;
    let header = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    const data = new FormData()
    data.append("file", payload)

    return (dispatch) => {
        return axios.post(url, data, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "AUTHOR_IMG",
                    payload: data
                })
            })
            .catch(error => {

            });
    };
}


export const validateURLSlug = (payload) => {
    let url = apiConfig.blog.validateSlug;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "VALIDATE_SLUG",
                    payload: data
                })
            })
            .catch(error => {

            });
    };


}

export const createBlog = (payload) => {
    let url = apiConfig.blog.createBlog;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    return (dispatch) => {
        return axios.post(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "CREATE_BLOG",
                    payload: data.data
                })
            })
            .catch(error => {

            });
    };
}


export const blogListData = {
    id: 1,
    banner_img: Image2,
    categoryName: 'Programming',
    results: [{
        id: 1,
        title: "What is Lorem ?",
        slug: "what-is-lorem",
        thumbnail_img: Image4,
        date_posted: "3 Days Ago",
        duration: "3 min Read",
        category: "Programming",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 2,
        title: "What is Lorem Ipsumn1?",
        slug: "what-is-lorem-ipsumn1",
        thumbnail_img: Image2,
        date_posted: "31 Jul",
        duration: "5 min Read",
        category: "Dev Ops",
        category_slug: 'dev-ops',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 3,
        title: "What is Lorem Ipsum and uses",
        slug: "what-is-lorem-ipsum-and-uses",
        thumbnail_img: Image3,
        date_posted: "08 Jun",
        duration: "2 min Read",
        category: "Design",
        category_slug: 'design',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 4,
        title: "What is Lorem Ipsum?",
        slug: "what-is-lorem-ipsum",
        thumbnail_img: Image1,
        date_posted: "03 Nov 18",
        duration: "12 min Read",
        category: "Development",
        category_slug: 'development',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 5,
        title: "What is Lorem Ipsum?",
        slug: "what-is-lorem-ipsum",
        thumbnail_img: Image3,
        date_posted: "03 Nov 18",
        duration: "12 min Read",
        category: "Development",
        category_slug: 'development',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    },
    {
        id: 6,
        title: "What is Lorem Ipsum?",
        slug: "what-is-lorem-ipsum",
        thumbnail_img: Image4,
        date_posted: "03 Nov 18",
        duration: "12 min Read",
        category: "Development",
        category_slug: 'development',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    },
    {
        id: 7,
        title: "What is Lorem Ipsum?",
        slug: "what-is-lorem-ipsum",
        thumbnail_img: Image2,
        date_posted: "03 Nov 18",
        duration: "12 min Read",
        category: "Development",
        category_slug: 'development',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }]
}

export const getBlogListData = (payload, successCB, failureCB) => {
    let url = apiConfig.apps.getBlogListData;
    let paramObj = {
        app_id: payload.appId,
        category_id: payload.categoryId
    }
    axios.get(url, paramObj).then((response) => {
        successCB(response.data)
    }).catch((error) => {
        successCB(blogListData)
        //failureCB(error)
    })
}

export const getActiveBlogsForCategory = (category) => {

    let url = apiConfig.blog.blogListing + `?category_id=${category}`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log("test", data)
                dispatch({
                    type: "ACTIVE_BLOG_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                console.log("Error")
            });
    };

}

export const getArchivedBlogsForCategory = (category) => {

    let url = apiConfig.blog.blogListing + `?archive=true&category_id=${category}`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.get(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: "ARCHIVED_BLOG_LIST",
                    payload: data.results
                })
            })
            .catch(error => {
                console.log("Error")
            });
    };

}


export const archiveBlog = (payload, existingList, archBlogList) => {

    let url = apiConfig.blog.blogListing + `${payload}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    return (dispatch) => {
        return axios.delete(url, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let newList = existingList.filter(item => item.id !== payload);
                let archivedBlog = existingList.find(item => item.id === payload);
                archivedBlog.is_active = false;
                archBlogList.push(archivedBlog);
                let blogObj = {
                    blogList: newList,
                    archivedList: archBlogList
                }
                dispatch({
                    type: "ARCHIVE_BLOG",
                    payload: blogObj
                })

            })
            .catch(error => {

            });
    };
}



export const unArchiveBlog = (payload, existingList, archBlogList) => {

    let url = apiConfig.blog.blogListing + `${payload}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };
    let inp = {}

    return (dispatch) => {
        return axios.post(url, inp, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let newList = archBlogList.filter(item => item.id !== payload);
                let unArchivedBlog = archBlogList.find(item => item.id === payload);
                unArchivedBlog.is_active = true;
                existingList.push(unArchivedBlog);
                let blogObj = {
                    blogList: existingList,
                    archivedList: newList
                }
                dispatch({
                    type: "UNARCHIVE_BLOG",
                    payload: blogObj
                })
            })
            .catch(error => {

            });
    };
}


export const updateBlog = (id, payload, existingList) => {
    let url = apiConfig.blog.createBlog + `${id}/`;
    let header = {
        headers: {
            Authorization: "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
        },
    };

    return (dispatch) => {
        return axios.put(url, payload, header)
            .then(response => {
                return response.data
            })
            .then(data => {
                let newList = existingList.filter(item => item.id !== id);
                newList.push(data.data);

                dispatch({
                    type: "UPDATE_BLOG",
                    payload: newList
                })
            })
            .catch(error => {

            });
    };
}


export const blogListData1 = {
    id: 3,
    banner_img: "test url",
    banner_txt: "Test Data", // Max 200 Chars
    sec_banner: [
        {
            id: 1,
            banner_img: "img url",
            banner_txt: "sec banner text"
        },
        {
            id: 2,
            banner_img: "img url",
            banner_txt: "sec banner text"
        }
    ],
    results: [{
        id: 1,
        title: "Test1",
        slug: "test-1",
        thumbnail_img: Image4,
        date_posted: "3 Days Ago",
        duration: "3 min Read",
        category: "Leadership",
        category_slug: 'leadership',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 2,
        title: "What is Lorem Ipsumn1?",
        slug: "what-is-lorem-ipsumn1",
        thumbnail_img: Image2,
        date_posted: "31 Jul",
        duration: "5 min Read",
        category: "Leadership",
        category_slug: 'leadership',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 3,
        title: "What is Lorem Ipsum and uses",
        slug: "what-is-lorem-ipsum-and-uses",
        thumbnail_img: Image3,
        date_posted: "08 Jun",
        duration: "2 min Read",
        category: "Leadership",
        category_slug: 'leadership',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }, {
        id: 4,
        title: "What is Lorem Ipsum?",
        slug: "what-is-lorem-ipsum",
        thumbnail_img: Image1,
        date_posted: "03 Nov 18",
        duration: "12 min Read",
        category: "Leadership",
        category_slug: 'leadership',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"
    }]
}


export const blogContent = {
    id: 1,
    title: "What is Lorem ? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail_img: Image4,
    date_posted: "3 Aug 2020",
    likes_count: 23,
    duration: "3 min Read",
    category: "Programming",
    content: `<div><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> 
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 
    to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting </p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p></div>`
}

export const blogContent1 = {
    id: 1,
    title: "What is Lorem ? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail_img: Image4,
    date_posted: "3 Aug 2020",
    likes_count: 23,
    duration: 3,
    author_name: "Deepika",
    author_img: Image4,
    category: "Programming",
    keywords: "",
    content: `<div><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> 
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 
    to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p> <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting </p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p><br /><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting </p></div>`,
    meta_content: {
        meta_title: 'test meta title',
        meta_description: 'test meta desc',
        meta_keyword: 'test meta keyword',
        meta_robot: 'test',
        meta_author: 'meta author',
    },
    og_content: {
        og_title: 'og title',
        og_url: 'od url',
        og_description: 'og_description',
        og_keyword: 'keywords',
        og_image: 'og image'
    }
}

export const getBlogContent = (payload, successCB, failureCB) => {
    let url = apiConfig.apps.getBlogContent;
    let paramObj = {
        app_id: payload.appId,
        category_id: payload.categoryId,
        blog_id: payload.blogId
    }
    axios.get(url, paramObj).then((response) => {
        successCB(response.data)
    }).catch((error) => {
        successCB(blogContent1)
        //failureCB(error)
    })
}

export const relatedArticles = {
    results: [{
        id: 1,
        title: "What is Lorem ?",
        thumbnail_img: Image4,
        date_posted: "3 Days Ago",
        duration: "3 min Read"
    }, {
        id: 2,
        title: "What is Lorem Ipsumn1?",
        thumbnail_img: Image2,
        date_posted: "31 Jul",
        duration: "5 min Read"
    }, {
        id: 3,
        title: "What is Lorem Ipsum and uses",
        thumbnail_img: Image3,
        date_posted: "08 Jun",
        duration: "2 min Read"
    }, {
        id: 4,
        title: "What is Lorem Ipsum?",
        thumbnail_img: Image1,
        date_posted: "03 Nov 18",
        duration: "12 min Read"
    }]
}