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
  MintTokenArgs,
  CreateCollectionArgs,
  ListExhibitArgs,
  ListOwnedExhibitArgs,
  RedeemExhibitArgs,
  ReplyCurationOfferArgs,
  Signer,
  Tx,
  ApproveArgs,
} from "../types";

export class Evm implements ContractProxy {
  readonly config: Config;
  private _market: Market;
  private _creation: Creation;
  private _curation: Curation;

  get market() {
    return this._market ?? (this._market = new Market(this.config));
  }

  get creation() {
    return this._creation ?? (this._creation = new Creation(this.config));
  }

  get curation() {
    return this._curation ?? (this._curation = new Curation(this.config));
  }

  constructor(config: Config) {
    this.config = config;
  }
  create(args: CreationArgs, signer?: Signer): Promise<Tx> {
    return this.creation.create(args, signer);
  }
  isApproved(args: ApproveArgs, signer?: Signer): Promise<Tx> {
    return this.creation.isApproved(args, signer);
  }
  approve(args: ApproveArgs, signer?: Signer): Promise<Tx> {
    return this.creation.approve(args, signer);
  }
  mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx> {
    return this.creation.mintToken(args, signer);
  }
  createCollection(args: CreateCollectionArgs, signer?: Signer): Promise<Tx> {
    return this.creation.createCollection(args, signer);
  }
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
  listOwnedExhibit(args: ListOwnedExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.listOwnedExhibit(args, signer);
  }
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.cancelExhibit(args, signer);
  }
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<any> {
    return this.curation.redeemExhibit(args, signer);
  }
}
