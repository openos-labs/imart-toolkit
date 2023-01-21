import { ContractProxy } from "../proxy";
import { Creation } from "./creation";
import { Market } from "./market";
import {
  OrderComponents,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { ListTokenArgs, CreateOfferArgs, Create, Config, Tx } from "../types";

export class Evm implements ContractProxy {
  readonly config: Config;
  private market: Market;
  private creation: Creation;

  constructor(config: Config) {
    this.market = new Market(config);
    this.creation = new Creation(config);
  }
  create(args: Create): Promise<Tx> {
    return this.creation.create(args);
  }
  buyToken(args: OrderWithCounter): Promise<Tx> {
    return this.market.buyToken(args);
  }
  listToken(args: ListTokenArgs): Promise<Tx> {
    return this.market.listToken(args);
  }
  delistToken(args: OrderComponents): Promise<Tx> {
    return this.market.delistToken(args);
  }
  createOffer(args: CreateOfferArgs): Promise<Tx> {
    return this.market.createOffer(args);
  }
  cancelOffer(args: OrderComponents): Promise<Tx> {
    return this.market.cancelOffer(args);
  }
  acceptOffer(args: OrderWithCounter): Promise<Tx> {
    return this.market.acceptOffer(args);
  }
}
