import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';

export class UploadAdapter {
    constructor(loader) {
        this.loader = loader
    }

    async upload() {
        return this.loader.file.then((file) => {
            const data = new FormData()
            data.append("file", file)
            data.append("is_public", true)
            const genericError = `Couldn't upload file: ${file.name}.`
            return axios({
                data,
                method: "POST",
                url: apiConfig.blog.contImg,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Token 7bc36ea1f200056971be8d776c8602e31dcb7e05",
                },
                onUploadProgress: (progressEvent) => {
                    this.loader.uploadTotal = progressEvent.total
                    this.loader.uploaded = progressEvent.loaded
                    const uploadPercentage = parseInt(
                        Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    )
                },
            })
                .then(({ data }) =>
                    ({ default: data.temp_url }))
                .catch(({ error }) => ({ default: "https://myathina-blog.s3.amazonaws.com/banner/findCourse.png" }))
        })
    }

    abort() {
        return Promise.reject()
    }
}

export function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
        new UploadAdapter(loader)
}