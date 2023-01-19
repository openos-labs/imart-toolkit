import {ContractProxy} from "../Proxy";
import {
    AcceptOfferArgs,
    AptosSettings,
    BuyTokenArgs,
    CancelOfferArgs,
    CreateOfferArgs,
    DelistTokenArgs,
    ListTokenArgs,
    Order,
    Settings,
    Token,
    Create
} from "../types";
import {APTOS_CREATION_ADDRESS} from "../../Hook/WalletHook/Config";

export class AptosImpl extends ContractProxy {
    settings: AptosSettings;

    constructor(settings: Settings) {
        super(settings);
        this.settings = settings as AptosSettings;
    }

    async create(args: Create) {
        const payload = {
            type: "entry_function_payload",
            function: `${
                APTOS_CREATION_ADDRESS
            }::creation::create`,
            type_arguments: [],
            arguments: [args.category,args.title, args.description,args.uri],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async buyToken(args: BuyTokenArgs) {
        const payload = {
            type: "entry_function_payload",
            function: `${this.settings.marketAddress}::FixedMarket::buy_token`,
            type_arguments: [args.coinType],
            arguments: [
                args.coinAmount,
                args.seller,
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
                args.tokenAmount,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async listToken(args: ListTokenArgs) {
        const payload = {
            type: "entry_function_payload",
            function: `${this.settings.marketAddress}::FixedMarket::list_token`,
            type_arguments: [args.coinType],
            arguments: [
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
                args.tokenAmount,
                args.coinAmount,
                args.lockedUntilSecs,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async delistToken(args: DelistTokenArgs) {
        const payload = {
            type: "entry_function_payload",
            function: `${this.settings.marketAddress}::FixedMarket::delist_token`,
            type_arguments: [args.coinType],
            arguments: [
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
                args.tokenAmount,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async createOffer(args: CreateOfferArgs) {
        const payload = {
            function: `${this.settings.marketAddress}::offer::create_offer`,
            type_arguments: [args.coinType],
            arguments: [
                args.price,
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
                args.tokenAmount,
                args.duration,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async cancelOffer(args: CancelOfferArgs) {
        const payload = {
            function: `${this.settings.marketAddress}::offer::cancel_offer`,
            type_arguments: [args.coinType],
            arguments: [
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
    }

    async acceptOffer(args: AcceptOfferArgs) {
        const payload = {
            function: `${this.settings.marketAddress}::offer::accept_offer`,
            type_arguments: [args.coinType],
            arguments: [
                args.buyer,
                args.creator,
                args.collection,
                args.name,
                args.propertyVersion,
                args.tokenAmount,
            ],
        };
        return await this.settings.signAndSubmitTransaction(payload);
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
