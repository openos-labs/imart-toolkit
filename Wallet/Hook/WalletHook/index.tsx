import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosWallet } from "./Chains/Aptos";
import { ETHWallet } from "./Chains/ETH";
import { ICWallet } from "./Chains/IC";
import { getNonce, auth, isAuth } from "./Api";
import axios from "axios";
import Storage from "../../utils/storage";
import { Specs, AptosSpec, defaultValue } from "./Config";
import { ChainType, SignMessageResponse, WalletType } from "./Types";
import { Contractor, Aptos, Evm, Contract, Config } from "../../../contracts";

export interface HookResponse {
  walletLogout: () => any;
  walletLogin: (chainType: ChainType, walletType: WalletType) => any;
  connected: boolean;
  address: string;
  loginLoading: boolean;
  contractor: Contract;
  currentChainType: ChainType | string;
  currentWalletType: WalletType | string;
  checkLogin: () => void;
  AuthImart: () => any;
  switchChain: (chainType: ChainType, walletType: WalletType) => any;
  getBalance: () => Promise<string> | any;
  currencyUnit: string;
  getEnsName: (e: string) => any;
  changeToTestNetwork: (chainType?: string) => any;
}

export const WalletHook = (): HookResponse => {
  const APTOS = AptosWallet();
  const ETH = ETHWallet();
  const POLYGON = ETHWallet();
  const BSC = ETHWallet();
  const IC = ICWallet();
  const { signAndSubmitTransaction } = useWallet();
  const [_chainType, setChainType] = useState<ChainType>("");
  const [_walletType, setWalletType] = useState<WalletType>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  // wallet  gather
  const walletGather = useMemo(() => {
    return { APTOS, POLYGON, ETH, BSC };
  }, [APTOS, POLYGON, ETH, BSC]);

  // login
  const walletLogin = async (chainType: ChainType, walletType: WalletType) => {
    setLoginLoading(true);
    await walletGather[chainType]["login"](walletType);
    await changeToTestNetwork(chainType);
    await getBalance();
    // cache status
    Storage.setWalletTypeStorage(walletType);
    Storage.setChainTypeStorage(chainType);

    // Storage.
    setChainType(chainType);
    setWalletType(walletType);
    setLoginLoading(false);
  };

  // current already connected wallet object
  const {
    connected,
    address,
    walletLogout,
    currentConnectedWallet,
    getBalance,
    getEnsName,
    changeToTestNetwork,
  } = useMemo(() => {
    if (!_chainType) {
      return defaultValue;
    }
    const _currentConnectedWallet = walletGather[_chainType];
    //connected
    const connected = (): boolean => {
      return !!(
        _currentConnectedWallet && _currentConnectedWallet["connected"]
      );
    };
    // address
    const address = (): string => {
      const _address = _currentConnectedWallet["address"];
      Storage.setLatestAccount(_address);
      return _address;
    };
    // walletLogout
    const walletLogout = async () => {
      return await _currentConnectedWallet["logout"]();
    };
    //getBalance
    const getBalance = async () => {
      return await _currentConnectedWallet?.getBalance();
    };

    const getEnsName = async () => {
      return _currentConnectedWallet?.getEnsName();
    };

    const changeToTestNetwork = (chainType) => {
      return _currentConnectedWallet?.changeToTestNetwork(chainType);
    };
    return {
      address: address(),
      connected: connected(),
      walletLogout,
      currentConnectedWallet: _currentConnectedWallet,
      getBalance,
      getEnsName,
      changeToTestNetwork,
    };
  }, [_chainType, _walletType, walletGather]);

  // Authorization for imart backend
  const AuthImart = async () => {
    if (!currentConnectedWallet) {
      return false;
    }
    if (await isAuth()) {
      return;
    }

    const { publicKey, address } = currentConnectedWallet;
    if (!address) {
      return;
    }
    const data = await getNonce(publicKey as string, address as string);

    let _singMessage;
    switch (_chainType) {
      case "APTOS":
        _singMessage = APTOS.walletSignMessage;
        break;
      case "ETH":
      case "BSC":
      case "POLYGON":
        _singMessage = ETH.siwe;
        break;
      default:
        throw new Error("no this wallet");
    }
    const signed = (await _singMessage(
      data.message,
      data.nonce
    )) as SignMessageResponse;
    const authPayload = {
      chain: _chainType,
      address: address!.toString(),
      publicKey: publicKey!.toString(),
      message: signed?.message,
      signature: (signed?.signature || signed) as string,
    };
    const authResult = await auth(authPayload);
    if (authResult?.authorization) {
      axios.defaults.headers.common["Authorization"] =
        authResult?.authorization;
      Storage.setJWT(`token:${address}`, authResult?.authorization);
      return true;
    }
    return false;
  };

  const switchChain = async (chainType: ChainType, walletType: WalletType) => {
    Storage.clearWallet();
    await walletLogout();
    await walletLogin(chainType, walletType);
  };

  // Check if you are logged in
  const checkLogin = async () => {
    const cachedChainType = Storage.getChainTypeStorage() ?? "";
    const cachedWalletType = Storage.getWalletTypeStorage() ?? "";

    if (!(await isAuth())) {
      return;
    }
    if (cachedChainType && cachedWalletType) {
      return walletLogin(cachedChainType, cachedWalletType);
    }
  };
  const network = "testnet";
  const contractor: Contract = useMemo(() => {
    if (!connected) {
      return {} as any;
    }
    const config: Config = {
      ...Specs[_chainType]!.configs[network],
      network,
    };
    switch (_chainType) {
      case "ETH":
      case "BSC":
      case "POLYGON": {
        const evmconf: Config = {
          ...config,
          provider: ETH.getProvider(),
        };
        if (!evmconf.provider) {
          return;
        }
        return Contractor(Evm, evmconf);
      }
      case "APTOS":
        const aptconf: Config = {
          ...config,
          submitTx: signAndSubmitTransaction,
        };
        return Contractor(Aptos, aptconf);
      default: {
      }
    }
  }, [_chainType, ETH, connected]);
  // ------------------------watch state ----------------------
  useEffect(() => {
    if (connected) {
      AuthImart();
    }
  }, [connected]);

  const currencyUnit = useMemo(() => {
    switch (_chainType) {
      case "APTOS":
        return "APT";
      case "ETH":
        return "ETH";
      case "BSC":
        return "BNB";
      case "POLYGON":
        return "MATIC";
      default:
        return "";
    }
  }, [_chainType]);

  useEffect(() => {
    if (!ETH.chainId) return;
    setChainType(ETH.chainIdToTypes[ETH.chainId]);
  }, [ETH?.chainId]);

  return {
    contractor,
    walletLogin,
    walletLogout,
    AuthImart,
    address,
    currentChainType: _chainType,
    currentWalletType: _walletType,
    connected,
    loginLoading,
    checkLogin,
    switchChain,
    getBalance,
    currencyUnit,
    getEnsName,
    changeToTestNetwork,
  };
};
