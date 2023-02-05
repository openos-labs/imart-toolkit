import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { WithCoinType } from ".";

export type ProtocolOrder = {
  protocolOrder?: OrderWithCounter | any;
};
export type CancelOrderObject = DelistTokenArgs & ProtocolOrder;
export type CancelOfferObject = CancelOfferArgs & ProtocolOrder;
export type FillOrderObject = BuyTokenArgs & ProtocolOrder;
export type AcceptOfferObject = AcceptOfferArgs & ProtocolOrder;

export interface BuyTokenArgs extends WithCoinType {
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

export interface ListTokenArgs extends WithCoinType {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: number;
  coinAmount: number | string;
  lockedUntilSecs: number;
}

export interface DelistTokenArgs extends WithCoinType {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: number;
}

export interface CreateOfferArgs extends WithCoinType {
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

export interface AcceptOfferArgs extends WithCoinType {
  collectionId: string;
  tokenId: string;
  buyer: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: string;
}

export interface CancelOfferArgs extends WithCoinType {
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
