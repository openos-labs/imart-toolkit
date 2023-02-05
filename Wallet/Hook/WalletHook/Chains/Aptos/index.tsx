import {AptosWalletName, MartianWalletName, useWallet, WalletName} from "@manahippo/aptos-wallet-adapter";
import {ChainResponse, SignMessagePayload, WalletType} from "../../Types";


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
    return {
        logout,
        login,
        connected,
        address: account?.address?.toString(),
        publicKey: account?.publicKey?.toString(),
        walletSignMessage
    }

}
