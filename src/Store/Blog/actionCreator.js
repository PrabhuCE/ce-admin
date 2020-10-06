import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';
import Image1 from '../../Static/1.png';
import Image2 from '../../Static/2.png';
import Image3 from '../../Static/3.jpg';
import Image4 from '../../Static/4.png';

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

export const getAppsList = (successCB, failureCB) => {

    let url = apiConfig.apps.getAppsList;

    axios.get(url).then((response) => {
        successCB(response.data)
    }).catch((error) => {
        successCB(apps)
        //failureCB(error)
    })

}

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

export const getCategoryList = (payload, successCB, failureCB) => {
    let url = apiConfig.apps.getCategoryList;
    let paramObj = {
        app_id: payload.appId
    }
    axios.get(url, paramObj).then((response) => {
        successCB(response.data)
    }).catch((error) => {
        successCB(categoryListData)
        //failureCB(error)
    })
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