export * from './IC';
export * from './ETH'
export * from './APTOS'
import {ChainType, WalletType, EthereumWalletType, AptosWalletType, DfinityWalletType} from '../Types'

export const ChainTabs = ["Aptos", "IC", "ETH"];

export const Chains: Array<ChainType> = ['IC', 'APTOS', "ETH"];

interface WalletCategoryProps {
    ETH: Array<EthereumWalletType>,
    APTOS: Array<AptosWalletType>,
    IC: Array<DfinityWalletType>
}

export const WalletCategory: WalletCategoryProps = {
    ETH: ['ethereum:metamask'],
    APTOS: ['aptos:petra', 'aptos:martian'],
    IC: ['dfinity:plug']
}
