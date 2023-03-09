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
  readonly contract: string;
  constructor(config: Config) {
    this.config = config;
    this.contract = `${this.config.addresses["market"]}`;
  }
  buyToken(args: BuyTokenArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::fixed_price_market::buy_token`,
      type_arguments: [args.coinType],
      arguments: [
        args.coinAmount.toString(),
        args.seller,
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount.toString(),
      ],
    };
    return this.config?.submitTx!(payload);
  }

  batchBuyTokens(args: FillOrderObject[]): Promise<any> {
    if (args.length == 0) return;
    const coinAmounts = args.map((_) => _.coinAmount.toString());
    const sellers = args.map((_) => _.seller);
    const creators = args.map((_) => _.creator);
    const collections = args.map((_) => _.collection);
    const names = args.map((_) => _.name);
    const propertyVersions = args.map((_) => _.propertyVersion);
    const tokenAmounts = args.map((_) => _.tokenAmount.toString());
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::fixed_price_market::batch_buy_tokens`,
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
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::fixed_price_market::list_token`,
      type_arguments: [args.coinType],
      arguments: [
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount.toString(),
        args.coinAmount.toString(),
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
    const tokenAmounts = args.map((_) => _.tokenAmount.toString());
    const coinAmounts = args.map((_) => _.coinAmount.toString());
    const lockedUntilSecs = args.map((_) => _.lockedUntilSecs);
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::fixed_price_market::batch_list_tokens`,
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
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::fixed_price_market::delist_token`,
      type_arguments: [args.coinType],
      arguments: [
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount.toString(),
      ],
    };
    return this.config?.submitTx!(payload);
  }

  createOffer(args: CreateOfferArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      function: `${contract}::fixed_price_market::create_offer`,
      type_arguments: [args.coinType],
      arguments: [
        args.price,
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount.toString(),
        args.duration,
      ],
    };
    return this.config?.submitTx!(payload);
  }

  cancelOffer(args: CancelOfferArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      function: `${contract}::fixed_price_market::cancel_offer`,
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
    const contract = args.contract || this.contract;
    const payload = {
      function: `${contract}::fixed_price_market::accept_offer`,
      type_arguments: [args.coinType],
      arguments: [
        args.buyer,
        args.creator,
        args.collection,
        args.name,
        args.propertyVersion,
        args.tokenAmount.toString(),
      ],
    };
    return this.config?.submitTx!(payload);
  }
}
