import axios, { AxiosInstance } from 'axios'


const instance: AxiosInstance = axios.create({
    baseURL:"https://dev.to/api",
})

export const getArticlesPagination = (page: number) => {
    return instance.get('articles', {
        params: {
            page,
            per_page: 8,
            top: 7,
        }
    })
}
