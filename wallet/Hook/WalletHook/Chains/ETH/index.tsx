import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {ChainResponse, ChainType} from "../../Types";
import {InjectedConnector} from "@web3-react/injected-connector";
import {ethers} from "ethers";
import Web3 from "web3";
import {useEffect} from "react";
import {SiweMessage} from "siwe";
import {supportChains, supportMainnetChains, supportTestChains} from '../../Config'

export const injected = new InjectedConnector({});
import {Buffer} from "buffer";

export const ETHWallet = (): ChainResponse => {
	const currentWallet = window.ethereum;
	const {
		active: connected,
		chainId,
		account: address,
		library,
		connector,
		activate,
		deactivate,
	} = useWeb3React<Web3Provider>();
	const login = async () => {
		try {
			await activate(injected);
			return {status: 200};
		} catch (ex) {
			console.error(ex);
		}
	};
	const logout = async () => {
		try {
			deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};
	
	const activateInjectedProvider = (providerName: "MetaMask" | "CoinBase") => {
		const {ethereum} = window as any;
		
		if (!ethereum?.providers) {
			return undefined;
		}
		
		let provider;
		switch (providerName) {
			case "CoinBase":
				provider = ethereum?.providers.find(
					({isCoinbaseWallet}) => isCoinbaseWallet
				);
				break;
			case "MetaMask":
				provider = ethereum?.providers.find(({isMetaMask}) => isMetaMask);
				break;
		}
		
		if (provider) {
			ethereum.setSelectedProvider(provider);
		}
	};
	useEffect(() => {
		activateInjectedProvider("MetaMask");
		injected.isAuthorized().then((isAuthorized) => {
			if (isAuthorized) {
				activate(injected, undefined, true).catch(() => {
				});
			}
		});
	}, []);
	
	// wallet siginMessage
	const walletSignMessage = (message: string, nonce: string) => {
		const from = address;
		const msg = `0x${Buffer.from(nonce, "utf8").toString("hex")}`;
		return currentWallet.request({
			method: "personal_sign",
			params: [msg, from, message],
		});
	};
	
	const siwe: (
		_: string,
		nonce: string
	) => Promise<{ message: string; signature: string }> = async (
		_: string,
		nonce: string
	) => {
		const now = new Date();
		const expiration = new Date(now.setDate(now.getDate() + 1));
		const siweMsg = new SiweMessage({
			expirationTime: expiration.toISOString(),
			notBefore: new Date().toISOString(),
			domain: window?.location?.host,
			uri: window?.location?.origin,
			address: address || "",
			statement: "Sign in with Ethereum to the app.",
			version: "1",
			chainId,
			nonce,
		});
		const message = siweMsg.prepareMessage();
		const signature = await getProvider()
			.getSigner()
			.signMessage(siweMsg.prepareMessage());
		return {message, signature};
	};
	
	const getProvider = (): any => {
		return currentWallet
			? new ethers.providers.Web3Provider(currentWallet)
			: ethers.providers.getDefaultProvider();
	};
	
	const getBalance = async (): Promise<string> => {
		return new Promise(async (resolve, reject) => {
			try {
				const provider = getProvider();
				if (!address || !provider) {
					resolve("");
					return;
				}
				const web3 = new Web3(provider?.provider);
				const amount = await web3.eth.getBalance(address);
				const formateNumber = +ethers.utils.formatEther(amount);
				resolve(formateNumber.toFixed(4));
			} catch (error) {
				reject(error);
			}
		});
	};
	
	const getEnsName: any = async (address) => {
		return "";
	};
	
	// type EvmChainType = "ETH" | "POLYGON" | "BSC" | "OPBNB" | "ZKSYNC";
	
	/*
		ETH:
		chainId=5, chainName=ETH goerli testnet, rpcUrls=["https://rpc-mumbai.maticvigil.com"]
		POLYGON:
		chainId=80001, chainName=Polygon mumbai testnet, rpcUrls=["https://ethereum-goerli.publicnode.com "]
		BSC:
		chainId=97 , chainName=BSC testnet, rpcUrls=["https://endpoints.omniatech.io/v1/bsc/testnet/public"]
	*/
	
	
	const chainIdToTypes = Object.entries(supportTestChains).reduce((p, [k, v]) => {
		p[v.chainId] = k;
		return p;
	}, {});
	const chainIdToHex = (chainId: number) => "0x" + Number(chainId).toString(16);
	const changeToTestNetwork = async (chainType?: string) => {
		const network = import.meta.env.ENV_NETWORK || "testnet";
		const supportNetWork = supportChains[network];
		if (!chainType || !supportNetWork) return;
		const chainId = supportNetWork[chainType]?.chainId;
		if (!chainId) {
			return
		}
		
		const hexChainId = chainIdToHex(chainId);
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{chainId: hexChainId}],
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					const chain = supportTestChains[`${chainType}`];
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [{...chain, chainId: chainIdToHex(chainId)}],
					});
				} catch (addError) {
					// handle "add" error
					// console.log("wallet_addEthereumChain error:", addError);
				}
			}
			// handle other "switch" errors
		}
	};
	
	return {
		login,
		connected,
		logout,
		address,
		chainId,
		publicKey: "undefined",
		getProvider,
		walletSignMessage,
		siwe,
		getBalance,
		getEnsName,
		changeToTestNetwork,
		chainIdToTypes,
	};
};
