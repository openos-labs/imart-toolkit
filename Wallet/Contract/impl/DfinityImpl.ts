import {ContractProxy} from "../Proxy";
import {
    AcceptOfferArgs,
    BuyTokenArgs,
    CancelOfferArgs, Create,
    CreateOfferArgs,
    DelistTokenArgs,
    DfinitySettings,
    ListTokenArgs,
    Order,
    Settings,
    Token,
} from "../types";
import {Principal} from "@dfinity/principal";
import {idlFactory as wicpDid} from "../../Hook/WalletHook/Chains/IC/did/wicp.did";
import {idlFactory as minDid} from "../../Hook/WalletHook/Chains/IC/did/public-mint.did";
import {idlFactory as MarketDid} from "../../Hook/WalletHook/Chains/IC/did/market.did";
import {idlFactory as singleSaleDid} from "../../Hook/WalletHook/Chains/IC/did/sale.did.js";
import BigNumber from "bignumber.js";
import {APTOS_CREATION_ADDRESS} from "../../Hook/WalletHook/Config";

export class DfinityImpl extends ContractProxy {
    settings: DfinitySettings;

    constructor(settings: Settings) {
        super(settings);
        this.settings = settings as DfinitySettings;
    }

    async buyToken(args: BuyTokenArgs) {
        const price = new BigNumber(args.coinAmount)
            .div(new BigNumber(Math.pow(10, 8)))
            .toString();
        const payload = [
            {
                idl: wicpDid,
                canisterId: this.settings.wicpCanisterId,
                methodName: "approve",
                args: [
                    Principal.fromText(args.tokenId),
                    BigInt(args.coinAmount),
                ],
            },
            {
                idl: singleSaleDid,
                canisterId: args.tokenId,
                methodName: "buy",
                args: [price],
            },
        ];
        return await this.settings.batchTransactions(payload);
    }

    async listToken(args: ListTokenArgs) {
        const payload = [
            {
                idl: minDid,
                canisterId: String(args.collection),
                methodName: "approve",
                args: [
                    args.tokenId,
                    Principal.fromText(this.settings.marketCanisterId),
                ],
            },
            {
                idl: MarketDid,
                canisterId: this.settings.marketCanisterId,
                methodName: "listToken",
                // @ts-ignore
                args: [...arguments],
            },
        ];
        return await this.settings.batchTransactions(payload);
    }
    async create(args: Create) {


    }
    async delistToken(args: DelistTokenArgs) {
        const payload = [
            {
                idl: minDid,
                canisterId: this.settings.mintCanisterId,
                methodName: "approve",
                args: [
                    args.tokenId,
                    Principal.fromText(this.settings.marketCanisterId),
                ],
            },
            {
                idl: MarketDid,
                canisterId: this.settings.marketCanisterId,
                methodName: "cancelOrder",
                args: [args.tokenId],
            },
        ];
        return await this.settings.batchTransactions(payload);
    }

    async createOffer(args: CreateOfferArgs) {
        const payload = [
            {
                idl: MarketDid,
                canisterId: this.settings.marketCanisterId,
                methodName: "offerIt",
                args: [args.collection, args.tokenId, args.price, args.duration],
            },
        ];
        return await this.settings.batchTransactions(payload);
    }

    cancelOffer(args: CancelOfferArgs) {
        throw new Error("Method not implemented.");
    }

    acceptOffer(args: AcceptOfferArgs) {
        throw new Error("Method not implemented.");
    }

    getAssets(owner: string): Promise<Token[]> {
        throw new Error("Method not implemented.");
    }

    getUserOrders(account: string, tokenIds: string[]): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

    getCollectionOrders(
        collectionId: string,
        tokenIds: string[]
    ): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}
