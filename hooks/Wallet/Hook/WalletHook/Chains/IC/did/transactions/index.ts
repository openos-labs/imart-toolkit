import {IDL} from '@dfinity/candid';
import {Principal} from "@dfinity/principal";
import {idlFactory as wicpDid} from "@/did/wicp.did";
import {idlFactory as minDid} from "@/did/public-mint.did";
import {idlFactory as MarketDid} from "@/did/market.did";
import {idlFactory as singleSaleDid} from '@/did/sale.did.js';
import {MintResult, TokenMetadata} from "@/did/model/mint";
import {Result, TxReceipt} from "@/did/model/market";
import {TxReceipt as wicpTxReceipt} from "@/did/model/wicp";
import {Result_1} from "@/did/model/sale.did";
import BigNumber from "bignumber.js";
import {getCurrencyString} from "@/utils/formate";
import {Type} from '@/apis/IC/NFTMint'
import {getUserInfo, useUserInfoStore} from "@/redux";

export default class Transactions {
    constructor() {
    }


    static async mintTransactions(arg_0: Principal, arg_1: [] | [TokenMetadata], type?: Type): Promise<MintResult> {
        return new Promise(async (resolve, reject) => {
            let canisterId = import.meta.env.VITE_REACT_APP_MINT_CANISTER_ID;
            if (type === 'music') {
                canisterId = import.meta.env.VITE_REACT_APP_MUSIC_CANISTER_ID;
            } else if (type === 'art') {
                canisterId = import.meta.env.VITE_REACT_APP_MINT_CANISTER_ID;
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
                canisterId: import.meta.env.VITE_REACT_APP_MINT_CANISTER_ID,
                methodName: 'approve',
                args: [...arguments],
                onSuccess: resolve,
                onFail: reject,
            };
            try {
                return await window?.ic?.plug.batchTransactions([MINT_NFT]);
            } catch (e) {
                reject(e);
            }
        })

    }

    static async listTokenTransactions(collection: Principal, tokenId: bigint, price: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketCanisterId = import.meta.env.VITE_REACT_APP_MARKET_ID as string;
                console.time('approve')
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'listToken',
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: (e) => {
                        console.log(e)
                    },
                };
                try {
                    await window?.ic?.plug.batchTransactions([MINT_NFT_APPROVE, MINT_NFT]);
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async cancelOrder(tokenId: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketCanisterId = import.meta.env.VITE_REACT_APP_MARKET_ID as string;
                const MINT_NFT_APPROVE = {
                    idl: minDid,
                    canisterId: import.meta.env.VITE_REACT_APP_MINT_CANISTER_ID,
                    methodName: 'approve',
                    args: [tokenId, Principal.fromText(marketCanisterId)],
                    onFail: reject,
                };
                const MINT_NFT = {
                    idl: MarketDid,
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'cancelOrder',
                    args: [tokenId],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    await window?.ic?.plug.batchTransactions([MINT_NFT_APPROVE, MINT_NFT]);
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async depositTransactions(price: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
                const marketId = import.meta.env.VITE_REACT_APP_MARKET_ID as string;
                const tokenCanisterId = import.meta.env.VITE_REACT_APP_WICP_CANISTER_ID as string;
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'deposit',
                    args: [price],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    return await window?.ic?.plug.batchTransactions([MINT_NFT, MINT_NFT_DEPOSIT]);
                } catch (e) {
                    reject(e);
                }
            }
        )
    }

    static async withdrawTransactions(price: bigint): Promise<TxReceipt> {
        const marketId = import.meta.env.VITE_REACT_APP_MARKET_ID as string;
        const tokenCanisterId = import.meta.env.VITE_REACT_APP_WICP_CANISTER_ID as string;
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'withdraw',
                    args: [price],
                    onSuccess: resolve,
                    onFail: reject,
                };

                try {
                    return await window?.ic?.plug.batchTransactions([MINT_NFT, MINT_NFT_WITHDRAW]);
                } catch (e) {
                    reject(e);
                }
            }
        )
    }

    static async depositAndBuyItemTransactions(price: bigint, tokenIndex: bigint): Promise<TxReceipt> {
        return new Promise(async (resolve, reject) => {
            const {marketBalance} = getUserInfo();
            const tokenCanisterId = import.meta.env.VITE_REACT_APP_WICP_CANISTER_ID as string;
            const marketId = import.meta.env.VITE_REACT_APP_MARKET_ID as string;
            const depositPrice = Number(getCurrencyString(String(price), 8, 0));
            // getCurrencyString(orderInfo?.price, 8, 2);
            const transactionsArray: Array<Object> = [];
            transactionsArray[0] = {
                idl: wicpDid,
                canisterId: tokenCanisterId,
                methodName: 'approve',
                args: [Principal.fromText(marketId), price],
                onFail: reject,
            };
            //  Insufficient balance Wallet recharge
            if (Number(depositPrice) > Number(marketBalance)) {
                const _price = +new BigNumber(Math.pow(10, 8)).times(Number(Number(depositPrice) - Number(marketBalance)))
                transactionsArray[1] = {
                    idl: MarketDid,
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'deposit',
                    args: [BigInt(_price)],
                    onFail: reject,
                };
            }
            const MINT_NFT_BUY = {
                idl: MarketDid,
                canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                methodName: 'buy',
                args: [tokenIndex],
                onSuccess: resolve,
                onFail: reject,
            };
            try {
                return await window?.ic?.plug.batchTransactions([...transactionsArray, MINT_NFT_BUY])
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
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

    static async saleBuyTransactions(tokenCanisterId: string, amount: bigint): Promise<Result_1> {
        return new Promise<Result_1>(async (resolve, reject) => {
                const CanisterId = import.meta.env.VITE_REACT_APP_WICP_CANISTER_ID as string;
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'setUserLogo',
                    args: [url],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'addFavorite',
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'removeFavorite',
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
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
                    canisterId: import.meta.env.VITE_REACT_APP_MARKET_ID,
                    methodName: 'offerIt',
                    args: [...arguments],
                    onSuccess: resolve,
                    onFail: reject,
                };
                try {
                    return await window?.ic?.plug.batchTransactions([MINT_NFT])
                } catch (e) {
                    reject(e)
                }
            }
        )
    }

}
