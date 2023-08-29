export * from "./IC";
export * from "./ETH";
export * from "./APTOS";
export * from "./POLYGON";
import {
  ChainType,
  EthereumWalletType,
  AptosWalletType,
  DfinityWalletType,
  PolygonWalletType,
  BscWalletType,
  OPBNBWalletType,
  ZkSyncWalletType,
} from "../Types";
import { AptosSpec } from "./APTOS";
import { EthereumSpec } from "./ETH";
import { PolygonSpec } from "./POLYGON";
import { BscSpec } from "./BSC";
import { Config } from "@openoscom/contracts";
import { OPBNBSpec } from "./OPBNB";
import { ZkSyncSpec } from "./ZKSYNC";

const envChains: ChainType = import.meta.env.ENV_CHAINS || "";
const envChainsArray = envChains.split(",") as unknown as ChainType[];

const envFindChains = (
  sourceChain: ChainType[],
  envChains = envChainsArray,
) => {
  if (envChains.length === 0) return sourceChain;
  return sourceChain.filter((chain) => envChainsArray.includes(chain));
};
const sourceChainTabs: ChainType[] = [
  "ETH",
  "BSC",
  "OPBNB",
  "ZKSYNC",
  "POLYGON",
  "APTOS",
];
export const ChainTabs = envFindChains(sourceChainTabs);
export const Chains: ChainType[] = envFindChains(sourceChainTabs);
// export const Chains: Array<ChainType> = ["BSC"];

export type Spec = { configs: { testnet: Config } };

export const Specs: Partial<Record<ChainType, Spec>> = {
  ETH: EthereumSpec,
  BSC: BscSpec,
  APTOS: AptosSpec,
  POLYGON: PolygonSpec,
  OPBNB: OPBNBSpec,
  ZKSYNC: ZkSyncSpec,
};

interface WalletCategoryProps {
  ETH?: Array<EthereumWalletType>;
  BSC?: Array<BscWalletType>;
  POLYGON?: Array<PolygonWalletType>;
  APTOS?: Array<AptosWalletType>;
  IC?: Array<DfinityWalletType>;
  OPBNB?: Array<OPBNBWalletType>;
  ZKSYNC?: Array<ZkSyncWalletType>;
}

const sourceWalletCategory: WalletCategoryProps = {
  BSC: ["bsc:metamask"],
  OPBNB: ["opbnb:metamask"],
  ZKSYNC: ["zksync:metamask"],
  ETH: ["ethereum:metamask"],
  POLYGON: ["polygon:metamask"],
  APTOS: ["aptos:petra", "aptos:martian"],
  IC: ["dfinity:plug"],
};

export const WalletCategory: WalletCategoryProps = ChainTabs.reduce(
  (walletCategory, chain) => {
    if (Object.hasOwnProperty.call(sourceWalletCategory, chain)) {
      walletCategory[chain] = sourceWalletCategory[chain];
    }
    return walletCategory;
  },
  {},
);

export const defaultValue = {
  connected: false,
  walletLogout: () => {},
  currentConnectedWallet: undefined,
  address: "",
  getBalance: () => {},
  getEnsName: () => {},
  changeToTestNetwork: () => {},
};
