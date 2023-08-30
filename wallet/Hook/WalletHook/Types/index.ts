import { Web3Provider } from "@ethersproject/providers";

declare global {
  interface Window {
    ic: any;
    aptos: any;
    martian: any;
  }

  interface ImportMeta {
    env: {
      ENV_NETWORK: "mainnet" | "testnet" | "";
      ENV_CHAINS: ChainType;
    };
  }
}

export interface ChainResponse {
  login: (e: WalletType) => Promise<any> | undefined;
  logout: () => Promise<any>;
  connected: boolean;
  address: string | null | undefined;
  chainId?: number | undefined;
  publicKey: string | null | undefined;
  getProvider?: any | undefined;
  walletSignMessage?: (message: string, nonce: string) => any;
  siwe?: (message: string, nonce: string) => Promise<any>;
  getBalance?: () => any;
  getEnsName?: () => any;
  changeToTestNetwork: () => any;
  chainIdToTypes: Record<number, ChainType>;
}

export interface AuthContext {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  hasCanCanAccount: boolean;
}

export interface SignMessagePayload {
  address?: boolean; // Should we include the address of the account in the message
  application?: boolean; // Should we include the domain of the dapp
  chainId?: boolean; // Should we include the current chain id the wallet is connected to
  message: string; // The message to be signed and displayed to the user
  nonce: string; // A nonce the dapp should generate
}

export interface SignMessageResponse {
  address: string;
  application: string;
  chainId: number;
  fullMessage: string; // The message that was generated to sign
  message: string; // The message passed in by the user
  nonce: string;
  prefix: string; // Should always be APTOS
  signature: string; // The signed full message
}

export type EthereumWalletType = "ethereum:metamask";
export type OPBNBWalletType = "opbnb:metamask";
export type ZkSyncWalletType = "zksync:metamask";
export type PolygonWalletType = "polygon:metamask";
export type BscWalletType = "bsc:metamask";
export type DfinityWalletType = "dfinity:II" | "dfinity:plug";
export type AptosWalletType = "aptos:petra" | "aptos:martian";
export type WalletType =
  | AptosWalletType
  | DfinityWalletType
  | EthereumWalletType
  | ZkSyncWalletType
  | PolygonWalletType
  | OPBNBWalletType
  | "";
export type VariantType = "default" | "error" | "success" | "warning" | "info";
export type ChainType =
  | "IC"
  | "APTOS"
  | "ETH"
  | "ZKSYNC"
  | "POLYGON"
  | "BSC"
  | "OPBNB"
  | "";

export type ActorType = "noIdentity" | "identity" | undefined;
