// @ts-nocheck

import { ContractProxy } from "../proxy";
import { Creation } from "./creation";
import { Market } from "./market";
import { Curation } from "./curation";
import { NftLottery } from "./nft_lottery";
import { QuickDraw } from "./QuickDraw";
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
  FreezeExhibitArgs,
  ReplyCurationOfferArgs,
  Signer,
  Tx,
  ApproveArgs,
} from "../types";
import { ethers } from "ethers";
import { QuickDraw as QUICKDRAW } from "../typechain";

export class Evm implements ContractProxy {
  readonly config: Config;
  private _market: Market;
  private _creation: Creation;
  private _curation: Curation;
  private _nftLottery: NftLottery;
  private _quickDraw: QuickDraw;
  get market() {
    return this._market ?? (this._market = new Market(this.config));
  }

  get creation() {
    return this._creation ?? (this._creation = new Creation(this.config));
  }

  get curation() {
    return this._curation ?? (this._curation = new Curation(this.config));
  }

  get nftLottery() {
    return this._nftLottery ?? (this._nftLottery = new NftLottery(this.config));
  }

  get quickDraw() {
    return this._quickDraw ?? (this._quickDraw = new QuickDraw(this.config));
  }

  constructor(config: Config) {
    this.config = config;
  }
  wait(tx: Tx): Promise<TxReceipt> {
    return (tx as ethers.ContractTransaction).wait();
  }
  create(args: CreationArgs, signer?: Signer): Promise<Tx> {
    return this.creation.create(args, signer);
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
  listTokenDutchAuction(
    args: listTokenDutchAuctionArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.market.listTokenDutchAuction(args, signer);
  }
  listTokenAscendAuction(
    args: listTokenAscendAuctionArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.market.listTokenAscendAuction(args, signer);
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
  isApproved(args: ApproveArgs, signer?: Signer): Promise<boolean> {
    return this.curation.isApproved(args, signer);
  }
  approve(args: ApproveArgs, signer?: Signer): Promise<Tx> {
    return this.curation.approve(args, signer);
  }
  createGallery(args: CreateGalleryArgs, signer?: Signer): Promise<any> {
    return this.curation.createGallery(args, signer);
  }
  createCurationOffer(
    args: CreateCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation.createCurationOffer(args, signer);
  }
  replyCurationOffer(
    args: ReplyCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation.replyCurationOffer(args, signer);
  }
  cancelCurationOffer(
    args: CancelCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation.cancelCurationOffer(args, signer);
  }
  buyExhibit(args: BuyExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.buyExhibit(args, signer);
  }
  listExhibit(args: ListExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.listExhibit(args, signer);
  }
  listOwnedExhibit(args: ListOwnedExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.listOwnedExhibit(args, signer);
  }
  batchListExhibits(args: ListExhibitArgs[], signer?: Signer): Promise<Tx> {
    return this.curation.batchListExhibits(args, signer);
  }
  batchListOwnedExhibits(
    args: ListOwnedExhibitArgs[],
    signer?: Signer
  ): Promise<Tx> {
    return this.curation.batchListOwnedExhibits(args, signer);
  }
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.cancelExhibit(args, signer);
  }
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.redeemExhibit(args, signer);
  }
  freezeExhibit(args: FreezeExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation.freezeExhibit(args, signer);
  }

  // NFT Lottery
  isApprovedForAll(contract: string, signer?: Signer): Promise<boolean> {
    return this.nftLottery.isApprovedForAll(contract, signer);
  }

  setApprovalForAll(
    _nftContractAddress: string,
    _approved: boolean,
    signer?: Signer
  ): Promise<Tx> {
    return this.nftLottery.setApprovalForAll(
      _nftContractAddress,
      _approved,
      signer
    );
  }

  createActivity(
    _nftContractAddress: string,
    _endBlockNumber: number,
    _activityId: number,
    _tokenIds: number[],
    signer?: Signer
  ): Promise<Tx> {
    return this.nftLottery.createActivity(
      _nftContractAddress,
      _endBlockNumber,
      _activityId,
      _tokenIds,
      signer
    );
  }

