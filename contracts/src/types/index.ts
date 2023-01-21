import { ethers } from "ethers";

export * from "./market";
export * from "./curation";
export * from "./creation";

export type Signer = ethers.Signer | any;

export interface WithCoinType {
  coinType?: string;
}
export type AddressType = "market" | "creation" | "curation";
export type Address = string;
export type Addresses = Record<AddressType, Address>;

export type Tx = { hash: string } | any;
export type SubmitTx = (payload: any) => Promise<any>;

export interface Config {
  addresses: Addresses;
  submitTx?: SubmitTx;
  provider?: ethers.providers.JsonRpcProvider | ethers.providers.BaseProvider;
}
