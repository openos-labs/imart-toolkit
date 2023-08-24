import axios from "../../../../network/src";

const https = axios.create({ baseURL: "/auth" });

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
};

export interface Auth {
  chain: string;
  address: string;
  publicKey: string;
  signature: string;
  message?: string;
}

export const auth = async (authParams: Auth) => {
 const inviter = window.localStorage.getItem('inviter')
 const _authParams = inviter ? { ...authParams, inviter } :authParams
  const res = await https.post(`/auth`, _authParams);
  return res.data;
};

export const isAuth = async (): Promise<boolean> => {
  try {
    const response = await https.get(`/user/isLoggedIn`);
    return response.status == 200 && response.data.isLoggedIn;
  } catch (e) {
    return false;
  }
};
