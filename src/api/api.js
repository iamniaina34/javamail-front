import axios from "axios"

const instance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:8080/api/`,
})

const api = (url) => {
    return {
        index: async () => {
            try {
                const r = await instance.get(url)
                return r
            }
            catch (e) {
                throw e
            }
        },
        get: async (id) => {
            try {
                const r = await instance.get(`${url}/${id}`)
                return r
            } catch (e) {
                throw e
            }
        },
        post: async (body = {}) => {
            try {
                const r = await instance.post(`${url}`, body)
                return r
            } catch (e) {
                throw e
            }
        },
        put: async (id, body = {}) => {
            try {
                const r = await instance.put(`${url}/${id}`, body)
                return r
            } catch (e) {
                throw e
            }
        },
        delete: async (id) => {
            try {
                const r = await instance.delete(`${url}/${id}`)
                return r
            } catch (e) {
                throw e
            }
        },
    }
}

export default api