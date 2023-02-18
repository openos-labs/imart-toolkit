// @ts-nocheck
import { MarketInterface } from "../proxy";
import {
  BuyTokenArgs,
  ListTokenArgs,
  DelistTokenArgs,
  CreateOfferArgs,
  CancelOfferArgs,
  AcceptOfferArgs,
  FillOrderObject,
} from "../types/market";
import { Config, Tx } from "../types";

export class Market implements MarketInterface {
  readonly config: Config;
  readonly handle: string;
  constructor(config: Config) {
    this.config = config;
    this.handle = `${this.config.addresses["market"]}::fixed_price_market`;
  }
  buyToken(args: BuyTokenArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::buy_token`,
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
    return this.config?.submitTx!(payload);
  }

  batchBuyTokens(args: FillOrderObject[]): Promise<any> {
    if (args.length == 0) return;
    const coinAmounts = args.map((_) => _.coinAmount);
    const sellers = args.map((_) => _.seller);
    const creators = args.map((_) => _.creator);
    const collections = args.map((_) => _.collection);
    const names = args.map((_) => _.name);
    const propertyVersions = args.map((_) => _.propertyVersion);
    const tokenAmounts = args.map((_) => _.tokenAmount);
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::batch_buy_tokens`,
      type_arguments: [args[0].coinType],
      arguments: [
        coinAmounts,
        sellers,
        creators,
        collections,
        names,
        propertyVersions,
        tokenAmounts,
      ],
    };
    return this.config?.submitTx!(payload);
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
    return this.config?.submitTx!(payload);
  }

  batchListTokens(args: ListTokenArgs[]): Promise<any> {
    if (args.length == 0) return;
    const creators = args.map((_) => _.creator);
    const collections = args.map((_) => _.collection);
    const names = args.map((_) => _.name);
    const propertyVersions = args.map((_) => _.propertyVersion);
    const tokenAmounts = args.map((_) => _.tokenAmount);
    const coinAmounts = args.map((_) => _.coinAmount);
    const lockedUntilSecs = args.map((_) => _.lockedUntilSecs);
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::batch_list_tokens`,
      type_arguments: [args[0].coinType],
      arguments: [
        creators,
        collections,
        names,
        propertyVersions,
        tokenAmounts,
        coinAmounts,
        lockedUntilSecs,
      ],
    };
    return this.config?.submitTx!(payload);
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
    return this.config?.submitTx!(payload);
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
    return this.config?.submitTx!(payload);
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
    return this.config?.submitTx!(payload);
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
    return this.config?.submitTx!(payload);
  }
}
