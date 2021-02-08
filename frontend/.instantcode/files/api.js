import axios from 'axios'

const client = axios.create({})

const apiRequest = async (method, url, request, headers)=>{
    return await client({
        method,
        url : `{{vercelProductionURL}}/${url}`,
        data : request,
        headers
    })
}

const get = async(url, request, headers) => apiRequest("get", url, request, headers)
const post = async(url, request) => apiRequest("post", url, request)
const put = async(url, request) => apiRequest("put", url, request)
const deleteRequest = async(url, request) => apiRequest("delete", url, request)

const API = {
    instance : client,
    get,
    post,
    put,
    delete : deleteRequest
}

export default API