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
import {AptosSpec} from "./APTOS";
import {EthereumSpec} from "./ETH";
import {PolygonSpec} from "./POLYGON";
import {BscSpec} from "./BSC";
import {Config} from "@openoscom/contracts";
import {OPBNBSpec} from "./OPBNB";
import {ZkSyncSpec} from "./ZKSYNC";

const envChains: ChainType = import.meta.env.ENV_CHAINS || "";

const envChainsArray = ((arr) => arr.filter((value) => value))(
	envChains.split(",") as unknown as ChainType[],
);

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

export const SourceWalletCategory: WalletCategoryProps = {
	BSC: ["bsc:metamask"],
	OPBNB: ["opbnb:metamask"],
	ZKSYNC: ["zksync:metamask"],
	ETH: ["ethereum:metamask"],
	POLYGON: ["polygon:metamask"],
	APTOS: ["aptos:petra", "aptos:martian"],
	IC: ["dfinity:plug"],
};

const sourceWalletCategoryChains =
	envChainsArray.length === 0 ? sourceChainTabs : envChainsArray;

export const WalletCategory: WalletCategoryProps =
	sourceWalletCategoryChains.reduce((walletCategory, chain) => {
		if (Object.hasOwnProperty.call(SourceWalletCategory, chain)) {
			walletCategory[chain] = SourceWalletCategory[chain];
		}
		return walletCategory;
	}, {});

export const defaultValue = {
	connected: false,
	walletLogout: () => {
	},
	currentConnectedWallet: undefined,
	address: "",
	getBalance: () => {
	},
	getEnsName: () => {
	},
	changeToTestNetwork: () => {
	},
	currentConfig: {}
};

export const chainIdMap={
	80001:'POLYGON',
	97:"BSC",//test bsc
	56:"BSC", // mainnet
	5:"ETH", // test eth
	280:'ZKSYNC',
	5611:"OPBNB",
	1:'ETH' // mainnet Eth
}

export const CURRENCIES = {
	APTOS: "APT",
	ETH: "ETH",
	ZKSYNC: "ETH",
	BSC: "BNB",
	POLYGON: "MATIC",
	OPBNB: "tBNB",
};

type Chain = {
	chainId: number;
	chainName: string;
	rpcUrls: string[];
};
export const supportTestChains: Record<string, Chain> = {
	ETH: {
		chainId: 5,
		chainName: "ETH goerli",
		rpcUrls: ["https://ethereum-goerli.publicnode.com"],
	},
	POLYGON: {
		chainId: 80001,
		chainName: "POLYGON mumbai",
		rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
	},
	BSC: {
		chainId: 97,
		chainName: "BSC testnet",
		rpcUrls: [
			"https://bsc-dataseed1.binance.org",
			"https://bsc-dataseed2.binance.org",
			"https://bsc-dataseed3.binance.org",
			"https://bsc-dataseed4.binance.org",
			"https://bsc-dataseed1.defibit.io",
			"https://bsc-dataseed2.defibit.io",
			"https://bsc-dataseed3.defibit.io",
			"https://bsc-dataseed4.defibit.io",
			"https://bsc-dataseed1.ninicoin.io",
			"https://bsc-dataseed2.ninicoin.io",
			"https://bsc-dataseed3.ninicoin.io",
			"https://bsc-dataseed4.ninicoin.io",
		],
	},
	OPBNB: {
		chainId: 5611,
		chainName: "opBNB testnet",
		rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
	},
	ZKSYNC: {
		chainId: 280,
		chainName: "zkSync Era Testnet",
		rpcUrls: ["https://testnet.era.zksync.dev"]
	}
};
export const supportMainnetChains: Record<string, Chain> = {
	BSC: {
		chainId: 56,
		chainName: "BSC",
		rpcUrls: [
			'https://bsc-dataseed.binance.org/',
			'https://bsc-dataseed1.defibit.io/',
			'https://bsc-dataseed1.ninicoin.io/'
		],
	}
};

export const supportChains={
	mainnet:supportMainnetChains,
	testnet:supportTestChains
}
