import type {Principal} from '@dfinity/principal';

export interface Attribute {
  'key': string,
  'value': string
}

export interface CollectionExt {
  'floor': [] | [bigint],
  'creator': Principal,
  'desc': string,
  'orders': bigint,
  'logo': string,
  'name': string,
  'cover': string,
  'feeRate': bigint,
  'volume': bigint,
  'historyOrders': bigint,
  'category': string,
  'index': bigint,
  'canisterId': Principal,
}

export type Location = { 'Web': string } |
    { 'AssetCanister': [Principal, Array<number>] } |
    { 'IPFS': string } |
    { 'InCanister': Array<number> };
export interface Market {
  'addCollection': (
      arg_0: Principal,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: bigint,
  ) => Promise<Result>,
  'addFavorite': (arg_0: Principal, arg_1: bigint) => Promise<Result>,
  'allOffers': (arg_0: Principal, arg_1: bigint) => Promise<Array<Offer>>,
  'balanceOf': (arg_0: Principal) => Promise<bigint>,
  'buy': (arg_0: bigint) => Promise<TxReceipt>,
  'cancelOrder': (arg_0: bigint) => Promise<TxReceipt>,
  'deposit': (arg_0: bigint) => Promise<TxReceipt>,
  'getCollection': (arg_0: Principal) => Promise<[] | [CollectionExt]>,
  'getCollectionOrders': (arg_0: Principal) => Promise<Array<OrderExt>>,
  'getCollectionVolume': (arg_0: Principal) => Promise<bigint>,
  'getCollections': () => Promise<Array<CollectionExt>>,
  'getCollectionsByCategory': (arg_0: string) => Promise<Array<CollectionExt>>,
  'getNFTs': () => Promise<Array<Principal>>,
  'getOffer': (arg_0: Principal) => Promise<Array<OfferExt>>,
  'getOpenOrders': () => Promise<Array<OrderExt>>,
  'getOpenOrdersByPriceRange': (
      arg_0: Principal,
      arg_1: bigint,
      arg_2: bigint,
  ) => Promise<Array<OrderExt>>,
  'getOpenOrdersByToken': (arg_0: Principal, arg_1: bigint) => Promise<Result_1>,
  'getOrder': (arg_0: bigint) => Promise<[] | [OrderExt]>,
  'getTotalVolume': () => Promise<bigint>,
  'getUserInfo': (arg_0: Principal) => Promise<UserInfoExt>,
  'getUserOrders': (arg_0: Principal) => Promise<Array<OrderExt>>,
  'getUserOwnedNFTs': (arg_0: Principal) => Promise<Array<[Principal, Array<TokenInfoExt>]>>,
  'isFavorite': (arg_0: Principal, arg_1: Principal, arg_2: bigint) => Promise<boolean>,
  'lazyBuy': (arg_0: bigint) => Promise<TxReceipt>,
  'listToken': (arg_0: Principal, arg_1: bigint, arg_2: bigint) => Promise<TxReceipt>,
  'offerIt': (
      arg_0: Principal,
      arg_1: bigint,
      arg_2: bigint,
      arg_3: bigint,
  ) => Promise<boolean>,
  'removeFavorite': (arg_0: Principal, arg_1: bigint) => Promise<Result>,
  'setCollectionCategory': (arg_0: Principal, arg_1: string) => Promise<Result>,
  'setCollectionCover': (arg_0: Principal, arg_1: string) => Promise<Result>,
  'setCollectionDesc': (arg_0: Principal, arg_1: string) => Promise<Result>,
  'setCollectionFee': (arg_0: Principal, arg_1: bigint) => Promise<Result>,
  'setCollectionLogo': (arg_0: Principal, arg_1: string) => Promise<Result>,
  'setUserCover': (arg_0: string) => Promise<Result>,
  'setUserDesc': (arg_0: string) => Promise<Result>,
  'setUserLogo': (arg_0: string) => Promise<Result>,
  'setUserName': (arg_0: string) => Promise<Result>,
  'setUserProfile': (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
  ) => Promise<Result>,
  'sortOpenOrdersByPriceAsc': (arg_0: Principal) => Promise<Array<OrderExt>>,
  'sortOpenOrdersByPriceDesc': (arg_0: Principal) => Promise<Array<OrderExt>>,
  'updatePrice': (arg_0: bigint, arg_1: bigint) => Promise<Result>,
  'withdraw': (arg_0: bigint) => Promise<TxReceipt>,
}
export interface Offer {
  'end': bigint,
  'start': bigint,
  'price': bigint,
  'bidder': Principal,
}
export interface OfferExt {
  'end': bigint,
  'token': Principal,
  'tokenId': bigint,
  'start': bigint,
  'price': bigint,
  'bidder': Principal,
}

export interface OrderExt {
  'status': OrderStatus,
  'token': Principal,
  'createAt': bigint,
  'tokenIndex': bigint,
  'owner': Principal,
  'index': bigint,
  'price': bigint,
}

export type OrderStatus = { 'done': bigint } |
    { 'open': bigint } |
    { 'cancel': bigint };
export type Result = { 'ok': boolean } |
    { 'err': string };
export type Result_1 = { 'ok': OrderExt } |
    { 'err': string };
export type Time = bigint;

export interface TokenInfoExt {
  'owner': Principal,
  'metadata': [] | [TokenMetadata],
  'operator': [] | [Principal],
  'timestamp': Time,
  'index': bigint,
}

export interface TokenMetadata {
  'filetype': string,
  'attributes': Array<Attribute>,
  'location': Location,
}

export type TxReceipt = { 'ok': bigint } |
    { 'err': string };

export interface UserInfoExt {
  'favorites': Array<[Principal, bigint]>,
  'desc': string,
  'logo': string,
  'name': string,
  'cover': string,
}

export interface _SERVICE extends Market {
}
