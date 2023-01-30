import {IDL} from '@dfinity/candid';
import {Principal} from "@dfinity/principal";
import {idlFactory as wicpDid} from "../wicp.did";
import {idlFactory as minDid} from "../public-mint.did";
import {idlFactory as MarketDid} from "../market.did";
import {idlFactory as singleSaleDid} from '../sale.did.js';
import {MintResult, TokenMetadata} from "../model/mint";
import {Result, TxReceipt} from "../model/market";
import {TxReceipt as wicpTxReceipt} from "../model/wicp";
import {Result_1} from "../model/sale.did";
import BigNumber from "bignumber.js";
import {APP_HOST, MARKET, MINT, SALSE, STORAGE, MUSIC, WICP} from '../../../../Config'
export type Type = 'art' | 'music';

export default class Transactions {
    constructor() {
    }


    static async mintTransactions(arg_0: Principal, arg_1: [] | [TokenMetadata], type?: Type): Promise<MintResult> {
        return new Promise(async (resolve, reject) => {
            let canisterId = MINT;
            if (type === 'music') {
                canisterId = MUSIC;
            } else if (type === 'art') {
                canisterId = MINT;
            }
            const MINT_NFT = {
                idl: minDid,
                canisterId,
                methodName: 'mint',
                args: [arg_0, arg_1],
                onSuccess: resolve,
                onFail: reject,
            };
            try {
                // @ts-ignore
                await window.ic.plug.batchTransactions([MINT_NFT])
            } catch (e) {
                reject(e);
            }
        })


    }

    static async approveListItemTransactions(arg_0: bigint, arg_1: Principal): Promise<TxReceipt> {
        return new Promise<TxReceipt>(async (resolve, reject) => {
            const MINT_NFT = {
                idl: minDid,
                canisterId:MINT,
                methodName: 'approve',
                // @ts-ignore
                args: [...arguments],
                onSuccess: resolve,
                onFail: reject,
            };
            try {
                // @ts-ignore
                return await window?.ic?.plug.batchTransactions([MINT_NFT]);
            } catch (e) {
                reject(e);
            }
        })

    }

    static async listTokenTransactions(collection: Principal, tokenId: bigint, price: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketCanisterId = MARKET;
                const MINT_NFT_APPROVE = {
                    idl: minDid,
                    canisterId: String(collection),
                    methodName: 'approve',
                    args: [tokenId, Principal.fromText(marketCanisterId)],
                    onSuccess: () => {
                        console.timeEnd('approve')
                    },
                    onFail: (re) => {
                        reject()
                    },
                };
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'listToken',
                    // @ts-ignore
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: (e) => {
                        console.log(e)
                    },
                };
                try {
                    // @ts-ignore
                    await window?.ic?.plug.batchTransactions([MINT_NFT_APPROVE, MINT_NFT]);
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async cancelOrder(tokenId: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketCanisterId = MARKET;
                const MINT_NFT_APPROVE = {
                    idl: minDid,
                    canisterId: MINT,
                    methodName: 'approve',
                    args: [tokenId, Principal.fromText(marketCanisterId)],
                    onFail: reject,
                };
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'cancelOrder',
                    args: [tokenId],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    await window?.ic?.plug.batchTransactions([MINT_NFT_APPROVE, MINT_NFT]);
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async depositTransactions(price: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketId = MARKET as string;
                const tokenCanisterId = WICP as string;
                const MINT_NFT = {
                    idl: wicpDid,
                    canisterId: tokenCanisterId,
                    methodName: 'approve',
                    args: [Principal.fromText(marketId), price],
                    onSuccess: resolve,
                    onFail: reject,
                };
                const MINT_NFT_DEPOSIT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'deposit',
                    args: [price],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT, MINT_NFT_DEPOSIT]);
                } catch (e) {
                    reject(e);
                }
            }
        )
    }

    static async withdrawTransactions(price: bigint): Promise<TxReceipt> {
        const marketId = MARKET as string;
        const tokenCanisterId = WICP as string;
        console.log(price + "", 'withdrawTransactions')
        return new Promise(async (resolve, reject) => {
                const MINT_NFT = {
                    idl: wicpDid,
                    canisterId: tokenCanisterId,
                    methodName: 'approve',
                    args: [Principal.fromText(marketId), (price)],
                    onSuccess: resolve,
                    onFail: reject,
                };
                const MINT_NFT_WITHDRAW = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'withdraw',
                    args: [price],
                    onSuccess: resolve,
                    onFail: reject,
                };

                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT, MINT_NFT_WITHDRAW]);
                } catch (e) {
                    reject(e);
                }
            }
        )
    }


    static async wicpApproveTransactions(tokenCanisterId: string, canisterId: Principal, price: bigint): Promise<wicpTxReceipt> {
        return new Promise<wicpTxReceipt>(async (resolve, reject) => {

                const MINT_NFT = {
                    idl: wicpDid,
                    canisterId: tokenCanisterId,
                    methodName: 'approve',
                    args: [canisterId, price],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async saleBuyTransactions(tokenCanisterId: string, amount: bigint): Promise<Result_1> {
        return new Promise<Result_1>(async (resolve, reject) => {
                const CanisterId = WICP as string;
                const _price = new BigNumber(Math.pow(10, 8)).times(Number(amount)) + ""
                const MINT_NFT_APPROVE = {
                    idl: wicpDid,
                    canisterId: CanisterId,
                    methodName: 'approve',
                    args: [Principal.fromText(tokenCanisterId), BigInt(_price)],
                    onFail: reject,
                };
                const MINT_NFT = {
                    idl: singleSaleDid,
                    canisterId: tokenCanisterId,
                    methodName: 'buy',
                    args: [amount],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT_APPROVE, MINT_NFT])
                } catch (e) {

                    reject(e)
                }
            }
        )
    }

    static async setUserLogoTransactions(url: string): Promise<Result> {
        return new Promise<Result>(async (resolve, reject) => {
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'setUserLogo',
                    args: [url],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async addFavorite(token: Principal, index: bigint): Promise<Result> {
        return new Promise<Result>(async (resolve, reject) => {
                debugger
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'addFavorite',
                    // @ts-ignore
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async removeFavorite(token: Principal, index: bigint): Promise<Result> {
        return new Promise<Result>(async (resolve, reject) => {
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'removeFavorite',
                    // @ts-ignore
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async makerOffer(collectionId: Principal, tokenId: bigint, price: bigint, interval: bigint): Promise<Result> {
        return new Promise<Result>(async (resolve, reject) => {
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: MARKET,
                    methodName: 'offerIt',
                    // @ts-ignore
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    // @ts-ignore
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

}
