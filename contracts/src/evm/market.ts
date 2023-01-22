import { MarketInterface } from "../proxy";
import { ListTokenArgs, CreateOfferArgs } from "../types/market";
import { Config, Tx } from "../types";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { JsonRpcProvider } from "@ethersproject/providers";
import {
  OrderComponents,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { ethers } from "ethers";

export class Market implements MarketInterface {
  provider: any;
  seaport: Seaport;
  readonly config: Config;
  constructor(config: Config) {
    this.config = config;
    if (this.provider && this.provider instanceof JsonRpcProvider) {
      this.seaport = new Seaport(this.provider);
    }
  }

  async buyToken(args: OrderWithCounter): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }

  async listToken(args: ListTokenArgs): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.createOrder({
      startTime: "0",
      offer: [
        {
          itemType: ItemType.ERC721,
          token: args.tokenId,
          identifier: `${args.tokenAmount}`,
        },
      ],
      consideration: [
        {
          amount: ethers.utils.parseEther(`${args.coinAmount}`).toString(),
          recipient: offerer,
        },
      ],
    });
    return await executeAllActions();
  }

  async delistToken(args: OrderComponents): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async createOffer(args: CreateOfferArgs): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.createOrder({
      startTime: "0",
      offer: [
        {
          token: "", // TODO: erc20 address
          amount: ethers.utils.parseEther(args.price).toString(),
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

  async cancelOffer(args: OrderComponents): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async acceptOffer(args: OrderWithCounter): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }
}
