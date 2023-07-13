import {
  CreateOfferArgs,
  ListTokenArgs,
  Order,
  Token,
  CancelOrderObject,
  CancelOfferObject,
  FillOrderObject,
  AcceptOfferObject,
  listTokenDutchAuctionArgs,
  listTokenAscendAuctionArgs,
} from "./types/market";
import {
  Config,
  CreateCollectionArgs,
  MintTokenArgs,
  CreationArgs,
  Signer,
  Tx,
  ApproveArgs,
  TxReceipt,
} from "./types";
import {
  BuyExhibitArgs,
  CancelCurationOfferArgs,
  CancelExhibitArgs,
  CreateCurationOfferArgs,
  CreateGalleryArgs,
  FreezeExhibitArgs,
  ListExhibitArgs,
  ListOwnedExhibitArgs,
  RedeemExhibitArgs,
  ReplyCurationOfferArgs,
} from "./types/curation";

export interface CreationInterface {
  config: Config;
  create(args: CreationArgs, signer?: Signer): Promise<Tx>;
  approve(args: ApproveArgs, signer?: Signer): Promise<Tx>;
  isApproved(args: ApproveArgs, signer?: Signer): Promise<Tx>;
  mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx>;
  createCollection(args: CreateCollectionArgs, signer?: Signer): Promise<Tx>;
}

export interface MarketInterface {
  config: Config;
  buyToken(args: FillOrderObject, signer?: Signer): Promise<Tx>;
  listToken(args: ListTokenArgs, signer?: Signer): Promise<Tx>;
  delistToken(args: CancelOrderObject, signer?: Signer): Promise<Tx>;
  createOffer(args: CreateOfferArgs, signer?: Signer): Promise<Tx>;
  cancelOffer(args: CancelOfferObject, signer?: Signer): Promise<Tx>;
  acceptOffer(args: AcceptOfferObject, signer?: Signer): Promise<Tx>;
  batchBuyTokens(args: FillOrderObject[], signer?: Signer): Promise<Tx>;
  batchListTokens(args: ListTokenArgs[], signer?: Signer): Promise<Tx>;
  listTokenDutchAuction(args: listTokenDutchAuctionArgs,signer?:Signer): Promise<Tx>;
  listTokenAscendAuction(args: listTokenAscendAuctionArgs,signer?:Signer): Promise<Tx>;
}

