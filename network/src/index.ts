import {Storage} from './utils'
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";


export default class Axios {
    constructor() {
    }

    static create(config?: AxiosRequestConfig): AxiosInstance {
        const Axios = axios.create(config)
        Axios.interceptors.request.use(
            config => {
                const account = Storage.getLatestAccount();
                if (config.headers) config.headers["Authorization"] = Storage.getJWT(`token:${account}`) || "";
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        return Axios
    }
}

