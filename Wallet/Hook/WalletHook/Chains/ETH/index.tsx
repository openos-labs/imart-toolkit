import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from '@ethersproject/providers'
import {ChainResponse} from "../../Types";
import {InjectedConnector} from '@web3-react/injected-connector';
import {ethers} from "ethers";
import Web3 from 'web3'
import {useEffect} from "react";
import { ENS } from '@ensdomains/ensjs'

export const injected = new InjectedConnector({});
import {Buffer} from 'buffer'
export const ETHWallet = (): ChainResponse => {
    const currentWallet = window.ethereum;
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

    const activateInjectedProvider = (providerName: 'MetaMask' | 'CoinBase') => {
        const {ethereum} = window as any;

        if (!ethereum?.providers) {
            return undefined;
        }

        let provider;
        switch (providerName) {
            case 'CoinBase':
                provider = ethereum?.providers.find(({isCoinbaseWallet}) => isCoinbaseWallet);
                break;
            case 'MetaMask':
                provider = ethereum?.providers.find(({isMetaMask}) => isMetaMask);
                break;
        }

        if (provider) {
            ethereum.setSelectedProvider(provider);
        }
    }
    useEffect(() => {
        activateInjectedProvider('MetaMask');
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                });
            }
        });
    }, []);

    // wallet siginMessage
    const walletSignMessage = (message: string, nonce: string) => {
        const from = address;
        const msg = `0x${Buffer.from(nonce, 'utf8').toString('hex')}`;
        return currentWallet.request({
            method: 'personal_sign',
            params: [msg, from, message],
        });
    }
    const getProvider = (): any => {
        return currentWallet ? new ethers.providers.Web3Provider(currentWallet) : ethers.providers.getDefaultProvider();
    }

    const getBalance = async ():Promise<string> => {
        const provider = getProvider();
        if (!provider) {
            return ''
        }
        const web3 = new Web3(provider?.provider);
        const amount = await web3.eth.getBalance(address as string);
        const formateNumber = +ethers.utils.formatEther(amount)
        return formateNumber.toFixed(4)
    }
    
   const getEnsName:any=async (address)=>{
       const ENSInstance = new ENS()
       await ENSInstance.setProvider(getProvider())
	     return  await ENSInstance.getName(address)
    }
    return {
        login,
        connected,
        logout,
        address,
        chainId,
        publicKey: 'undefined',
        getProvider,
        walletSignMessage,
        getBalance,
        getEnsName
    }
}
