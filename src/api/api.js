import axios from "axios";

const instance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:8080/api/`,
});

const apiCall = async (method, url, body) => {
    try {
        const response = await instance({ method, url, data: body });
        return response;
    } catch (e) {
        throw e;
    }
};

const api = (url) => {
    return {
        index: () => apiCall('get', url),
        get: (id) => apiCall('get', `${url}/${id}`),
        post: (body) => apiCall('post', url, body),
        put: (id, body) => apiCall('put', `${url}/${id}`, body),
        delete: (id) => apiCall('delete', `${url}/${id}`)
    };
};

export default api;