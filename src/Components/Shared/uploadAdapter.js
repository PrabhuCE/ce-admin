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
            const genericError = `Couldn't upload file: ${file.name}.`
            return axios({
                data,
                method: "POST",
                url: apiConfig.getTables.fetchTableData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    this.loader.uploadTotal = progressEvent.total
                    this.loader.uploaded = progressEvent.loaded
                    const uploadPercentage = parseInt(
                        Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    )
                },
            })
                .then(({ data }) => ({ default: "https://myathina-blog.s3.amazonaws.com/banner/findCourse.png" }))
                //     .catch(({ error }) => Promise.reject(error?.message ?? genericError))
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