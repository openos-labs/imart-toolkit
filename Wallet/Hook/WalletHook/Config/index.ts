export * from './IC';
export * from './ETH'
export * from './APTOS'
import {ChainType, EthereumWalletType, AptosWalletType, DfinityWalletType, PolygonWalletType} from '../Types'

export const ChainTabs = ["Aptos", "POLYGON","ETH"];

export const Chains: Array<ChainType> = ['APTOS', "POLYGON", "ETH"];

interface WalletCategoryProps {
    ETH: Array<EthereumWalletType>,
    POLYGON: Array<PolygonWalletType>,
    APTOS: Array<AptosWalletType>,
    IC: Array<DfinityWalletType>
}

export const WalletCategory: WalletCategoryProps = {
    ETH: ['ethereum:metamask'],
    POLYGON: ['polygon:metamask'],
    APTOS: ['aptos:petra', 'aptos:martian'],
    IC: ['dfinity:plug']
}

export const defaultValue = {
    connected: false, walletLogout: () => {
    },
    currentConnectedWallet: undefined,
    address: '',
    getBalance: () => {
    },
    getEnsName:()=>{}
}
