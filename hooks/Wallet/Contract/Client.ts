import {ContractProxy} from "./Proxy";
import {AptosImpl} from "./impl/AptosImpl";
import {SeaportImpl} from "./impl/SeaportImpl";
import {DfinityImpl} from "./impl/DfinityImpl";
import {
    AcceptOfferArgs,
    BuyTokenArgs,
    CancelOfferArgs, Create,
    CreateOfferArgs,
    DelistTokenArgs,
    ListTokenArgs,
    Order,
    Settings,
    Token,
} from "./types";

export type Protocol = "aptos" | "ic" | "seaport";

export class ContractClient implements ContractProxy {
    proxy: ContractProxy

    constructor(protocol: Protocol, settings: Settings) {
        switch (protocol) {
            case "aptos":
                this.proxy = new AptosImpl(settings);
                break
            case "seaport":
                this.proxy = new SeaportImpl(settings);
                break;
            case "ic":
                this.proxy = new DfinityImpl(settings);
                break;
        }
    }

    buyToken(args: BuyTokenArgs) {
        return this.proxy.buyToken(args)
    }

    listToken(args: ListTokenArgs) {
        return this.proxy.listToken(args)
    };

    delistToken(args: DelistTokenArgs) {
        return this.proxy.delistToken(args)
    };

    createOffer(args: CreateOfferArgs) {
        return this.proxy.createOffer(args)
    };

    cancelOffer(args: CancelOfferArgs) {
        return this.proxy.cancelOffer(args)

    };

    acceptOffer(args: AcceptOfferArgs) {
        return this.proxy.acceptOffer(args)
    };

    getAssets(owner: string): Promise<Token[]> {
        return this.proxy.getAssets(owner)
    };


    getUserOrders(
        account: string,
        tokenIds: string[]
    ): Promise<Order[]> {
        return this.proxy.getUserOrders(account, tokenIds)

    };

    getCollectionOrders(
        collectionId: string,
        tokenIds: string[]
    ): Promise<Order[]> {
        return this.proxy.getUserOrders(collectionId, tokenIds)
    };

    create(args: Create): Promise<any> {
        return this.proxy.create(args)
    };

}
