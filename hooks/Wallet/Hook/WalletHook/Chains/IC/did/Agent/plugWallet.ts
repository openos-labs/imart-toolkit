import {principalToAccountIdentifier} from '../../../../../../utils/IC';
import {Principal} from '@dfinity/principal';
import * as CONFIG from '../../../../Config/IC'

const whitelist = [
    '2pjor-riaaa-aaaah-qcs5q-cai',
    'py6rt-4iaaa-aaaah-qc5cq-cai',
    ...Object.values(CONFIG)
    // import.meta.env.VITE_REACT_APP_SALES_CANISTER_ID,
    // import.meta.env.VITE_REACT_APP_MINT_CANISTER_ID,
    // import.meta.env.VITE_REACT_APP_WICP_CANISTER_ID,
    // import.meta.env.VITE_REACT_APP_MARKET_ID,
    // import.meta.env.VITE_REACT_APP_LEDGER_CANISTER_ID,
    // import.meta.env.VITE_REACT_APP_STORAGE_CANISTER_ID,
];
const host = CONFIG.APP_HOST || '';
export default class PlugWallet {
    static whitelist: Array<string | any> = whitelist;

    static async verifyConnectionAndAgent(): Promise<{ principal: Principal; subAccountId: string } | false> {
        const connected = await window.ic.plug.isConnected();
        if (!connected) return false;
        if (connected && !window.ic.plug.agent) {
            await window.ic.plug.createAgent({whitelist: this.whitelist, host});
        }
        const principal = await window?.ic?.plug?.agent?.getPrincipal();
        const subAccountId = principalToAccountIdentifier(principal, 0);
        return {principal, subAccountId};
    }

    static async createAgent() {
        return await window.ic.plug.createAgent({whitelist: this.whitelist, host});
    }

    static async connect() {
        return await window?.ic?.plug.requestConnect({
            whitelist,
            host,
        });
    }
}
