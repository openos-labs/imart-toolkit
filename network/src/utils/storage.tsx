

export class Storage {


    static LatestActivatedAccount = 'LATEST_ACTIVATED_ACCOUNT';

    static setJWT(address: string, value: string) {
        return localStorage.setItem(address, value);
    }

    static getJWT(address) {
        return localStorage.getItem(address);
    }

    static setLatestAccount(account: string) {
        localStorage.setItem(this.LatestActivatedAccount, account);
    }

    static getLatestAccount(): string {
        return localStorage.getItem(this.LatestActivatedAccount) || "";
    }


}
