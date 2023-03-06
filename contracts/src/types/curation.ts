import { BigNumberish } from "ethers";
import { WithCoinType } from ".";

export interface CreateGalleryArgs {
  collection: string;
  tokenIdentifier: string;
  name: string;
  spaceType: string;
  metadataUri: string;
  payees?: string[];
  commissionRates?: BigNumberish[];
}
export interface CreateCurationOfferArgs extends WithCoinType {
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
export interface ReplyCurationOfferArgs extends WithCoinType {
  offerId: string;
  reply: boolean;
}

export interface CancelCurationOfferArgs {
  offerId: string;
}

export interface BuyExhibitArgs extends WithCoinType {
  galleryId: string;
  exhibitId: string;
  price: string;
}
export interface ListExhibitArgs extends WithCoinType {
  galleryId: string;
  exhibitId: string;
  additionalInfo: string;
}

export interface ListOwnedExhibitArgs extends WithCoinType {
  galleryId: string;
  creator: string;
  collectionIdentifier: string;
  tokenIdentifier: string;
  propertyVersion: BigNumberish;
  price: BigNumberish;
  location: string;
}

export interface CancelExhibitArgs extends WithCoinType {
  galleryId: string;
  exhibitId: string;
}
export interface RedeemExhibitArgs extends WithCoinType {
  galleryId: string;
  exhibitId: string;
}
