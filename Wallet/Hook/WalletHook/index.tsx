import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "@manahippo/aptos-wallet-adapter"
import { AptosWallet } from "./Chains/Aptos"
import { ETHWallet } from "./Chains/ETH"
import { ICWallet } from "./Chains/IC"
import { getNonce, auth, isAuth } from "./Api"
import axios from "axios"
import Storage from "../../utils/storage"
import {
	defaultValue,
	APTOS_MARKET_ADDRESS,
	APTOS_SINGLE_COLLECTIVE_ADDRESS,
	APTOS_MULTIPLE_COLLECTIVE_ADDRESS,
	APTOS_CURATION_ADDRESS,
	ETH_SINGLE_COLLECTIVE_ADDRESS,
	ETH_MULTIPLE_COLLECTIVE_ADDRESS,
	ETH_CURATION_ADDRESS,
	ETH_MARKET_ADDRESS
} from "./Config"
import { ChainType, SignMessageResponse, WalletType } from "./Types"
import { Contractor, Aptos, Evm, Contract, Config } from "../../../contracts/src"
import { POLYGON_CURATION_ADDRESS, POLYGON_MARKET_ADDRESS, POLYGON_MULTIPLE_COLLECTIVE_ADDRESS, POLYGON_SINGLE_COLLECTIVE_ADDRESS } from "./Config/POLYGON"


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
	getBalance: () => Promise<string>|any,
	currencyUnit: string
}


export const WalletHook = (): HookResponse => {
    const APTOS = AptosWallet();
    const ETH = ETHWallet();
	const POLYGON = ETHWallet();
    const IC = ICWallet();
    const {signAndSubmitTransaction} = useWallet();
    const [_chainType, setChainType] = useState<ChainType>('');
    const [_walletType, setWalletType] = useState<WalletType>('')
	const [loginLoading, setLoginLoading] = useState<boolean>(false)
	// wallet  gather
	const walletGather = useMemo(() => {
		return { APTOS, POLYGON, ETH }
	}, [APTOS, POLYGON, ETH])
	
	
	// login
	const walletLogin = async (chainType: ChainType, walletType: WalletType) => {
		setLoginLoading(true)
		await walletGather[chainType]["login"](walletType)
		// cache status
		Storage.setWalletTypeStorage(walletType)
		Storage.setChainTypeStorage(chainType)
		
		// Storage.
		setChainType(chainType)
		setWalletType(walletType)
		setLoginLoading(false)
	}
	
	// current already connected wallet object
	const { connected, address, walletLogout, currentConnectedWallet, getBalance } = useMemo(() => {
		if (!_chainType) {
			return defaultValue
		}
		const _currentConnectedWallet = walletGather[_chainType]
		//connected
		const connected = (): boolean => {
			return !!(_currentConnectedWallet && _currentConnectedWallet["connected"])
		}
		// address
		const address = (): string => {
			const _address = _currentConnectedWallet["address"]
			Storage.setLatestAccount(_address)
			return _address
		}
		// walletLogout
		const walletLogout = async () => {
			return await _currentConnectedWallet["logout"]()
		}
		//getBalance
		const getBalance = async ()=> {
			return await _currentConnectedWallet?.getBalance()
		}
		return {
			address: address(),
			connected: connected(),
			walletLogout,
			currentConnectedWallet: _currentConnectedWallet,
			getBalance
		}
	}, [_chainType, _walletType, walletGather])
	
	
	// Authorization for imart backend
	const AuthImart = async () => {
		if (!currentConnectedWallet) {
			return false
		}
		if (await isAuth()) {
			return
		}
		
		const { publicKey, address } = currentConnectedWallet
		if (!address) {
			return
		}
		const data = await getNonce(
			publicKey as string,
			address as string
		)
		
		let _singMessage
		if (_chainType === "APTOS") {
			_singMessage = APTOS.walletSignMessage
		} else {
			_singMessage = ETH.walletSignMessage
		}
		if (!_singMessage) {
			throw new Error("no this wallet")
		}
		const signed = (await _singMessage(data.message, data.nonce)) as SignMessageResponse
		const authPayload = {
			chain: _chainType,
			address: address!.toString(),
			publicKey: publicKey!.toString(),
			signature: (signed?.signature || signed) as string
		}
		const authResult = await auth(authPayload)
		if (authResult?.authorization) {
			axios.defaults.headers.common["Authorization"] =
				authResult?.authorization
			Storage.setJWT(`token:${address}`, authResult?.authorization)
			return true
		}
		return false
	}
	
	
	const switchChain = async (chainType: ChainType, walletType: WalletType) => {
		Storage.clearWallet()
		await walletLogout()
		await walletLogin(chainType, walletType)
	}
	
	
	// Check if you are logged in
	const checkLogin = async () => {
		const cachedChainType = Storage.getChainTypeStorage() ?? ""
		const cachedWalletType = Storage.getWalletTypeStorage() ?? ""
		
		if (!await isAuth()) {
			return
		}
		if (cachedChainType && cachedWalletType) {
			return walletLogin(cachedChainType, cachedWalletType)
		}
	}
	const contractor: Contract = useMemo(() => {
		if (!connected) {
			return {} as any
		}
		switch (_chainType) {
			case "ETH": {
				const configuration: Config = {
					network: "testnet",
					addresses: {
						singleCollective: ETH_SINGLE_COLLECTIVE_ADDRESS,
						multipleCollective: ETH_MULTIPLE_COLLECTIVE_ADDRESS,
						curation: ETH_CURATION_ADDRESS,
						market: ETH_MARKET_ADDRESS
					},
					provider: ETH.getProvider()
				}
				if (!configuration.provider) {
					return
				}
				return Contractor(Evm, configuration)
			}
			case "POLYGON": 
				const polygonConf: Config = {
					network: "testnet",
					addresses: {
						singleCollective: POLYGON_SINGLE_COLLECTIVE_ADDRESS,
						multipleCollective: POLYGON_MULTIPLE_COLLECTIVE_ADDRESS,
						curation: POLYGON_CURATION_ADDRESS,
						market: POLYGON_MARKET_ADDRESS
					},
					provider: ETH.getProvider()
				}
				if (!polygonConf.provider) {
					return
				}
				return Contractor(Evm, polygonConf)
			case "APTOS":
				const configuration: Config = {
					network: "testnet",
					addresses: {
						singleCollective: APTOS_SINGLE_COLLECTIVE_ADDRESS,
						multipleCollective: APTOS_MULTIPLE_COLLECTIVE_ADDRESS,
						curation: APTOS_CURATION_ADDRESS,
						market: APTOS_MARKET_ADDRESS
					},
					submitTx: signAndSubmitTransaction
				}
				return Contractor(Aptos, configuration)
			default: {
			}
		}
	}, [_chainType, ETH, connected])
	// ------------------------watch state ----------------------
	useEffect(() => {
		if (connected) {
			AuthImart()
		}
	}, [connected])
	
	const currencyUnit = useMemo(() => {
		switch (_chainType) {
			case "APTOS":
				return "APT"
			case "ETH":
				return "ETH"
			case "POLYGON":
				return "MATIC"
			default:
				return ""
		}
	}, [_chainType])
	
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
		currencyUnit
	}
}
