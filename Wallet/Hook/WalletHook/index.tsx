import {useCallback, useEffect, useMemo, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptosWallet} from './Chains/Aptos';
import {ETHWallet} from './Chains/ETH';
import {ICWallet} from './Chains/IC'
import {getNonce, auth, isAuth} from "./Api";
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
    const {signAndSubmitTransaction} = useWallet();
    const [_chainType, setChainType] = useState<ChainType>('');
    const [_walletType, setWalletType] = useState<WalletType>('')
    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    // wallet  gather
    const walletGather = useMemo(() => {
        return {APTOS, ETH, IC}
    }, [APTOS, ETH, IC]);


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
        if (connected) {
            AuthImart()
        }
    }, [connected])

    // Authorization for imart backend
    const AuthImart = async () => {
        if (!currentConnectedWallet) {
            return false;
        }
        if (await isAuth()) {
            return;
        }

        const {publicKey, address} = currentConnectedWallet;
        if (!address) {
            return;
        }
        const data = await getNonce(
            publicKey as string,
            address as string
        );

        let _singMessage;
        if (_chainType === 'ETH') {
            _singMessage = ETH.walletSignMessage
        } else if (_chainType === 'APTOS') {
            _singMessage = APTOS.walletSignMessage
        }
        if (!_singMessage) {
            throw new Error('no this wallet');
        }
        const signed = (await _singMessage(data.message, data.nonce)) as SignMessageResponse;
        const authPayload = {
            chain: _chainType,
            address: address!.toString(),
            publicKey: publicKey!.toString(),
            signature: (signed?.signature || signed) as string,
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
    }, [_walletType, walletGather, _chainType]);

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
                    provider: ETH.provider
                }
                if (!ETH.provider) {
                    return;
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
