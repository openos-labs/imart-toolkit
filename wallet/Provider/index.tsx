import {
    WalletProvider,
    AptosWalletAdapter,
    MartianWalletAdapter,
} from "@manahippo/aptos-wallet-adapter";
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'
import {AuthProvider} from "../Hook";
import * as React from "react";

const wallets = [new MartianWalletAdapter(), new AptosWalletAdapter()];

interface Props {
    children: React.ReactElement
}

export const ImartAuthProvider = ({children}: Props) => {
    return (
        <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
            <WalletProvider
                wallets={wallets}
                autoConnect={true}
                onError={(error: Error) => {
                    console.log("Handle Error Message", error);
                }}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </WalletProvider>
        </Web3ReactProvider>
    )

}
