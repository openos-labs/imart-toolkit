import {
  CreateOfferArgs,
  ListTokenArgs,
  Order,
  Token,
  CancelOrderObject,
  CancelOfferObject,
  FillOrderObject,
  AcceptOfferObject,
} from "./types/market";
import {
  Config,
  CreateCollectionArgs,
  MintTokenArgs,
  CreationArgs,
  Signer,
  Tx,
} from "./types";
import {
  BuyExhibitArgs,
  CancelCurationOfferArgs,
  CancelExhibitArgs,
  CreateCurationOfferArgs,
  CreateGalleryArgs,
  ListExhibitArgs,
  RedeemExhibitArgs,
  ReplyCurationOfferArgs,
} from "./types/curation";

export interface CreationInterface {
  config: Config;
  create(args: CreationArgs, signer?: Signer): Promise<Tx>;
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
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx>;
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx>;
}

export interface ResourceInterface {
  assets(owner: string): Promise<Token[]>;
  userOrders(account: string, tokenIds: string[]): Promise<Order[]>;
  collectionOrders(collectionId: string, tokenIds: string[]): Promise<Order[]>;
}

export abstract class ContractProxy
  implements MarketInterface, CreationInterface, CurationInterface
{
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  // creation
  abstract create(args: CreationArgs, signer?: Signer): Promise<Tx>;
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
  abstract delistToken(args: CancelOrderObject, signer?: Signer): Promise<Tx>;
  abstract createOffer(args: CreateOfferArgs, signer?: Signer): Promise<Tx>;
  abstract acceptOffer(args: AcceptOfferObject, signer?: Signer): Promise<Tx>;
  abstract cancelOffer(args: CancelOfferObject, signer?: Signer): Promise<Tx>;

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
  abstract cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx>;
  abstract redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx>;
}
