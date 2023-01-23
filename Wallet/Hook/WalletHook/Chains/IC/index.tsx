import plugWallet from "./did/Agent/plugWallet";
// @/utils/common
import {principalToAccountIdentifier} from "../../../../utils/IC";
import {useMemo, useState} from "react";
import {GetAgent} from "./did/Agent";

export const ICWallet = () => {
    const [account, setAccount] = useState<{ address: string, connected: boolean, publicKey: string }>({
        address: '',
        connected: false,
        publicKey: ''
    })
    let subAccountId: string = '';
    const login = async () => {
        if (!window.ic || !window.ic.plug) {
            window.open("https://plugwallet.ooo");
            return;
        }
        const result = await plugWallet.connect();
        if (result) {
            await plugWallet.createAgent();
            const address = await window?.ic?.plug?.agent?.getPrincipal();
            subAccountId = principalToAccountIdentifier(address, 0);
            GetAgent.setOwner(address as any);
            setAccount({address, connected: true, publicKey: ''})
            return;
        }
        setAccount((_value: any) => {
            _value.connected = false;
            return {..._value}
        })

        return false;
    }
    const logout = async () => {
        window.ic?.plug?.disconnect();
        setAccount((_value: any) => {
            _value.connected = false;
            return {..._value}
        })
        return true;
    }

    return {login, subAccountId, address: account.address, logout, connected: account.connected}

}
