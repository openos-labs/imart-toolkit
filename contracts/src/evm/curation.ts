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
  FreezeExhibitArgs,
  CancelCurationOfferArgs,
  ListOwnedExhibitArgs,
} from "../types/curation";
export class Curation implements CurationInterface {
  readonly config: Config;
  readonly address: Address;
  private signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;

  curation(contract?: string): CURATION {
    return Curation__factory.connect(contract || this.address, this.provider);
  }

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["curation"];
    if (
      config.provider &&
      config.provider instanceof ethers.providers.Web3Provider
    ) {
      this.provider = config.provider as ethers.providers.Web3Provider;
      this.signer = this.provider.getSigner();
    }
  }

  //curator.create_gallery
  createGallery(args: CreateGalleryArgs, _?: Signer): Promise<Tx> {
    const contract =
      args.collection === ""
        ? "0x0000000000000000000000000000000000000000"
        : args.collection;
    const tokenIdentifier =
      args.tokenIdentifier === "" ? "0" : args.tokenIdentifier;
    return this.curation(args.contract)
      .connect(this.signer)
      .createGallery(
        contract,
        tokenIdentifier,
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
    return this.curation(args.contract)
      .connect(this.signer)
      .sendOffer(
        args.collectionIdentifier,
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
    return this.curation(args.contract)
      .connect(this.signer)
      .replyOffer(BigNumber.from(args.offerId), args.reply);
  }

  // curator.cancel_offer
  cancelCurationOffer(args: CancelCurationOfferArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .cancelOffer(BigNumber.from(args.offerId));
  }

  // visitor.buy_exhibit
  buyExhibit(args: BuyExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .buy(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId), {
        value: BigNumber.from(args.price),
      });
  }

  // curator.list_exhibit
  listExhibit(args: ListExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .list(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId),
        args.additionalInfo
      );
  }

  // curator.batch_list_exhibit
  batchListExhibits(args: ListExhibitArgs[], _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .batchList(
        args.map((i) => BigNumber.from(i.galleryId)),
        args.map((i) => BigNumber.from(i.exhibitId))
      );
  }

  // curator.list_owned_exhibit
  listOwnedExhibit(args: ListOwnedExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .listOwned(
        args.galleryId,
        args.collectionIdentifier,
        args.tokenIdentifier,
        args.price,
        args.location
      );
  }

  // curator.batch_list_owned_exhibit
  batchListOwnedExhibits(args: ListOwnedExhibitArgs[], _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .batchListOwned(
        args.map((i) => i.galleryId),
        args.map((i) => i.collectionIdentifier),
        args.map((i) => i.tokenIdentifier),
        args.map((i) => i.price)
      );
  }

  // curator.cancel_exhibit
  cancelExhibit(args: CancelExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .cancel(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId));
  }

  // nft_owner.redeem
  redeemExhibit(args: RedeemExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .redeemWithFreeze(
        BigNumber.from(args.galleryId),
        BigNumber.from(args.exhibitId)
      );
  }
  freezeExhibit(args: FreezeExhibitArgs, _?: Signer): Promise<Tx> {
    return this.curation(args.contract)
      .connect(this.signer)
      .freeze(BigNumber.from(args.galleryId), BigNumber.from(args.exhibitId));
  }
}
