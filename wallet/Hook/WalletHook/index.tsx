import {useEffect, useMemo, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptosWallet} from "./Chains/Aptos";
import {ETHWallet} from "./Chains/ETH";
import {getNonce, auth, isAuth} from "./Api";
import axios from "axios";
import Storage from "../../utils/storage";
import {Specs, chainIdMap, CURRENCIES} from "./Config";
import {ChainType, SignMessageResponse, WalletType} from "./Types";
import {Contractor, Aptos, Evm, Contract, Config, ContractorV2} from "../../../contracts";

export interface HookResponse {
	walletLogout: () => any;
	walletLogin: (chainType: ChainType, walletType: WalletType) => any;
	connected: boolean;
	address: string;
	loginLoading: boolean;
	contractor: Contract;
	contractorV2: ContractorV2;
	currentChainType: ChainType | string;
	currentWalletType: WalletType | string;
	checkLogin: () => void;
	AuthImart: () => any;
	switchChain: (chainType: ChainType, walletType: WalletType) => any;
	getBalance: () => Promise<string> | any;
	currencyUnit: string;
	getEnsName: (e: string) => any;
	changeToTestNetwork: (chainType?: string) => any;
	reallyChainType: ChainType | string;
	waitingAuth:boolean
}

let defaultChainType: ChainType = 'BSC'
export const WalletHook = (): HookResponse => {
	const network = import.meta.env.ENV_NETWORK || "testnet";
	defaultChainType = network === 'testnet' ? "ETH" : 'BSC'
	const APTOS = AptosWallet();
	const ETH = ETHWallet();
	const POLYGON = ETHWallet();
	const BSC = ETHWallet();
	const OPBNB = ETHWallet();
	const ZKSYNC = ETHWallet();
	
	const [waitingAuth,setWaitingAuth] = useState<boolean>(false)
	const {signAndSubmitTransaction} = useWallet();
	const [_chainType, setChainType] = useState<ChainType>(defaultChainType);
	const [_walletType, setWalletType] = useState<WalletType>("");
	const [loginLoading, setLoginLoading] = useState<boolean>(false);
	const [reallyChainType, setReallyChainType] = useState<ChainType>(defaultChainType);
	
	// wallet  gather
	const walletGather = useMemo(() => {
		return {APTOS, POLYGON, ETH, ZKSYNC, BSC, OPBNB};
	}, [APTOS, POLYGON, ETH, ZKSYNC, BSC, OPBNB]);
	
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
		const _currentConnectedWallet = walletGather[_chainType];
		//connected
		const connected = (): boolean => {
			return !!(
				_currentConnectedWallet && _currentConnectedWallet["connected"]
			);
		};
		
		
		// address
		const address = (): string => {
			const _address = _currentConnectedWallet["address"]
			if (_address) {
				Storage.setLatestAccount(_address);
			}
			return _address;
		};
		
		// walletLogout
		const walletLogout = async () => {
			Storage.clearWallet();
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
	}, [_chainType, _walletType, walletGather, ETH.chainId]);
	
	// Authorization for imart backend
	const AuthImart = async () => {
		if (!currentConnectedWallet) {
			return false;
		}
		
		
		const {publicKey, address} = currentConnectedWallet;
		if (!address) {
			return;
		}
		const currentAccount = Storage.getJWT(`token:${address}`)
		if (currentAccount && await isAuth()) {
			return;
		}
		if (!currentAccount){
			setWaitingAuth(true)
		}
		const data = await getNonce(publicKey as string, address as string);
		let _singMessage;
		switch (_chainType) {
			case "APTOS":
				_singMessage = APTOS.walletSignMessage;
				break;
			default:
				_singMessage = ETH.siwe;
				break;
		}
		const signed = (await _singMessage(
			data.message,
			data.nonce,
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
			setWaitingAuth(false)
			return true;
		}
		setWaitingAuth(false)
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
	
	// Contract instance
	const contractor: Contract = useMemo(() => {
		const config: Config = {
			...Specs[_chainType]!.configs[network],
			network,
		};
		switch (_chainType) {
			case "APTOS":
				const aptconf: Config = {
					...config,
					submitTx: signAndSubmitTransaction,
					walletAddress: address
				};
				return Contractor(Aptos, aptconf) as any;
			default: {
				const evmconf: Config = {
					...config,
					provider: ETH.getProvider(_chainType),
					walletAddress: address
				};
				if (!evmconf.provider) {
					return;
				}
				return Contractor(Evm, evmconf);
			}
		}
	}, [ETH.chainId, connected, _chainType, address]);
	
	const contractorV2: ContractorV2 = useMemo(() => {
		if (!connected) {
			return {} as any;
		}
		const config: Config = {
			...Specs[_chainType]!.configs[network],
			provider: ETH.getProvider(_chainType),
			network,
			walletAddress: address
		};
		if (!config.provider) {
			return;
		}
		return new ContractorV2(config);
	}, [ETH.chainId, connected, _chainType, address]);
	// ------------------------watch state ----------------------
	
	useEffect(() => {
		if (connected && address) {
			AuthImart();
		}
	}, [connected, address]);
	
	const currencyUnit = useMemo(() => {
		return CURRENCIES[_chainType];
	}, [_chainType]);
	
	
	// chain type
	useEffect(() => {
		if (!ETH.chainId) return;
		const chainType = chainIdMap[ETH.chainId]
		// if not support,then logout
		if (!chainType) {
			walletLogout()
		}
		// init data
		setChainType(chainType||defaultChainType);
		setReallyChainType(chainIdMap[ETH.chainId])
	}, [ETH?.chainId]);
	
	
	return {
		contractor,
		contractorV2,
		walletLogin,
		walletLogout,
		AuthImart,
		address:waitingAuth?'':address,
		currentChainType: reallyChainType,
		currentWalletType: _walletType,
		connected,
		loginLoading,
		checkLogin,
		switchChain,
		getBalance,
		currencyUnit,
		getEnsName,
		changeToTestNetwork,
		reallyChainType,
		waitingAuth
	};
};
