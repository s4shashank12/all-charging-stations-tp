import axios, { AxiosInstance } from "axios";

export class RestClientBuilder {
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create();
    }

    static instance(): RestClientBuilder {
        return new RestClientBuilder()
    }

    withBaseUrl(baseUrl: string): RestClientBuilder {
        this.axiosInstance.defaults.baseURL = baseUrl;
        return this
    }

    withHeader(key: string, value: string): RestClientBuilder {
        this.axiosInstance.defaults.headers.common = { ...{ [key]: value } }
        return this
    }

    withHeaders(headers: any): RestClientBuilder {
        this.axiosInstance.defaults.headers.common = { ...headers }
        return this
    }

    build(): RestClient {
        let record = {
            'Content-Type': 'application/json'
        }
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...record
        }
        return new RestClient(this.axiosInstance);
    }
}

class RestClient {
    private axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        try {
            console.debug(`OUT|GET|HEADERS:${JSON.stringify(this.axios.defaults.headers)}|ENPOINT:${this.axios.defaults.baseURL}${endpoint}|BODY:${JSON.stringify(params)}`)
            const response = await this.axios.get<T>(endpoint, { params: params });
            return response.data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async post<T>(endpoint: string, data: any = {}, params: Record<string, any> = {}): Promise<T> {
        try {
            console.debug(`OUT|POST|HEADERS:${JSON.stringify(this.axios.defaults.headers)}|ENPOINT:${this.axios.defaults.baseURL}${endpoint}|BODY:${JSON.stringify(data)}`)
            const response = await this.axios.post<T>(endpoint, data, { params: params });
            return response.data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

}