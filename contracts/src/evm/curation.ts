// @ts-nocheck

import { BigNumber, ethers } from "ethers";
import { CurationInterface } from "../proxy";
import { Curation__factory, Curation as CURATION } from "../typechain";
import { Address, Config, Signer, Tx } from "../types";
import {
  CreateGalleryArgs,
  CreateCurationOfferArgs,
  ReplyCurationOfferArgs,
  BuyExhibitArgs,
  ListExhibitArgs,
  CancelExhibitArgs,
  RedeemExhibitArgs,
  CancelCurationOfferArgs,
} from "../types/curation";
export class Curation implements CurationInterface {
  readonly config: Config;
  readonly address: Address;
  private signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;
  private curation: CURATION;

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["curation"];
    if (
      config.provider &&
      config.provider instanceof ethers.providers.Web3Provider
    ) {
      this.provider = config.provider as ethers.providers.Web3Provider;
      this.signer = this.provider.getSigner();
      this.curation = Curation__factory.connect(this.address, this.provider);
    }
  }

  //curator.create_gallery
  createGallery(args: CreateGalleryArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .createGallery(
        args.collection,
        args.tokenIdentifier,
        args.spaceType,
        args.name,
        args.metadataUri,
        false,
        args.payees || [],
        args.commissionRates || []
      );
  }

  // curator.create_offer
  createCurationOffer(args: CreateCurationOfferArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .sendOffer(
        args.tokenCollection,
        args.tokenIdentifier,
        BigNumber.from(args.galleryId),
        BigNumber.from(args.price),
        BigNumber.from(args.offerDuration),
        BigNumber.from(args.exhibitExpiredAt),
        args.url,
        args.additionalInfo
      );
  }

  // invitee.reply_offer
  replyCurationOffer(args: ReplyCurationOfferArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .replyOffer(BigNumber.from(args.offerId), args.reply);
  }

  // curator.cancel_offer
  cancelCurationOffer(args: CancelCurationOfferArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .cancelOffer(BigNumber.from(args.offerId));
  }

  // visitor.buy_exhibit
  buyExhibit(args: BuyExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .buy(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId), {
        value: BigNumber.from(args.price),
      });
  }

  // curator.list_exhibit
  listExhibit(args: ListExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .list(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId),
        args.additionalInfo
      );
  }

  // curator.cancel_exhibit
  cancelExhibit(args: CancelExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .cancel(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId));
  }

  // nft_owner.redeem
  redeemExhibit(args: RedeemExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.signer)
      .redeemWithFreeze(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId)
      );
  }
}
