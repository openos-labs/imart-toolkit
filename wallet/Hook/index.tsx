import {
  useContext,
  createContext,
  useEffect,
  useState,
  FC,
  ReactNode,
  useMemo,
} from "react";

export * from "./WalletHook/Types";
export * from "./WalletHook/Config";

import { HookResponse, WalletHook } from "./WalletHook";
import { ChainResponse, ChainType, WalletType } from "./WalletHook/Types";
import { Contract, Contractor,Config,ContractorV2 } from "@openoscom/contracts";

interface AuthProps {
  logOut: () => any;
  login: (chainType: ChainType, walletType: WalletType) => any;
  isAuth: boolean;
  address: string;
  loginLoading: boolean;
  contractClient: Contract;
  contractor: Contract;
  contractorV2: ContractorV2;
  currentChainType: ChainType | string;
  walletType: WalletType | string;
  switchChain: (chainType: ChainType, walletType: WalletType) => any;
  getBalance: () => Promise<string>;
  currencyUnit: string;
  getEnsName: (e: string) => any;
  changeToTestNetwork: () => any;
  reallyChainType:ChainType | string;
  waitingAuth:boolean
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const {
    address,
    loginLoading,
    walletLogin,
    walletLogout,
    contractor,
    contractorV2,
    connected,
    checkLogin,
    currentChainType,
    currentWalletType,
    switchChain,
    getBalance,
    currencyUnit,
    getEnsName,
    changeToTestNetwork,
    reallyChainType,
    waitingAuth
  } = WalletHook();

  useEffect(() => {
    checkLogin();
  }, []);

  const Context: AuthProps = {
    currentChainType,
    walletType: currentWalletType,
    logOut: walletLogout,
    login: walletLogin,
    isAuth: connected,
    address,
    loginLoading,
    contractClient: contractor,
    contractor,
    contractorV2,
    switchChain,
    getBalance,
    currencyUnit,
    getEnsName,
    changeToTestNetwork,
    reallyChainType,
    waitingAuth
  };
  // save common data
  return (
    <AuthContext.Provider value={Context}>{children}</AuthContext.Provider>
  );
};

const AuthContext = createContext<AuthProps>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};
