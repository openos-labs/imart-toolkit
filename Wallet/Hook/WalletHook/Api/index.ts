import axios from "axios";
import Storage from '../../../utils/storage';

const https = axios.create({})
https.interceptors.request.use(
    config => {
        const account = Storage.getLatestAccount();
        if (config.headers) config.headers["Authorization"] = Storage.getJWT(`token:${account}`) || "";
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

https.defaults.baseURL = "/auth";
/**
 * @description:
 * @param {string} publicKey
 * @param {string} address
 * @return {*}
 */

export const getNonce = async (publicKey: string, address: string) => {
    const res = await https.get(
        `/auth/nonce?publicKey=${publicKey}&address=${address}`
    );
    return res.data;
}

export interface Auth {
    chain: string;
    address: string;
    publicKey: string;
    signature: string;
}

export const auth = async (authParams: Auth) => {
    const res = await https.post(`/auth`, authParams);
    return res.data
}


export const isAuth = async (): Promise<boolean> => {
    try {
        const response = await https.get(`/user/isLoggedIn`);
        return response.status == 200 && response.data.isLoggedIn;
    } catch (e) {
        return false;
    }
}
