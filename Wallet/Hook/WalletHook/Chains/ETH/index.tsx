import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from '@ethersproject/providers'
import {ChainResponse} from "../../Types";
import {InjectedConnector} from '@web3-react/injected-connector';
import { ethers } from "ethers";

export const injected = new InjectedConnector({});
import {useEffect} from "react";

export const ETHWallet = (): ChainResponse => {
    const {
        active: connected,
        chainId,
        account: address,
        library,
        connector,
        activate,
        deactivate
    } = useWeb3React<Web3Provider>();

    const login = async () => {
        try {
            await activate(injected)
            return {status: 200};
        } catch (ex) {
            console.error(ex)
        }
    }
    const logout = async () => {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }
    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                });
            }
        });
    }, []);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return {
        login,
        connected,
        logout,
        address,
        chainId,
        publicKey: '',
        provider,
    }
}
