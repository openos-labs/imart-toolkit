// @ts-check
import { CurationInterface } from "../proxy";
import { Config, Tx } from "../types";
import {
  CreateGalleryArgs,
  CreateCurationOfferArgs,
  ReplyCurationOfferArgs,
  BuyExhibitArgs,
  ListExhibitArgs,
  CancelExhibitArgs,
  RedeemExhibitArgs,
  CancelCurationOfferArgs,
  ListOwnedExhibitArgs,
  FreezeExhibitArgs,
} from "../types/curation";

export class Curation implements CurationInterface {
  readonly config: Config;
  readonly contract: string;

  constructor(config: Config) {
    this.config = config;
    this.contract = `${this.config.addresses["curation"]}`;
  }

  //curator.create_gallery
  createGallery(args: CreateGalleryArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::create_gallery`,
      type_arguments: [],
      arguments: [
        args.name,
        args.spaceType,
        args.metadataUri,
        args.payees || [],
        args.commissionRates || [],
        args.addmissions || []
      ],
    };
    return this.config?.submitTx!(payload);
  }

  creatAret=()=>{
  
  }
  // curator.create_offer
  createCurationOffer(args: CreateCurationOfferArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::send_offer`,
      type_arguments: [],
      arguments: [
        args.tokenOwner,
        args.tokenCreator,
        args.collectionName,
        args.tokenName,
        args.tokenPropertyVersion,
        args.galleryId,
        args.price,
        args.offerDuration.toString(),
        args.exhibitExpiredAt.toString(),
        args.url,
        args.additionalInfo,
      ],
    };
    return this.config?.submitTx!(payload);
  }

  // invitee.reply_offer
  replyCurationOffer(args: ReplyCurationOfferArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::reply_offer`,
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [args.offerId, args.reply],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.cancel_offer
  cancelCurationOffer(args: CancelCurationOfferArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::cancel_offer`,
      type_arguments: [],
      arguments: [args.offerId],
    };
    return this.config?.submitTx!(payload);
  }

  // visitor.buy_exhibit
  buyExhibit(args: BuyExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::buy`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.list_exhibit
  listExhibit(args: ListExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::list`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId, args.additionalInfo],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.batch_list_exhibits
  batchListExhibits(args: ListExhibitArgs[]): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.contract}::curation::batch_list`,
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [
        args.map((i) => i.galleryId),
        args.map((i) => i.exhibitId)
      ],
    };
    return this.config?.submitTx!(payload);
  }


  // curator.list_owned_exhibit
  listOwnedExhibit(args: ListOwnedExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::list_owned`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [
        args.galleryId,
        args.creator,
        args.collectionName,
        args.tokenName,
        args.propertyVersion,
        args.price,
        args.location,
      ],
    };
    return this.config?.submitTx!(payload);
  }

  //curator.batch_list_owned_exhibits
  batchListOwnedExhibits(args: ListOwnedExhibitArgs[]): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.contract}::curation::batch_list_owned`,
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [
        args.map((i) => i.galleryId),
        args.map((i) => i.creator),
        args.map((i) => i.collectionName),
        args.map((i) => i.tokenName),
        args.map((i) => i.propertyVersion),
        args.map((i) => i.price)
      ],
    };
    return this.config?.submitTx!(payload);
  }

  // curator.cancel_exhibit
  cancelExhibit(args: CancelExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::cancel`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }

  // nft_owner.redeem
  redeemExhibit(args: RedeemExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::redeem_with_freeze`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }

  // nft_owner.freeze
  freezeExhibit(args: FreezeExhibitArgs): Promise<Tx> {
    const contract = args.contract || this.contract;
    const payload = {
      type: "entry_function_payload",
      function: `${contract}::curation::redeem_with_freeze`,
      type_arguments: [args.coinType || "0x1::aptos_coin::AptosCoin"],
      arguments: [args.galleryId, args.exhibitId],
    };
    return this.config?.submitTx!(payload);
  }
}
