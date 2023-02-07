// @ts-nocheck

import { CreationInterface } from "../proxy";
import { ethers } from "ethers";
import { IMartCollective, IMartCollective__factory } from "../typechain";
import {
  Config,
  Tx,
  Address,
  CreationArgs,
  MintTokenArgs,
  CreateCollectionArgs,
  Signer,
} from "../types";

export class Creation implements CreationInterface {
  readonly config: Config;
  readonly address: Address;
  private provider: ethers.providers.JsonRpcProvider;
  private imartCollective: IMartCollective;

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["creation"];
    if (
      config.provider &&
      config.provider instanceof ethers.providers.Web3Provider
    ) {
      this.provider = config.provider as ethers.providers.Web3Provider;
      this.imartCollective = IMartCollective__factory.connect(
        this.address,
        this.provider
      );
    }
  }

  mintToken(args: MintTokenArgs, _?: Signer): Promise<Tx> {
    const signer = this.provider.getSigner();
    return this.imartCollective
      .connect(signer)
      .mint(args.collection, args.to, args.uri);
  }

  createCollection(args: CreateCollectionArgs, _?: Signer): Promise<Tx> {
    const signer = this.provider.getSigner();
    return this.imartCollective
      .connect(signer)
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

  async create(args: CreationArgs, _: Signer): Promise<Tx> {
    throw "Deprecated";
  }
}
