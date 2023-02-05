import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from '@ethersproject/providers'
import {ChainResponse} from "../../Types";
import {InjectedConnector} from '@web3-react/injected-connector';
import {ethers} from "ethers";

export const injected = new InjectedConnector({});
import {useEffect} from "react";

export const ETHWallet = (): ChainResponse => {
    const currentWallet = window.ethereum;
    const {
        active: connected,
        chainId,
        account: address,
        library,
        connector,
        activate,
        deactivate,
    } = useWeb3React<Web3Provider>();
   console.log(library,'library')
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

    // wallet siginMessage
    const walletSignMessage = (message: string, nonce: string) => {
        const from = address;
        const msg = `0x${Buffer.from(nonce, 'utf8').toString('hex')}`;
       return  currentWallet.request({
            method: 'personal_sign',
            params: [msg, from, message],
        });
    }
    const provider = new ethers.providers.Web3Provider(currentWallet);
    return {
        login,
        connected,
        logout,
        address,
        chainId,
        publicKey: 'undefined',
        provider,
        walletSignMessage
    }
}
