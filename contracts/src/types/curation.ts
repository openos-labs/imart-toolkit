import { BigNumberish } from "ethers";
import { Base, WithCoinType } from ".";

export interface CreateGalleryArgs extends Base {
  collection: string;
  tokenIdentifier: string;
  name: string;
  spaceType: string;
  metadataUri: string;
  payees?: string[];
  commissionRates?: BigNumberish[];
}
export interface CreateCurationOfferArgs extends Base, WithCoinType {
  tokenOwner: string;
  tokenCreator: string;
  collectionName: string;
  collectionIdentifier: string;
  tokenName: string;
  tokenIdentifier: string; // Aptos: token name, EVM: token id
  tokenPropertyVersion: string;
  galleryId: string;
  price: string;
  offerDuration: number;
  exhibitExpiredAt: number;
  url: string;
  additionalInfo: string;
}
export interface ReplyCurationOfferArgs extends Base, WithCoinType {
  offerId: string;
  reply: boolean;
}

export interface CancelCurationOfferArgs extends Base {
  offerId: string;
}

export interface BuyExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  exhibitId: string;
  price: string;
}
export interface ListExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  exhibitId: string;
  additionalInfo: string;
}

export interface ListOwnedExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  creator: string;
  collectionIdentifier: string;
  tokenIdentifier: string;
  propertyVersion: BigNumberish;
  price: BigNumberish;
  location: string;
}

export interface CancelExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  exhibitId: string;
}
export interface RedeemExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  exhibitId: string;
}

export interface FreezeExhibitArgs extends Base, WithCoinType {
  galleryId: string;
  exhibitId: string;
}
