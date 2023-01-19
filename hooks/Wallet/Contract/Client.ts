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

    invoke() {
        return {...this.proxy};
    }
}
