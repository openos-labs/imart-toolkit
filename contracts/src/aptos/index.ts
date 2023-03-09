// @ts-nocheck

import { ContractProxy } from "../proxy";
import {
  ListTokenArgs,
  CreateOfferArgs,
  FillOrderObject,
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
  ListOwnedExhibitArgs,
  RedeemExhibitArgs,
  FreezeExhibitArgs,
  ReplyCurationOfferArgs,
  Tx,
  MintTokenArgs,
  ApproveArgs,
} from "../types";
import { Creation } from "./creation";
import { Market } from "./market";
import { Curation } from "./curation";

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
  mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx> {
    return this.creation.mintToken(args, signer);
  }
  createCollection(args: CreateCollectionArgs, signer?: Signer): Promise<Tx> {
    return this.creation.createCollection(args, signer);
  }
  isApproved(args: ApproveArgs, signer?: Signer): Promise<Tx> {
    return this.creation.isApproved(args, signer);
  }
  approve(args: ApproveArgs, signer?: any): Promise<any> {
    return this.creation.approve(args, signer);
  }

  // market
  buyToken(args: FillOrderObject): Promise<Tx> {
    return this.market.buyToken(args);
  }

  batchBuyTokens(args: FillOrderObject[]): Promise<any> {
    return this.market.batchBuyTokens(args);
  }

  listToken(args: ListTokenArgs): Promise<Tx> {
    return this.market.listToken(args);
  }

  batchListTokens(args: ListTokenArgs[]): Promise<any> {
    return this.market.batchListTokens(args);
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

  listOwnedExhibit(args: ListOwnedExhibitArgs): Promise<Tx> {
    return this.curation.listOwnedExhibit(args);
  }

  cancelExhibit(args: CancelExhibitArgs): Promise<Tx> {
    return this.curation.cancelExhibit(args);
  }

  redeemExhibit(args: RedeemExhibitArgs): Promise<Tx> {
    return this.curation.redeemExhibit(args);
  }

  freezeExhibit(args: FreezeExhibitArgs): Promise<Tx> {
    return this.curation.freezeExhibit(args);
  }
}
