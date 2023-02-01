// @ts-nocheck

import {ContractProxy} from "../proxy";
import {
    BuyTokenArgs,
    ListTokenArgs,
    DelistTokenArgs,
    CreateOfferArgs,
    CancelOfferArgs,
    AcceptOfferArgs,
} from "../types/market";
import {
    BuyExhibitArgs,
    CancelCurationOfferArgs,
    CancelExhibitArgs,
    Config,
    CreateCurationOfferArgs,
    CreateGalleryArgs,
    CreationArgs,
    ListExhibitArgs,
    RedeemExhibitArgs,
    ReplyCurationOfferArgs,
    Tx,
} from "../types";
import {Creation} from "./creation";
import {Market} from "./market";
import {Curation} from "./curation";

export class Aptos implements ContractProxy {
    readonly config: Config;
    private market: Market;
    private creation: Creation;
    private curation: Curation;

    constructor(config: Config) {
        this.market = new Market(config);
        this.creation = new Creation(config);
        this.curation = new Curation(config);
    }

    // creation
    create(args: CreationArgs): Promise<Tx> {
        return this.creation.create(args);
    }

    // market
    buyToken(args: BuyTokenArgs): Promise<Tx> {
        return this.market.buyToken(args);
    }

    listToken(args: ListTokenArgs): Promise<Tx> {
        return this.market.listToken(args);
    }

    delistToken(args: DelistTokenArgs): Promise<Tx> {
        return this.market.delistToken(args);
    }

    createOffer(args: CreateOfferArgs): Promise<Tx> {
        return this.market.createOffer(args);
    }

    cancelOffer(args: CancelOfferArgs): Promise<Tx> {
        return this.market.cancelOffer(args);
    }

    acceptOffer(args: AcceptOfferArgs): Promise<Tx> {
        return this.market.acceptOffer(args);
    }

    // curation
    createGallery(args: CreateGalleryArgs): Promise<Tx> {
        return this.curation.createGallery(args);
    }

    createCurationOffer(args: CreateCurationOfferArgs): Promise<Tx> {
        return this.curation.createCurationOffer(args);
    }

    replyCurationOffer(args: ReplyCurationOfferArgs): Promise<Tx> {
        return this.curation.replyCurationOffer(args);
    }

    cancelCurationOffer(args: CancelCurationOfferArgs): Promise<Tx> {
        return this.curation.cancelCurationOffer(args);
    }

    buyExhibit(args: BuyExhibitArgs): Promise<Tx> {
        return this.curation.buyExhibit(args);
    }

    listExhibit(args: ListExhibitArgs): Promise<Tx> {
        return this.curation.listExhibit(args);
    }

    cancelExhibit(args: CancelExhibitArgs): Promise<Tx> {
        return this.curation.cancelExhibit(args);
    }

    redeemExhibit(args: RedeemExhibitArgs): Promise<Tx> {
        return this.curation.redeemExhibit(args);
    }
}
