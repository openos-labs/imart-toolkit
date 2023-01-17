import {Principal} from "@dfinity/principal";
import {idlFactory as wicpDid} from "../wicp.did";
import {idlFactory as minDid} from "../public-mint.did";
import {idlFactory as MarketDid} from "../market.did";
import {idlFactory as storageDid} from '../storage.did.js';
import {idlFactory as salesDid} from '../sales.did.js';
import {idlFactory as singleSaleDid} from '../sale.did.js';
import {NFToken, Market, wicp, Storage, Sales, NFTSale} from '../model';
import UserActor from './Actor';
import {ActorType} from "../../../../Types";
import {APP_HOST, MARKET, MINT, SALSE, STORAGE} from '../../../../Config/IC'

class Agent extends UserActor {
    private resolveCallbackArray: Array<Function> = [];
    public owner: Principal | undefined
    public subAccountId: string | undefined;

    constructor() {
        super();
    }

    public awaitGetOwner(): Promise<Principal> {
        return new Promise((resolve, reject) => {
            if (this.owner) {
                resolve(this.owner);
                return
            }
            this.resolveCallbackArray.push(resolve);
        })
    }

    // set AccountId
    public setSubAccountId(subAccountId: string | undefined) {
        this.subAccountId = subAccountId
    }

    public setOwner(owner: Principal) {
        this.owner = owner;
        for (const i of this.resolveCallbackArray) {
            const func = (this.resolveCallbackArray.pop());
            func && func(owner)
        }
    }


    //-------------------------------
    public async wicpActor(canisterId: string, type?: ActorType): Promise<wicp> {
        return super.createActor(wicpDid, canisterId, type);
    };

    public async NFTItemActor(type?: ActorType, canisterID?: string): Promise<NFToken> {
        return super.createActor(minDid, canisterID || MINT, type);
    }

    public async marketActor(type?: ActorType, canisterID?: string): Promise<Market> {
        return super.createActor(MarketDid, canisterID || MARKET, type);
    }

    public async storageActor(type?: ActorType): Promise<Storage> {
        return await super.createActor(storageDid, STORAGE as string, "noIdentity") as any;
    }

    public async salesActor(type?: ActorType): Promise<Sales> {
        return await super.createActor(salesDid, SALSE as string, type) as any;

    }

    public async singleSaleActor(saleCanisterID: string, type?: ActorType): Promise<NFTSale> {
        return await super.createActor(singleSaleDid, saleCanisterID as string, type);
    }

    public async commentActor(did, canisterId: string, type?: ActorType): Promise<any> {
        return await super.createActor(did, canisterId as string, type);
    }

}

export const GetAgent = new Agent();
