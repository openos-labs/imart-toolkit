import {Actor, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {Principal} from '@dfinity/principal'
import {authClient} from './IIForIdentity';
// import {CommonStore} from "@/store/common.store";
import PlugWallet from "./plugWallet";
import {ActorType} from '../../../../Types'
import {APP_HOST} from '../../../../Config/IC'
export default class UserActor {
    public owner: Principal | undefined
    private cacheActor: Array<any> = [];
    private cacheNoIdentity: Array<any> = [];

    // async getAgent() {
    //     return new HttpAgent({
    //         host: this.host,
    //         identity: await authClient.getIdentity()
    //     });
    // }

    //no  identity
    async getNoIdentityAgent() {
        return new HttpAgent({host:APP_HOST });
    }

    public async createActor(idlFactory: any, canisterId: string | any, type: ActorType = 'noIdentity') {

        if (type === 'noIdentity') {
            return await this.noIdentityActor(idlFactory, canisterId);
        } else {
            return await this.createCacheActor(idlFactory, canisterId);
        }

    }

    private async createCacheActor(idlFactory: any, canisterId: string) {
        if (this.cacheActor[canisterId]) {
            return this.cacheActor[canisterId];
        }
        const Actor = await this.walletSelected(idlFactory, canisterId);
        this.cacheActor[canisterId] = Actor;
        return Actor
    }

    private async walletSelected(idlFactory: any, canisterId: string | any) {
        const {walletType} = {walletType: 'II'};
        switch (walletType) {
            case 'II':
            // const agent = await this.getAgent();
            // return Actor.createActor(idlFactory, {
            //     agent,
            //     canisterId,
            //
            // });
            case 'plugWallet':
                await PlugWallet.createAgent()
                return window?.ic?.plug.createActor({
                    canisterId: canisterId,
                    interfaceFactory: idlFactory,
                });
            default:
                await PlugWallet.createAgent()
                return window?.ic?.plug.createActor({
                    canisterId: canisterId,
                    interfaceFactory: idlFactory,
                });
            // const defaultAgent = await this.getAgent();
            // return Actor.createActor(idlFactory, {
            //     agent: defaultAgent,
            //     canisterId
            // });
        }
    }

    public async noIdentityActor(IdlFactory, canisterId: string): Promise<ActorSubclass> {
        if (this.cacheNoIdentity[canisterId]) return this.cacheNoIdentity[canisterId];
        const agent = await this.getNoIdentityAgent();
        const actor = Actor.createActor(IdlFactory, {
            agent,
            canisterId,
        });
        this.cacheNoIdentity[canisterId] = actor;
        return actor;
    }

}

