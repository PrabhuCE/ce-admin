import axios from 'axios';
import { apiConfig } from '../../Configs/apiConfigs';


// GET Storage Details
// IP Payload :  tenant_id, from_date, to_date, default to current month.

export const storageRecs = {
    starts_date: '',
    ends_date: '',
    pricing_blocks: [
        {
            content_type: 'Data Utilization',
            sub_header: "Database Memory",
            file_count: 322,
            consumed_space: 10.5,
            consumed_unit: 'GB',
        },
        {
            content_type: 'Videos',
            sub_header: "Course Video, Recorded Classes, etc.",
            file_count: 65,
            allocated_space: 20,
            allocated_unit: 'GB',
            consumed_space: 10.5,
            consumed_unit: 'GB'

        },
        {
            content_type: 'File Uploads',
            sub_header: "Files,Training Docs,Reading Materials, etc.",
            file_count: 132,
            allocated_space: 20,
            allocated_unit: 'GB',
            consumed_space: 15,
            consumed_unit: 'GB'
        },
        {
            content_type: 'Downloads',
            sub_header: "Approval Reports, Policy Docs, etc",
            file_count: 322,
            consumed_space: 10.5,
            consumed_unit: 'GB',
            data: [{ label: "January", value: 40 }, { label: "February", value: 132 }, { label: "March", value: 0 },
            { label: "January", value: 40 },
            { label: "February", value: 132 },
            { label: "March", value: 0 },
            { label: "April", value: 46 }]
        }
    ]
}


export const getStorageDetails = (payload, successCB, failureCB) => {

    const url = `${apiConfig.billing.getStorageData}`;
    axios.get(url, { params: payload })
        .then(function (response) {
            successCB(response.data)
        })
        .catch(function (error) {
            successCB(storageRecs)
        })

}







