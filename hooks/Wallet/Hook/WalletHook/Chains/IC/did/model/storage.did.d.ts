import type {Principal} from '@dfinity/principal';
export interface ItemInfo {
    'id': bigint,
    'to': Principal,
    'from': Principal,
    'time': bigint,
    'price': bigint,
}
export interface OpRecord {
    'op': Operation,
    'timestamp': bigint,
    'index': bigint,
}
export type Operation = {
    'buy': {
        'token': Principal,
        'tokenIndex': bigint,
        'seller': Principal,
        'orderId': bigint,
        'buyer': Principal,
        'price': bigint,
    }
} |
    { 'withdraw': { 'to': Principal, 'from': Principal, 'amount': bigint } } |
    {
        'list': {
            'token': Principal,
            'tokenIndex': bigint,
            'seller': Principal,
            'orderId': bigint,
            'price': bigint,
        }
    } |
    { 'deposit': { 'to': Principal, 'from': Principal, 'amount': bigint } } |
    {
        'cancel': {
            'token': Principal,
            'tokenIndex': bigint,
            'seller': Principal,
            'orderId': bigint,
            'price': bigint,
        }
    };
export type Operation__1 = {
    'buy': {
        'token': Principal,
        'tokenIndex': bigint,
        'seller': Principal,
        'orderId': bigint,
        'buyer': Principal,
        'price': bigint,
    }
} |
    { 'withdraw': { 'to': Principal, 'from': Principal, 'amount': bigint } } |
    {
        'list': {
            'token': Principal,
            'tokenIndex': bigint,
            'seller': Principal,
            'orderId': bigint,
            'price': bigint,
        }
    } |
    { 'deposit': { 'to': Principal, 'from': Principal, 'amount': bigint } } |
    {
        'cancel': {
            'token': Principal,
            'tokenIndex': bigint,
            'seller': Principal,
            'orderId': bigint,
            'price': bigint,
        }
    };

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

export interface PriceInfo {
    'avg': bigint,
    'max': bigint,
    'min': bigint,
    'num': bigint,
    'date': bigint,
    'volume': bigint,
}

export interface Storage {
    'addOrder': (arg_0: OrderExt) => Promise<bigint>,
    'addRecord': (arg_0: Principal, arg_1: Operation__1, arg_2: Time) => Promise<bigint>,
    'allHistory': () => Promise<Array<OpRecord>>,
    'clearData': () => Promise<boolean>,
    'getCollectionHistoryOrders': (arg_0: Principal) => Promise<Array<OrderExt>>,
    'getCycles': () => Promise<bigint>,
    'getItemHistory': (
        arg_0: Principal,
        arg_1: bigint,
        arg_2: bigint,
    ) => Promise<Array<ItemInfo>>,
    'getNftItemHistory': (
        arg_0: Principal,
        arg_1: bigint,
        arg_2: bigint,
        arg_3: bigint,
    ) => Promise<Array<ItemInfo>>,
    'getNftPriceHistory': (
        arg_0: Principal,
        arg_1: bigint,
        arg_2: bigint,
        arg_3: number,
    ) => Promise<Array<PriceInfo>>,
    'getPriceHistory': (
        arg_0: Principal,
        arg_1: bigint,
        arg_2: number,
    ) => Promise<Array<PriceInfo>>,
    'getTokenHistoryOrders': (arg_0: Principal, arg_1: bigint) => Promise<Array<OrderExt>>,
    'getTransaction': (arg_0: bigint) => Promise<OpRecord>,
    'getTransactions': (arg_0: bigint, arg_1: bigint) => Promise<Array<OpRecord>>,
    'getUserOrderAmount': (arg_0: Principal) => Promise<bigint>,
    'getUserOrders': (arg_0: Principal, arg_1: bigint, arg_2: bigint) => Promise<Array<OrderExt>>,
    'getUserTransactionAmount': (arg_0: Principal) => Promise<bigint>,
    'getUserTransactions': (
        arg_0: Principal,
        arg_1: bigint,
        arg_2: bigint,
    ) => Promise<Array<OpRecord>>,
    'marketCanisterId': () => Promise<Principal>,
    'opAmount': () => Promise<bigint>,
    'owner': () => Promise<Principal>,
    'setMarketCanisterId': (arg_0: Principal) => Promise<boolean>,
}

export type Time = bigint;

export interface _SERVICE extends Storage {
}
