import axios from "axios";

axios.defaults.baseURL = "/imartApi";

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
