import {ContractProxy} from "./Proxy";
import {AptosImpl, SeaportImpl, DfinityImpl} from "./impl";

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
} from "./types";

export type Protocol = "aptos" | "ic" | "seaport";

export class ContractClient {
    protocol: Protocol
    settings: Settings

    constructor(protocol: Protocol, settings: Settings) {
        this.protocol = protocol;
        this.settings = settings
    }

    invoke(): ContractProxy {
        switch (this.protocol) {
            case "aptos":
                return new AptosImpl(this.settings);
            case "seaport":
                return new SeaportImpl(this.settings);
            case "ic":
                return new DfinityImpl(this.settings);
        }
    }
}
