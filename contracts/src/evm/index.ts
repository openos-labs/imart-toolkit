// @ts-nocheck

import { ContractProxy } from "../proxy";
import { Creation } from "./creation";
import { Market } from "./market";
import { Curation } from "./curation";
import {
  ListTokenArgs,
  CreateOfferArgs,
  FillOrderObject,
  AcceptOfferObject,
  CancelOfferObject,
  CancelOrderObject,
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
  Signer,
  Tx,
} from "../types";

export class Evm implements ContractProxy {
  readonly config: Config;
  private market: Market;
  private creation: Creation;
  private curation: Curation;

  constructor(config: Config) {
    this.market = new Market(config);
    this.creation = new Creation(config);
    this.curation = new Curation(config);
  }
  create(args: CreationArgs, signer?: Signer): Promise<Tx> {
    return this.creation.create(args, signer);
  }
  buyToken(args: FillOrderObject): Promise<Tx> {
    return this.market.buyToken(args);
  }
  listToken(args: ListTokenArgs): Promise<Tx> {
    return this.market.listToken(args);
  }
  delistToken(args: CancelOrderObject): Promise<Tx> {
    return this.market.delistToken(args);
  }
  createOffer(args: CreateOfferArgs): Promise<Tx> {
    return this.market.createOffer(args);
  }
  cancelOffer(args: CancelOfferObject): Promise<Tx> {
    return this.market.cancelOffer(args);
  }
  acceptOffer(args: AcceptOfferObject): Promise<Tx> {
    return this.market.acceptOffer(args);
  }
  createGallery(args: CreateGalleryArgs, signer?: Signer): Promise<any> {
    return this.curation.createGallery(args, signer);
  }
  createCurationOffer(
    args: CreateCurationOfferArgs,
    signer?: Signer
  ): Promise<any> {
    return this.curation.createCurationOffer(args, signer);
  }
  replyCurationOffer(
    args: ReplyCurationOfferArgs,
    signer?: Signer
  ): Promise<any> {
    return this.curation.replyCurationOffer(args, signer);
  }
  cancelCurationOffer(
    args: CancelCurationOfferArgs,
    signer?: Signer
  ): Promise<any> {
    return this.curation.cancelCurationOffer(args, signer);
  }
  buyExhibit(args: BuyExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.buyExhibit(args, signer);
  }
  listExhibit(args: ListExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.listExhibit(args, signer);
  }
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.cancelExhibit(args, signer);
  }
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.redeemExhibit(args, signer);
  }
}
