import {
    useContext,
    createContext,
    useEffect,
    useState,
    FC,
    ReactNode, useMemo,
} from "react";
import {WalletHook} from './WalletHook'
import {ChainResponse, ChainType, SignMessagePayload, SignMessageResponse, WalletType} from './WalletHook/Types';
import {ContractClient} from './WalletHook/Contract'
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
    contractClient: ContractClient,
    chainType: ChainType | string,
    walletType: WalletType | string

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
        connected,
        checkLogin,
        currentChainType,
        currentWalletType,
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
        contractClient: walletClient
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
