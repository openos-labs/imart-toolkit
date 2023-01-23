import {useCallback, useEffect, useMemo, useState} from "react";
import {ContractClient, Protocol, Settings, ContractProxy} from "../../Contract";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptosWallet} from './Chains/Aptos';
import {ETHWallet} from './Chains/ETH';
import {ICWallet} from './Chains/IC'
import {getNonce, auth} from "./Api";
import axios from "axios";
import Storage from "../../utils/storage";
import {
    MINT,
    MARKET,
    STORAGE,
    SALSE,
    WICP,
    SEAPORT,
    APTOS_MARKET_ADDRESS,
    APTOS_CREATION_ADDRESS,
    APTOS_CURATION_ADDRESS,
    ETH_CREATION_ADDRESS,
    ETH_CURATION_ADDRESS,
    ETH_MARKET_ADDRESS
} from './Config'
import {ChainResponse, ChainType, SignMessagePayload, SignMessageResponse, WalletType} from './Types'
import {Contractor, Aptos, Evm, Contract} from "../../../contracts/src";


export interface HookResponse {
    walletLogout: () => any;
    walletLogin: (chainType: ChainType, walletType: WalletType) => any;
    connected: boolean;
    address: string;
    loginLoading: boolean;
    walletClient: ContractProxy;
    contractor: Contract;
    currentChainType: ChainType | string;
    currentWalletType: WalletType | string;
    checkLogin: () => void;
    AuthImart: () => any;
    switchChain: (chainType: ChainType, walletType: WalletType) => any;
}

export const WalletHook = (): HookResponse => {
    const APTOS = AptosWallet();
    const ETH = ETHWallet();
    const IC = ICWallet();
    const {signMessage, signAndSubmitTransaction} = useWallet();
    const [_chainType, setChainType] = useState<ChainType>('');
    const [_walletType, setWalletType] = useState<WalletType>('')
    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    // wallet  gather
    const walletGather = useMemo(() => {
        return {APTOS, ETH, IC}
    }, [APTOS, ETH, IC]);


    //  client
    const walletClient: ContractProxy = useMemo(() => {
        let protocol: Protocol;
        let settings: Settings;
        switch (_chainType) {
            case "APTOS":
                protocol = "aptos";
                settings = {
                    signAndSubmitTransaction,
                    marketAddress: `${
                        APTOS_MARKET_ADDRESS
                    }`,
                };
                break;
            case "IC":
                protocol = "ic";
                settings = {
                    wicpCanisterId: WICP,
                    mintCanisterId: MINT,
                    marketCanisterId: MARKET,
                    // @ts-ignore
                    batchTransactions: window?.ic?.plug.batchTransactions,
                };
                break;
            case "ETH":
            case "BSC":
            case "POLYGON":
                protocol = "seaport";
                settings = {
                    seaportAddress: `${SEAPORT}`,
                };
                break;
        }
        return new ContractClient(protocol!, settings!) as ContractProxy;
    }, [_chainType])

    // login
    const walletLogin = async (chainType: ChainType, walletType: WalletType) => {
        setLoginLoading(true)
        await walletGather[chainType]['login'](walletType);

        // cache status
        Storage.setWalletTypeStorage(walletType);
        Storage.setChainTypeStorage(chainType);

        // Storage.
        setChainType(chainType);
        setWalletType(walletType);
        await AuthImart();

        setLoginLoading(false);
    }

    // current already connected wallet object
    const currentConnectedWallet: ChainResponse | undefined = useMemo(() => {
        if (!_chainType) {
            return
        }
        return walletGather[_chainType]
    }, [_chainType, _walletType, walletGather])
    const connected = useMemo(() => {
        return !!(currentConnectedWallet && currentConnectedWallet['connected'])
    }, [currentConnectedWallet])

    // logout
    const walletLogout = useCallback(async () => {
        if (!_chainType || !_walletType || !currentConnectedWallet) {
            return
        }
        return await currentConnectedWallet['logout']();
    }, [currentConnectedWallet, _chainType, _walletType])


    useEffect(() => {
        if (connected && currentConnectedWallet) {
            AuthImart()
        }
    }, [currentConnectedWallet, connected])

    // Authorization for imart backend
    const AuthImart = async () => {
        if (!currentConnectedWallet) {
            return false;
        }
        const {publicKey, address} = currentConnectedWallet;
        if (!publicKey || !address) {
            return;
        }
        const data = await getNonce(
            publicKey as string,
            address as string
        );
        const signMessagePayload: SignMessagePayload = {
            address: false,
            chainId: false,
            application: false,
            message: data.message,
            nonce: data.nonce,
        };
        const signed = (await signMessage(
            signMessagePayload
        )) as SignMessageResponse;
        const authPayload = {
            chain: "APTOS",
            address: address!.toString(),
            publicKey: publicKey!.toString(),
            signature: signed.signature,
        };
        const authResult = await auth(authPayload);
        if (authResult?.authorization) {
            axios.defaults.headers.common["Authorization"] =
                authResult?.authorization;
            Storage.setJWT("token", authResult?.authorization);
            return true;
        }
        return false;
    }


    const switchChain = async (chainType: ChainType, walletType: WalletType) => {
        await walletLogout();
        await walletLogin(chainType, walletType)
    }

    //  wallet address
    const address = useMemo(() => {
        if (!_chainType || !_walletType) {
            return;
        }
        return walletGather[_chainType]['address'];
    }, [_walletType, _walletType]);

    // Check if you are logged in
    const checkLogin = async () => {
        const cachedChainType = Storage.getChainTypeStorage() ?? "";
        const cachedWalletType = Storage.getWalletTypeStorage() ?? "";
        if (cachedChainType && cachedWalletType) {
            return walletLogin(cachedChainType, cachedWalletType)
        }
    }
    const contractor: Contract = useMemo(() => {
        if (!connected) {
            return {} as any
        }
        switch (_chainType) {
            case "ETH": {
                const configuration = {
                    addresses: {
                        creation: ETH_CREATION_ADDRESS,
                        curation: ETH_CURATION_ADDRESS,
                        market: ETH_MARKET_ADDRESS
                    },
                    provider: ETH.library.currentProvider as any
                }
                return Contractor(Evm, configuration)
            }
            default: {
                const configuration = {
                    addresses: {
                        creation: APTOS_CREATION_ADDRESS,
                        curation: APTOS_CURATION_ADDRESS,
                        market: APTOS_MARKET_ADDRESS
                    },
                    submitTx: signAndSubmitTransaction
                }
                return Contractor(Aptos, configuration)
            }
        }
    }, [_chainType, ETH, connected])
    return {
        contractor,
        walletClient,
        walletLogin,
        walletLogout,
        AuthImart,
        address,
        currentChainType: _chainType,
        currentWalletType: _walletType,
        connected,
        loginLoading,
        checkLogin,
        switchChain
    }
}
