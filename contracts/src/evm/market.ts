// @ts-check
import { MarketInterface } from "../proxy";
import { ListTokenArgs, CreateOfferArgs } from "../types/market";
import { Config, Signer, Tx } from "../types";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { JsonRpcProvider } from "@ethersproject/providers";
import {
  OrderComponents,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";

export class Market implements MarketInterface {
  private provider: ethers.providers.JsonRpcProvider;
  private seaport: Seaport;
  readonly config: Config;
  constructor(config: Config) {
    this.config = config;
    this.provider = config.provider;
    if (
      config.provider &&
      config.provider instanceof ethers.providers.JsonRpcProvider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.seaport = new Seaport(this.provider);
    }
  }

  async buyToken(args: OrderWithCounter, _?: Signer): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }

  async listToken(args: ListTokenArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.createOrder({
      startTime: "0",
      offer: [
        {
          itemType: ItemType.ERC721,
          token: args.collectionId,
          identifier: `${args.tokenId}`,
        },
      ],
      consideration: [
        {
          amount: args.coinAmount.toString(),
          recipient: offerer,
        },
      ],
    });
    return await executeAllActions();
  }

  async delistToken(args: OrderComponents, _?: Signer): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async createOffer(args: CreateOfferArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.createOrder({
      startTime: "0",
      offer: [
        {
          itemType: 0,
          token: "0x0000000000000000000000000000000000000000", // native ETH
          amount: args.price,
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC721,
          token: args.collectionId,
          identifier: args.tokenId,
          recipient: offerer,
        },
      ],
    });
    return await executeAllActions();
  }

  async cancelOffer(args: OrderComponents, _?: Signer): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async acceptOffer(args: OrderWithCounter, _?: Signer): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }
}
