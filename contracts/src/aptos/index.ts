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
  ApproveArgs, Signer,
} from "../types";
import { Creation } from "./creation";
import { Market } from "./market";
import { Curation } from "./curation";
import { AptosClient } from "aptos";
import {PromiseOrValue} from "../typechain/common";
import {BigNumberish, Overrides} from "ethers";
import {QuickDraw as QUICKDRAW} from "../typechain";

export class Aptos implements ContractProxy {
  readonly config: Config;
  private market: Market;
  private creation: Creation;
  private curation: Curation;
  private client: AptosClient;

  constructor(config: Config) {
    this.market = new Market(config);
    this.creation = new Creation(config);
    this.curation = new Curation(config);
    this.client = new AptosClient(
      `https://fullnode.${config.network}.aptoslabs.com`
    );
  }

  wait(tx: Tx): Promise<TxReceipt> {
    const { hash } = tx;
    return this.client.waitForTransactionWithResult(hash);
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

  batchListExhibits(args: ListExhibitArgs[]): Promise<Tx> {
    return this.curation.batchListExhibits(args);
  }

  listOwnedExhibit(args: ListOwnedExhibitArgs): Promise<Tx> {
    return this.curation.listOwnedExhibit(args);
  }

  batchListOwnedExhibits(args: ListOwnedExhibitArgs[]): Promise<Tx> {
    return this.curation.batchListOwnedExhibits(args);
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
  setApprovalForAll(
    _nftContractAddress: string,
    _approved: boolean,
    signer?: any
  ): Promise<Tx> {
    throw new Error("Not implemented yet");
  }
  isApprovedForAll(
    _nftContractAddress: string,
    signer?: any
  ): Promise<boolean> {
    throw new Error("Not implemented yet");
  }
  createActivity(
    _nftContractAddress: string,
    _endBlockNumber: number,
    _activityId: number,
    _tokenIds: number[],
    signer?: Signer
  ): Promise<Tx> {
    throw new Error("Not implemented yet");
  }
  setMerkleRoot(
    _activityId: number,
    _merkleRoot: string,
    signer?: Signer
  ): Promise<Tx> {
    throw new Error("Not implemented yet");
  }
  claim(
    _organizer: string,
    _activityId: number,
    _nftContract: string,
    _tokenId: number,
    merkleProof: string[],
    signer?: Signer
  ): Promise<Tx> {
    throw new Error("Not implemented yet");
  }
  getActivityInfo(_organizer: string, _activityId: number): Promise<any> {
    throw new Error("Not implemented yet");
  }
  getRemainingTokenIds(_organizer: string, _activityId: number): Promise<any> {
    throw new Error("Not implemented yet");
  }
  withdrawPrize(_activityId: number, signer?: Signer): Promise<Tx> {
    throw new Error("Not implemented yet");
  }
  listTokenDutchAuction(args: listTokenDutchAuctionArgs,signer?:Signer): Promise<Tx>{
    throw new Error("Not implemented yet");
  }
  listTokenAscendAuction(args: listTokenAscendAuctionArgs,signer?:Signer): Promise<Tx>{
    throw new Error("Not implemented yet");
  }
  joinActivity(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
    signer?: any
  ): Promise<any> {
    throw new Error("Not implemented yet");
  }
  createActivityQuickDraw(createActivityParam: QUICKDRAW.CreateActivityParamStruct, overrides?: Overrides & { from?: PromiseOrValue<string> }, signer?: any): Promise<any> {
    throw new Error("Not implemented yet");
  }

  async getUserHasClaimedQuickDraw(user:string,_organizer: number,_activityId, signer?: Signer){
    throw new Error("Not implemented yet");
  }
  async getUserHasWinnerQuickDraw(user:string,_organizer: number,_activityId, signer?: Signer){
    throw new Error("Not implemented yet");
  }
  async emergencyWithdrawQuickDraw(_organizer: string,_activityId:number, signer?: Signer){
    return this.quickDraw.emergencyWithdraw(_organizer,_activityId,signer)
  }
  async getRemainingTokenIdsQuickDraw(_organizer: string, _activityId: number, signer?: Signer){
    throw new Error("Not implemented yet");
  }

}
