import { ethers } from "ethers";

export * from "./market";
export * from "./curation";
export * from "./creation";

export type Signer = ethers.Signer | any;

export interface Base {
  contract?: string;
  standard?: Standard;
}
export interface WithCoinType {
  coinType?: string;
}

export type AddressType =
  | "market"
  | "curation"
  | "singleCollective"
  | "multipleCollective"
  | "nftlottery"
  | "quickDraw"
  ;
export type Address = string;
export type Addresses = Record<AddressType, Address>;

export type Tx = { hash: string } | ethers.ContractTransaction | any;
export type TxReceipt =
  | ethers.ContractReceipt
  | { hash: string; success?: boolean }
  | any;
export type SubmitTx = (payload: any) => Promise<Tx>;
export type Standard = "ERC721" | "ERC1155";
export type Network = "mainnet" | "testnet" | "devnet";
export type GoerliId = 5;
export type MumbaiId = 80001;
export type BSCTestNetId = 97;
export type ChainId = GoerliId | MumbaiId | BSCTestNetId;
export const SUPPORTED_CHAINS: Record<ChainId, string> = {
  5: "goerli",
  80001: "mumbai",
  97: "bsc-testnet"
};

export interface Config {
  network?: Network;
  addresses: Addresses;
  submitTx?: SubmitTx;
  walletAddress?:string,
  provider?:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.BaseProvider
    | any;
}
