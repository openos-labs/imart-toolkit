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
      this.curation = Curation__factory.connect(this.address, this.provider);
    }
  }

  //curator.create_gallery
  createGallery(args: CreateGalleryArgs, signer?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .createGallery(
        args.collection,
        args.tokenIdentifier,
        args.spaceType,
        args.name,
        args.metadataUri,
        false
      );
  }

  // curator.create_offer
  createCurationOffer(
    args: CreateCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .sendOffer(
        args.tokenCollection,
        args.tokenIdentifier,
        BigNumber.from(args.galleryId),
        BigNumber.from(args.price),
        BigNumber.from(args.commissionFeeRate),
        BigNumber.from(args.offerDuration),
        BigNumber.from(args.exhibitExpiredAt),
        args.url,
        args.additionalInfo
      );
  }

  // invitee.reply_offer
  replyCurationOffer(
    args: ReplyCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .replyOffer(BigNumber.from(args.offerId), args.reply);
  }

  // curator.cancel_offer
  cancelCurationOffer(
    args: CancelCurationOfferArgs,
    signer?: Signer
  ): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .cancelOffer(BigNumber.from(args.offerId));
  }

  // visitor.buy_exhibit
  buyExhibit(args: BuyExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .buy(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId), {
        value: BigNumber.from(args.price),
      });
  }

  // curator.list_exhibit
  listExhibit(args: ListExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .list(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId),
        args.additionalInfo
      );
  }

  // curator.cancel_exhibit
  cancelExhibit(args: CancelExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .cancel(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId));
  }

  // nft_owner.redeem
  redeemExhibit(args: RedeemExhibitArgs, signer?: Signer): Promise<Tx> {
    return this.curation
      .connect(this.provider)
      .redeemWithFreeze(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId)
      );
  }
}