export interface CurationInterface {
  config: Config;
  createGallery(args: CreateGalleryArgs, signer?: Signer): Promise<Tx>;
  createCurationOffer(
    args: CreateCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;
  replyCurationOffer(
    args: ReplyCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;
  cancelCurationOffer(
    args: CancelCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;

  buyExhibit(args: BuyExhibitArgs, signer?: Signer): Promise<Tx>;
  listExhibit(args: ListExhibitArgs, signer?: Signer): Promise<Tx>;
  batchListExhibits(args: ListExhibitArgs[], signer?: Signer): Promise<Tx>;
  listOwnedExhibit(args: ListOwnedExhibitArgs, signer?: Signer): Promise<Tx>;
  batchListOwnedExhibits(
    args: ListOwnedExhibitArgs[],
    signer?: Signer
  ): Promise<Tx>;
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx>;
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx>;
  freezeExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx>;
}

export interface ResourceInterface {
  assets(owner: string): Promise<Token[]>;
  userOrders(account: string, tokenIds: string[]): Promise<Order[]>;
  collectionOrders(collectionId: string, tokenIds: string[]): Promise<Order[]>;
}

export interface NftLotteryInterface {
  config: Config;
  setApprovalForAll(
    _nftContractAddress: string,
    _approved: boolean,
    signer?: any
  ): Promise<Tx>;
  createActivity(
    _nftContractAddress: string,
    _endBlockNumber: number,
    _activityId: number,
    _tokenIds: number[],
    signer?: Signer
  ): Promise<Tx>;
  setMerkleRoot(
    _activityId: number,
    _merkleRoot: string,
    signer?: Signer
  ): Promise<Tx>;
  claim(
    _organizer: string,
    _activityId: number,
    _nftContract: string,
    _tokenId: number,
    merkleProof: string[],
    signer?: Signer
  ): Promise<Tx>;
  getActivityInfo(_organizer: string, _activityId: number): Promise<any>;
  getRemainingTokenIds(_organizer: string, _activityId: number): Promise<any>;
  withdrawPrize(_activityId: number, signer?: Signer): Promise<Tx>;
  isApprovedForAll(
    _nftContractAddress: string,
    signer?: any
  ): Promise<boolean>;
}

export abstract class ContractProxy
  implements
    MarketInterface,
    CreationInterface,
    CurationInterface,
    NftLotteryInterface
{
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }
  abstract wait(tx: Tx): Promise<TxReceipt>;

  // creation
  abstract create(args: CreationArgs, signer?: Signer): Promise<Tx>;
  abstract isApproved(args: ApproveArgs, signer?: any): Promise<Tx>;
  abstract approve(args: ApproveArgs, signer?: any): Promise<Tx>;
  abstract mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx>;
  abstract createCollection(
    args: CreateCollectionArgs,
    signer?: Signer
  ): Promise<Tx>;

  // market
  abstract listToken(args: ListTokenArgs, signer?: Signer): Promise<Tx>;
  abstract buyToken(args: FillOrderObject, signer?: Signer): Promise<Tx>;
  abstract batchBuyTokens(
    args: FillOrderObject[],
    signer?: Signer
  ): Promise<Tx>;
  abstract batchListTokens(args: ListTokenArgs[], signer?: any): Promise<Tx>;
  abstract delistToken(args: CancelOrderObject, signer?: Signer): Promise<Tx>;
  abstract createOffer(args: CreateOfferArgs, signer?: Signer): Promise<Tx>;
  abstract acceptOffer(args: AcceptOfferObject, signer?: Signer): Promise<Tx>;
  abstract cancelOffer(args: CancelOfferObject, signer?: Signer): Promise<Tx>;
  abstract listTokenDutchAuction(args: listTokenDutchAuctionArgs,signer?:Signer): Promise<Tx>;
  abstract listTokenAscendAuction(args: listTokenAscendAuctionArgs,signer?:Signer): Promise<Tx>;
  // curation
  abstract createGallery(args: CreateGalleryArgs, signer?: Signer): Promise<Tx>;
  abstract createCurationOffer(
    args: CreateCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;
  abstract replyCurationOffer(
    args: ReplyCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;
  abstract cancelCurationOffer(
    args: CancelCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx>;
  abstract buyExhibit(args: BuyExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract listExhibit(args: ListExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract listOwnedExhibit(
    args: ListOwnedExhibitArgs,
    signer?: Signer
  ): Promise<Tx>;
  abstract cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract freezeExhibit(args: FreezeExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract batchListExhibits(
    args: ListExhibitArgs[],
    signer?: Signer
  ): Promise<Tx>;
  abstract batchListOwnedExhibits(
    args: ListOwnedExhibitArgs[],
    signer?: Signer
  ): Promise<Tx>;

  // nft lottery

  abstract setApprovalForAll(
    _nftContractAddress: string,
    _approved: boolean,
    signer?: any
  ): Promise<Tx>;
  abstract isApprovedForAll(
    _nftContractAddress: string,
    signer?: any
  ): Promise<boolean>;
  abstract createActivity(
    _nftContractAddress: string,
    _endBlockNumber: number,
    _activityId: number,
    _tokenIds: number[],
    signer?: Signer
  ): Promise<Tx>;
  abstract setMerkleRoot(
    _activityId: number,
    _merkleRoot: string,
    signer?: Signer
  ): Promise<Tx>;
  abstract claim(
    _organizer: string,
    _activityId: number,
    _nftContract: string,
    _tokenId: number,
    merkleProof: string[],
    signer?: Signer
  ): Promise<Tx>;
  abstract getActivityInfo(
    _organizer: string,
    _activityId: number
  ): Promise<any>;
  abstract getRemainingTokenIds(
    _organizer: string,
    _activityId: number
  ): Promise<any>;
  abstract withdrawPrize(_activityId: number, signer?: Signer): Promise<Tx>;
}
