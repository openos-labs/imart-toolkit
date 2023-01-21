import {
  OrderComponents,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { ethers, Signer } from "ethers";

export type Category = "SPACE" | "MUSIC" | "ART";

export type AddressType = "market" | "creation" | "curation";
export type Address = string;
export type Addresses = Record<AddressType, Address>;

export type Tx = { hash: string } | any;
export type SubmitTx = (payload: any) => Promise<any>;

export interface Config {
  addresses: Addresses;
  submitTx?: SubmitTx;
  signer?: Signer;
  provider?: ethers.providers.JsonRpcProvider | ethers.providers.BaseProvider;
}

export interface Payload {
  coinType: string;
}

export type CancelOrderObject = DelistTokenArgs | OrderComponents;
export type CancelOfferObject = CancelOfferArgs | OrderComponents;
export type FillOrderObject = BuyTokenArgs | OrderWithCounter;
export type AcceptOfferObject = AcceptOfferArgs | OrderWithCounter;

export interface BuyTokenArgs extends Payload {
  collectionId: string;
  tokenId: string;
  coinAmount: number;
  seller: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: number;
}

export interface ListTokenArgs extends Payload {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: number;
  coinAmount: number;
  lockedUntilSecs: number;
}

export interface DelistTokenArgs extends Payload {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: number;
}

export interface CreateOfferArgs extends Payload {
  collectionId: string;
  tokenId: string;
  price: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: string;
  duration: number;
}

export interface AcceptOfferArgs extends Payload {
  collectionId: string;
  tokenId: string;
  buyer: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: string;
}

export interface CancelOfferArgs extends Payload {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: String;
  name: String;
  propertyVersion: string;
}

export interface Token {
  tokenId: string;
  collectionId: string;
  creator: string;
  collection: string;
  name: string;
  owner: string;
  uri: string;
  description: string;
  propertyVersion: string;
}

export interface Collection {
  collectionId: string;
  creator: string;
  name: string;
  uri: string;
  cover: string;
  logo: string;
  description: string;
  supply: string;
  floorPrice: string;
  volume: string;
  ordersCount: string;
}

export interface Order {
  orderId: string;
  price: string;
  quantity: string;
  currency: string;
  decimals: number;
  tokenId: string;
  collectionId: string;
  seller: string;
  buyer?: string | undefined;
  status: string;
  createTime: number;
}

export interface Create {
  category: Category;
  title: string;
  description: string;
  uri: string;
}