  setMerkleRoot(
    _activityId: number,
    _merkleRoot: string,
    signer?: Signer
  ): Promise<Tx> {
    return this.nftLottery.setMerkleRoot(_activityId, _merkleRoot, signer);
  }

  claim(
    _organizer: string,
    _activityId: number,
    _nftContract: string,
    _tokenId: number,
    merkleProof: string[],
    signer?: Signer
  ): Promise<Tx> {
    return this.nftLottery.claim(
      _organizer,
      _activityId,
      _nftContract,
      _tokenId,
      merkleProof,
      signer
    );
  }
  getActivityInfo(_organizer: string, _activityId: number): Promise<any> {
    return this.nftLottery.getActivityInfo(_organizer, _activityId);
  }
  getRemainingTokenIds(_organizer: string, _activityId: number): Promise<any> {
    return this.nftLottery.getRemainingTokenIds(_organizer, _activityId);
  }

  withdrawPrize(_activityId: number, signer?: Signer): Promise<Tx> {
    return this.nftLottery.withdrawPrize(_activityId, signer);
  }
  getUserHasClaimed(
    user: string,
    organizer: string,
    activityId: number,
    signer?: any
  ): Promise<boolean> {
    return this.nftLottery.getUserHasClaimed(
      user,
      organizer,
      activityId,
      signer
    );
  }

  async hasPermissionOf(
    contracts: Array<string>,
    user: string
  ): Promise<boolean> {
    return this.nftLottery.hasPermissionOf(contracts, user);
  }
  async joinActivity(_activityId: number, _organizer: string, inviteCode?:number,signer?: Signer) {
    return this.quickDraw.joinActivity(_activityId, _organizer, inviteCode, signer);
  }
  async getUserHasClaimedQuickDraw(
    user: string,
    _organizer: string,
    _activityId: number,
    signer?: Signer
  ) {
    return this.quickDraw.getUserHasClaimed(user, _organizer, _activityId);
  }
  async getUserHasWinnerQuickDraw(
    user: string,
    _organizer: string,
    _activityId: number,
    signer?: Signer
  ) {
    return this.quickDraw.getUserHasWinner(user, _organizer, _activityId);
  }
  async emergencyWithdrawQuickDraw(
    _organizer: string,
    _activityId: number,
    signer?: Signer
  ) {
    return this.quickDraw.emergencyWithdraw(_organizer, _activityId, signer);
  }
  async getRemainingTokenIdsQuickDraw(
    _organizer: string,
    _activityId: number,
    signer?: Signer
  ) {
    return this.quickDraw.getRemainingTokenIds(_organizer, _activityId);
  }
  async createActivityQuickDraw(
    createActivityParam: QUICKDRAW.CreateActivityParamStruct,
    signer?: Signer
  ) {
    return this.quickDraw.createActivity(createActivityParam, signer);
  }
  getActivityTotalPartcipant(
    _organizer: string,
    _activityId: number
  ): Promise<BigNumber> {
    return this.quickDraw.getActivityTotalPartcipant(_organizer, _activityId);
  }

  createReffralPool(
    createReffralPoolParam: QUICKDRAW.CreateReffralPoolParamStruct,
    signer?: Signer
  ): Promise<ContractTransaction> {
    return this.quickDraw.createReffralPool(createReffralPoolParam, signer);
  }
  getInvitedCode(
    userAddress: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<BigNumber> {
    return this.quickDraw.getInvitedCode(userAddress, signer);
  }

  claimRefferallPrize(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<ContractTransaction> {
    return this.quickDraw.claimRefferallPrize(activityId, organizer, signer);
  }

  getLeaderboard(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<string[]> {
    return this.quickDraw.getLeaderboard(activityId, organizer, signer);
  }
  
  getLeaderBoardList(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<string[]> {
    return this.quickDraw.getLeaderBoardList(activityId, organizer, signer);
  }
  getUserInfo(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    userAddress: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<[string, BigNumber, BigNumber]> {
    return this.quickDraw.getUserInfo(
      activityId,
      organizer,
      userAddress,
      signer
    );
  }
  getQuickDrawInstance(signer?: Signer): QUICKDRAW {
    return this.quickDraw.getInstance(signer);
  }
}
