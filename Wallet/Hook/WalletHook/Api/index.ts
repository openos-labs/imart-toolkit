import axios from "axios";
import Storage from '../../../utils/storage';

axios.interceptors.request.use(
    config => {
        const account = Storage.getLatestAccount();
        config.headers["Authorization"] = Storage.getJWT(`token:${account}`) || "";
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = "/auth";
/**
 * @description:
 * @param {string} publicKey
 * @param {string} address
 * @return {*}
 */

export const getNonce = async (publicKey: string, address: string) => {
    const res = await axios.get(
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
    const res = await axios.post(`/auth`, authParams);
    return res.data
}


export const isAuth = async (): Promise<boolean> => {
    try {
        const response = await axios.get(`/user/isLoggedIn`);
        return response.status == 200 && response.data.isLoggedIn;
    } catch (e) {
        return false;
    }
}
