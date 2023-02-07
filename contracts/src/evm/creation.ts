// @ts-nocheck

import { CreationInterface } from "../proxy";
import { BigNumber, ethers } from "ethers";
import {
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
