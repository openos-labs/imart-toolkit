export * from './IC';
export * from './ETH'
export * from './APTOS'
export * from './POLYGON'
import {ChainType, EthereumWalletType, AptosWalletType, DfinityWalletType, PolygonWalletType, BscWalletType} from '../Types'
import { AptosSpec } from './APTOS';
import { EthereumSpec } from './ETH';
import { PolygonSpec } from './POLYGON';
import { BscSpec } from './BSC';
import { Config } from '@mix-labs/contracts'

export const ChainTabs = ["Aptos", "POLYGON","ETH", "BSC"];
export const Chains: Array<ChainType> = ['APTOS', "POLYGON", "ETH", "BSC"];
export type Spec = { configs: { testnet: Config } }
export const Specs: Partial<Record<ChainType, Spec>> = {
    'ETH': EthereumSpec,
    'BSC': BscSpec,
    'APTOS': AptosSpec,
    'POLYGON': PolygonSpec,
}

interface WalletCategoryProps {
    ETH: Array<EthereumWalletType>,
    BSC: Array<BscWalletType>,
    POLYGON: Array<PolygonWalletType>,
    APTOS: Array<AptosWalletType>,
    IC: Array<DfinityWalletType>
}

export const WalletCategory: WalletCategoryProps = {
    BSC: ['bsc:metamask'],
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
    getEnsName:()=>{},
    changeToTestNetwork:()=>{},
    
}
