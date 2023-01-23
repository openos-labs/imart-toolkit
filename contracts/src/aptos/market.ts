import { MarketInterface } from "../proxy";
import {
  BuyTokenArgs,
  ListTokenArgs,
  DelistTokenArgs,
  CreateOfferArgs,
  CancelOfferArgs,
  AcceptOfferArgs,
} from "../types/market";
import { Config, Tx } from "../types";

export class Market implements MarketInterface {
  readonly config: Config;
  readonly handle: string;
  constructor(config: Config) {
    this.config = config;
    this.handle = `${this.config.addresses["market"]}::FixedMarket`;
  }
  buyToken(args: BuyTokenArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::buy_token`,
      type_arguments: [args.coinType],
      arguments: [
        args.coinAmount,
        args.seller,
        args.owner,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount,
      ],
    };
    return this.config.submitTx(payload);
  }

  listToken(args: ListTokenArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::list_token`,
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
    return this.config.submitTx(payload);
  }

  delistToken(args: DelistTokenArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::delist_token`,
      type_arguments: [args.coinType],
      arguments: [
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount,
      ],
    };
    return this.config.submitTx(payload);
  }

  createOffer(args: CreateOfferArgs): Promise<Tx> {
    const payload = {
      function: `${this.handle}::create_offer`,
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
    return this.config.submitTx(payload);
  }

  cancelOffer(args: CancelOfferArgs): Promise<Tx> {
    const payload = {
      function: `${this.handle}::cancel_offer`,
      type_arguments: [args.coinType],
      arguments: [
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
      ],
    };
    return this.config.submitTx(payload);
  }

  acceptOffer(args: AcceptOfferArgs): Promise<Tx> {
    const payload = {
      function: `${this.handle}::accept_offer`,
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
    return this.config.submitTx(payload);
  }
}
