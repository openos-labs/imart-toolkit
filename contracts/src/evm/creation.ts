// @ts-nocheck

import { CreationInterface } from "../proxy";
import { BigNumber, ethers } from "ethers";
import {
  ERC1155__factory,
  ERC721__factory,
  MultipleCollective,
  MultipleCollective__factory,
  SingleCollective,
  SingleCollective__factory,
} from "../typechain";
import {
  Config,
  Tx,
  CreationArgs,
  MintTokenArgs,
  CreateCollectionArgs,
  Signer,
  ApproveArgs,
} from "../types";

export class Creation implements CreationInterface {
  readonly config: Config;
  readonly signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;
  private singleCollective: SingleCollective;
  private multipleCollective: MultipleCollective;

  constructor(config: Config) {
    this.config = config;
    if (
      config.provider &&
      config.provider instanceof ethers.providers.JsonRpcProvider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.signer = this.provider.getSigner();
      this.singleCollective = SingleCollective__factory.connect(
        config.addresses["singleCollective"],
        this.provider
      );
      this.multipleCollective = MultipleCollective__factory.connect(
        config.addresses["multipleCollective"],
        this.provider
      );
    }
  }

  mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx> {
    switch (args.type) {
      case "single":
        return this.singleCollective
          .connect(this.signer ?? signer)
          .mint(args.collection, BigNumber.from("1"), args.uri);
      case "multiple":
        return this.multipleCollective
          .connect(this.signer ?? signer)
          .mint(args.collection, args.balance, args.uri);
    }
  }

  async isApproved(args: ApproveArgs, signer?: any): Promise<Tx> {
    const address = await this.signer.getAddress();
    const curationContract = this.config.addresses["curation"];
    switch (args.type) {
      case "single":
        const erc721 = ERC721__factory.connect(
          args.collectionIdentifier,
          this.provider
        );
        const approved = await erc721
          .connect(this.signer || signer)
          .getApproved(args.tokenIdentifier);
        return approved === curationContract;
      case "multiple":
        const erc1155 = ERC1155__factory.connect(
          args.collectionIdentifier,
          this.provider
        );
        return await erc1155
          .connect(this.signer || signer)
          .isApprovedForAll(address, curationContract);
    }
  }

  approve(args: ApproveArgs, signer?: Signer): Promise<Tx> {
    const curationContract = this.config.addresses["curation"];
    switch (args.type) {
      case "single":
        const erc721 = ERC721__factory.connect(
          args.collectionIdentifier,
          this.provider
        );
        return erc721
          .connect(this.signer || signer)
          .approve(curationContract, args.tokenIdentifier);
      case "multiple":
        const erc1155 = ERC1155__factory.connect(
          args.collectionIdentifier,
          this.provider
        );
        return erc1155
          .connect(this.signer || signer)
          .setApprovalForAll(curationContract, true);
    }
  }

  createCollection(args: CreateCollectionArgs, signer?: Signer): Promise<Tx> {
    switch (args.type) {
      case "single":
        return this.singleCollective
          .connect(this.signer ?? signer)
          .createCollection(
            args.name,
            args.category,
            args.tags,
            args.description,
            args.uri,
            args.payees,
            args.royalties,
            args.maximum
          );
      case "multiple":
        return this.multipleCollective
          .connect(this.signer ?? signer)
          .createCollection(
            args.name,
            args.category,
            args.tags,
            args.description,
            args.uri,
            args.payees,
            args.royalties,
            args.maximum
          );
    }
  }

  async create(args: CreationArgs, _: Signer): Promise<Tx> {
    throw "Deprecated";
  }
}
