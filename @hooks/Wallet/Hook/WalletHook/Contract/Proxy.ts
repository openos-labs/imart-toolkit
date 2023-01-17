import {
    AcceptOfferArgs,
    BuyTokenArgs,
    CancelOfferArgs,
    CreateOfferArgs,
    DelistTokenArgs,
    ListTokenArgs,
    Order,
    Settings,
    Token,
    TxCallable,
} from "./types";

export abstract class ContractProxy {
    constructor(settings: Settings) {}

    abstract buyToken(args: BuyTokenArgs);

    abstract listToken(args: ListTokenArgs);

    abstract delistToken(args: DelistTokenArgs);

    abstract createOffer(args: CreateOfferArgs);

    abstract cancelOffer(args: CancelOfferArgs);

    abstract acceptOffer(args: AcceptOfferArgs);

    abstract getAssets(owner: string): Promise<Token[]>;

    abstract getUserOrders(
        account: string,
        tokenIds: string[]
    ): Promise<Order[]>;

    abstract getCollectionOrders(
        collectionId: string,
        tokenIds: string[]
    ): Promise<Order[]>;
}
