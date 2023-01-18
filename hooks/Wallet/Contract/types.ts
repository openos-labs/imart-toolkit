export type TxCallable = (payload: any) => Promise<{ hash: string }>;

export interface Payload {
    coinType: string;
}

export type Settings = DfinitySettings | AptosSettings | SeaportSettings;

export interface AptosSettings {
    marketAddress: string;
    signAndSubmitTransaction: (payload: any) => Promise<{ hash: string }>;
}

export interface DfinitySettings {
    wicpCanisterId: string;
    mintCanisterId: string;
    marketCanisterId: string;
    batchTransactions: (payload: any) => Promise<any>;
}

export interface SeaportSettings {
    seaportAddress: string;
}

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
    title: string,
    description: string,
    artUrl: string
}
