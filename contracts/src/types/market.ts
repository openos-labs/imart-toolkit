import { OrderWithCounter } from "@opensea/seaport-js/lib/types";

import { BigNumberish } from "ethers";
import { Base, WithCoinType } from ".";

export type ProtocolOrder = {
  protocolOrder?: OrderWithCounter | any;
};
export type CancelOrderObject = DelistTokenArgs & ProtocolOrder;
export type CancelOfferObject = CancelOfferArgs & ProtocolOrder;
export type FillOrderObject = BuyTokenArgs & ProtocolOrder;
export type AcceptOfferObject = AcceptOfferArgs & ProtocolOrder;

export interface BuyTokenArgs extends Base, WithCoinType {
  collectionId: string;
  tokenId: string;
  coinAmount: BigNumberish;
  seller: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: BigNumberish;
}

export interface ListTokenArgs extends Base, WithCoinType {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: BigNumberish;
  coinAmount: BigNumberish;
  lockedUntilSecs: number;
  royalties?: Record<string, BigNumberish>;
}


export interface listTokenAscendAuctionArgs extends Base, WithCoinType {
  startTime: string;
  endTime: string;
  offer: {
    itemType: number;
    token: string;
    amount: string;
    endAmount: string;
    identifier:any;
  }[];
  consideration: {
    token: string;
    amount: string;
    endAmount: string;
    recipient: string;
  }[];
  fees: {
    recipient: string;
    basisPoints: number;
  }[];
};

export interface listTokenDutchAuctionArgs extends Base, WithCoinType {
  startTime: string;
  endTime: string;
  offer: {
    itemType: number;
    token: string;
    amount: string;
    endAmount: string;
    identifier:any;
  }[];
  consideration: {
    amount: string;
    endAmount: string;
    recipient: string;
    token: string;
  }[];
  fees: {
    recipient: string;
    basisPoints: number;
  }[];
};

export interface DelistTokenArgs extends Base, WithCoinType {
  collectionId: string;
  tokenId: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: BigNumberish;
}

export interface CreateOfferArgs extends Base, WithCoinType {
  collectionId: string;
  tokenId: string;
  price: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: BigNumberish;
  duration: number;
  royalties?: Record<string, BigNumberish>;
}

export interface AcceptOfferArgs extends Base, WithCoinType {
  collectionId: string;
  tokenId: string;
  buyer: string;
  creator: string;
  collection: string;
  name: string;
  propertyVersion: string;
  tokenAmount: string;
}

export interface CancelOfferArgs extends Base, WithCoinType {
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
  decimals: BigNumberish;
  tokenId: string;
  collectionId: string;
  seller: string;
  buyer?: string | undefined;
  status: string;
  createTime: number;
}
