import {AxiosResponse} from "axios";
import axios from "@mix-labs/network";

export const onFulfilled: (value: any) => any = (
	response: AxiosResponse
) => {
	return response.data;
};
const API_URI = "//test1.imart.io/v1/api";

const https = axios.create({baseURL: API_URI});
https.interceptors.response.use(onFulfilled);
export const getAwsJsonData = async (url: string) => {
	try {
		return await https.get("https://imart-nft.s3.us-east-1.amazonaws.com/mixverse/" + url);
	} catch (e) {
		return false;
	}
};

export const getPresignedUrl = async (bucket: string, key: string, type: string) => {
	return await https.get(
		`/s3/presigned-url?bucket=${bucket}&key=${key}&type=${type}`
	);
	
}
