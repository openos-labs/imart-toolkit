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

  constructor(config: Config) {
    this.config = config;
    if (
      config.provider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.signer = this.provider.getSigner();
    }
  }

  singleCollective(contract?: string): SingleCollective {
    const address = contract || this.config.addresses["singleCollective"];
    return SingleCollective__factory.connect(address, this.provider);
  }

  multipleCollective(contract?: string): MultipleCollective {
    const address = contract || this.config.addresses["multipleCollective"];
    return MultipleCollective__factory.connect(address, this.provider);
  }

  mintToken(args: MintTokenArgs, signer?: Signer): Promise<Tx> {
    switch (args.type) {
      case "single":
        return this.singleCollective(args.contract)
          .connect(signer ?? this.signer)
          .mint(args.collection, BigNumber.from("1"), args.uri);
      case "multiple":
        return this.multipleCollective(args.contract)
          .connect(signer ?? this.signer)
          .mint(args.collection, args.balance, args.uri);
    }
  }

  createCollection(args: CreateCollectionArgs, signer?: Signer): Promise<Tx> {
    switch (args.type) {
      case "single":
        return this.singleCollective(args.contract)
          .connect(signer ?? this.signer)
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
        return this.multipleCollective(args.contract)
          .connect(signer ?? this.signer)
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
