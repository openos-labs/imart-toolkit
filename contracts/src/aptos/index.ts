import { ContractProxy } from "../proxy";
import {
  BuyTokenArgs,
  ListTokenArgs,
  DelistTokenArgs,
  CreateOfferArgs,
  CancelOfferArgs,
  AcceptOfferArgs,
  Create,
  Config,
  Tx,
} from "../types";
import { Creation } from "./creation";
import { Market } from "./market";

export class Aptos implements ContractProxy {
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
}
