import {ContractProxy} from "./Proxy";
import {AptosImpl} from "./impl/AptosImpl";
import {SeaportImpl} from "./impl/SeaportImpl";
import {DfinityImpl} from "./impl/DfinityImpl";
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

    constructor(protocol: Protocol, settings: Settings){
        switch (protocol) {
            case "aptos":
                return new AptosImpl(settings);
            case "seaport":
                return new SeaportImpl(settings);
            case "ic":
                return new DfinityImpl(settings);
        }
    }

}
