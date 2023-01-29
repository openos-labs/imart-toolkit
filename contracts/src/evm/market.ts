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

export class Market implements MarketInterface {
  provider: any;
  seaport: Seaport;
  readonly config: Config;
  constructor(config: Config) {
    this.config = config;
    this.provider = config.provider;
    if (this.provider && this.provider instanceof JsonRpcProvider) {
      this.seaport = new Seaport(this.provider);
    }
  }

  async buyToken(args: OrderWithCounter, signer?: Signer): Promise<Tx> {
    const account = await signer.getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }

  async listToken(args: ListTokenArgs, signer?: Signer): Promise<Tx> {
    const offerer = await signer.getAddress();
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

  async delistToken(args: OrderComponents, signer?: Signer): Promise<Tx> {
    const seller = await signer.getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async createOffer(args: CreateOfferArgs, signer?: Signer): Promise<Tx> {
    const offerer = await signer.getAddress();
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

  async cancelOffer(args: OrderComponents, signer?: Signer): Promise<Tx> {
    const seller = await signer.getAddress();
    const { transact } = this.seaport.cancelOrders([args], seller);
    return await transact();
  }

  async acceptOffer(args: OrderWithCounter, signer?: Signer): Promise<Tx> {
    const account = await signer.getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args,
      accountAddress: account,
    });
    return await executeAllActions();
  }
}
