import {AptosWalletName, MartianWalletName, useWallet, WalletName} from "@manahippo/aptos-wallet-adapter";
import {ChainResponse, SignMessagePayload, WalletType} from "../../Types";
import {AptosClient, AptosAccount, CoinClient, FaucetClient} from "aptos";
import {NODE_URL, FAUCET_URL} from '../../Config'
import {useEffect} from "react";
import {AwaitResolve} from '../../../../utils/common'

export const AptosWallet = (): ChainResponse => {
    const {
        connect,
        disconnect,
        connected,
        account,
        signMessage
    } = useWallet();


    const login = async (walletType: WalletType) => {
        let name: WalletName;
        switch (walletType) {
            case 'aptos:martian':
                name = MartianWalletName;
                break;
            case 'aptos:petra':
                name = AptosWalletName;
                break;
            default:
                console.error('no this wallet');
                return;
        }
        // @ts-ignore
        if (name) {
            return await connect(name)
        }
    }


    // wallet siginMessage
    const walletSignMessage = (message: string, nonce: string) => {
        const signMessagePayload: SignMessagePayload = {
            address: false,
            chainId: false,
            application: false,
            message: message,
            nonce: nonce,
        };
        return signMessage(signMessagePayload)
    }

    const logout = async () => {
        return await disconnect()
    }
    const getBalance = async () => {
        const client = new AptosClient(NODE_URL);
        const coinClient = new CoinClient(client);
        await AwaitResolve.awaitFn('address')

        // @ts-ignore
        return  await coinClient.checkBalance(account.address)

    }
    useEffect(() => {
        const address = account?.address?.toString()
        if (address) {
            AwaitResolve.resolveFn('address', address)
        }
    }, [account?.address?.toString()])
    return {
        logout,
        login,
        connected,
        address: account?.address?.toString(),
        publicKey: account?.publicKey?.toString(),
        walletSignMessage,
        getBalance
    }

}
