import {AptosWalletName, MartianWalletName, useWallet, WalletName} from "@manahippo/aptos-wallet-adapter";
import {ChainResponse, WalletType} from "../../Types";


export const AptosWallet = (): ChainResponse => {
    const {
        connect,
        disconnect,
        connected,
        account
    } = useWallet();

    const login = async (walletType:WalletType) => {
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
            return  await connect(name)
        }
    }

    const logout = async () => {
        return await disconnect()
    }
    console.log(account,'account')
    return {logout, login, connected, address: account?.address?.toString(), publicKey: account?.publicKey?.toString()}

}
