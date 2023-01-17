import {WalletType, ChainType} from '../Hook/WalletHook/Types';

export type walletKeyType = 'WALLET_TYPE_KEY';
export default class Storage {
    static walletType: WalletType | unknown;
    static walletTypeKey: walletKeyType = 'WALLET_TYPE_KEY';
    static chainTypeKey = 'CHAIN_TYPE_KEY';
    static OrderKey = 'ORDER_KEY';
    static TabActive = 'TABACTIVE';

    static setJWT(address: string, value: string) {
        return localStorage.setItem(address, value);
    }

    static getJWT(address) {
        return localStorage.getItem(address);
    }

    static setWalletTypeStorage(value: WalletType) {
        return localStorage.setItem(this.walletTypeKey, value);
    }

    static getWalletTypeStorage(): WalletType {
        return localStorage.getItem(this.walletTypeKey) as WalletType;
    }

    static getChainTypeStorage(): ChainType {
        return localStorage.getItem(this.chainTypeKey) as ChainType;
    }

    static setChainTypeStorage(value: ChainType) {
        return localStorage.setItem(this.chainTypeKey, value);
    }

    static removeStorage() {
        return localStorage.removeItem(this.walletTypeKey);
    }

    // order
    static setOrderSessionStorage(value: any): any {
        return sessionStorage.setItem(this.OrderKey, value ? JSON.stringify(value) : value);
    }

    static getOrderSessionStorage(): any {
        let value = sessionStorage.getItem(this.OrderKey) as string;
        try {
            value = JSON.parse(value);
            return value;
        } catch {
            return value;
        }
    }

    static setTabActive(value: number): any {
        return sessionStorage.setItem(this.TabActive, JSON.stringify(value));
    }

    static getTabActive(): any {
        let value = sessionStorage.getItem(this.TabActive) as string;
        try {
            value = JSON.parse(value);
            return value;
        } catch {
            return value;
        }
    }
}
