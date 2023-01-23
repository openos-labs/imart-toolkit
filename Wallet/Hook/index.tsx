import {
    useContext,
    createContext,
    useEffect,
    useState,
    FC,
    ReactNode, useMemo,
} from "react";

export * from './WalletHook/Types';
import {WalletHook} from './WalletHook'
import {ChainResponse, ChainType, SignMessagePayload, SignMessageResponse, WalletType} from './WalletHook/Types';
import {ContractProxy} from '../Contract'
import {Contract, Contractor} from "../../contracts/src"

declare global {
    interface Window {
        ic: any;
        aptos: any;
        martian: any;
    }
}

interface AuthProps {
    logOut: () => any,
    login: (chainType: ChainType, walletType: WalletType) => any,
    isAuth: boolean,
    address: string,
    loginLoading: boolean,
    contractClient: Contract,
    contractor: Contract,
    chainType: ChainType | string,
    walletType: WalletType | string
    switchChain: (chainType: ChainType, walletType: WalletType) => any,
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const {
        address,
        loginLoading,
        walletLogin,
        walletLogout,
        walletClient,
        contractor: contractor,
        connected,
        checkLogin,
        currentChainType,
        currentWalletType,
        switchChain
    } = WalletHook()

    useEffect(() => {
        checkLogin();
    }, [])
    const Context: AuthProps = {
        chainType: currentChainType,
        walletType: currentWalletType,
        logOut: walletLogout,
        login: walletLogin,
        isAuth: connected,
        address,
        loginLoading,
        contractClient: contractor,
        contractor,
        switchChain
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
