import { MarketInterface } from "../proxy";
import axios from "axios";
import {
  ListTokenArgs,
  CreateOfferArgs,
  FillOrderObject,
  CancelOrderObject,
  CancelOfferObject,
  AcceptOfferObject,
  listTokenDutchAuctionArgs,
  listTokenAscendAuctionArgs,
} from "../types/market";
import { Config, Signer, Tx, SUPPORTED_CHAINS } from "../types";
import { Seaport } from "@opensea/seaport-js";
import { ItemType, OrderType } from "@opensea/seaport-js/lib/constants";
import { ethers, BigNumber } from "ethers";
import { CreateOrderInput, SeaportConfig } from "@opensea/seaport-js/lib/types";
const NATIVE_ETH = "0x0000000000000000000000000000000000000000";
const MAX_DURATION = 3600 * 24 * 180;
export class Market implements MarketInterface {
  private provider: ethers.providers.JsonRpcProvider;
  private seaport: Seaport;
  private endpoint: string;
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.provider = config.provider;
    if (config.provider) {
      this.provider = config.provider as ethers.providers.Web3Provider;
      const seaportConfig: SeaportConfig = {
        seaportVersion: "1.4",
      };
      this.seaport = new Seaport(config.provider, seaportConfig);
      this.provider.getNetwork().then((network) => {
        const chain = SUPPORTED_CHAINS[network.chainId];
        chain && (this.endpoint = `https://test1.imart.io/${chain}/seaport`);
      });
    }
  }

  async buyToken(args: FillOrderObject, _?: Signer): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args.protocolOrder,
      accountAddress: account,
      exactApproval: false,
      unitsToFill: args.tokenAmount,
    });
    return await executeAllActions();
  }

  async batchBuyTokens(args: FillOrderObject[], _?: any): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const orders = args.map((arg) => {
      return { order: arg.protocolOrder };
    });
    const { executeAllActions } = await this.seaport.fulfillOrders({
      fulfillOrderDetails: orders,
      accountAddress: account,
      exactApproval: false,
    });
    return await executeAllActions();
  }

  orderInputOf(args: ListTokenArgs, offerer: string): CreateOrderInput {
    const tokenAmount = BigNumber.from(args.tokenAmount);
    let amount = BigNumber.from(args.coinAmount).mul(tokenAmount);
    const consideration = [];

    // multiple royalties
    let totalRoyalty = BigNumber.from("0");
    const royalties = args.royalties || {};
    for (const [payee, royalty] of Object.entries(royalties)) {
      const fee = amount.mul(royalty).div(ethers.utils.parseEther("1"));
      const item = {
        token: NATIVE_ETH,
        amount: fee.toString(),
        endAmount: fee.toString(),
        recipient: payee,
      };
      totalRoyalty = totalRoyalty.add(fee);
      consideration.push(item);
    }

    // offerer
    amount = amount.sub(totalRoyalty);
    const offererItem = {
      token: NATIVE_ETH,
      amount: amount.toString(),
      endAmount: amount.toString(),
      recipient: offerer,
    };
    consideration.unshift(offererItem);
    const itemType =
      args.standard === "ERC1155" ? ItemType.ERC1155 : ItemType.ERC721;
    const endTime = args.endTime
      ? args.endTime.toString()
      : this.endTime(MAX_DURATION).toString();
    const input: CreateOrderInput = {
      endTime,
      offer: [
        {
          itemType,
          token: args.collectionId,
          identifier: args.tokenId,
          amount: tokenAmount.toString(),
          endAmount: tokenAmount.toString(),
        },
      ],
      consideration,
      allowPartialFills: ItemType.ERC1155 === itemType,
    };
    if (args.startTime) {
      input.startTime = args.startTime.toString();
    }
    return input;
  }

  async listToken(args: ListTokenArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const orderInput = this.orderInputOf(args, offerer);
    const { executeAllActions } = await this.seaport.createOrder(
      orderInput,
      offerer,
      false
    );
    const order = await executeAllActions();
    const parameters = { ...order.parameters, nonce: 0 };
    if (args.orderType === "EnglishAuction") {
      parameters.orderType = OrderType.FULL_RESTRICTED;
    }
    return await axios.post(`${this.endpoint}/listings`, {
      parameters,
      signature: order.signature,
    });
  }
  // ascend auction / english auction
  async listTokenAscendAuction(
    args: listTokenAscendAuctionArgs,
    signer?: Signer
  ): Promise<Tx> {
    const offerer = signer || (await this.provider.getSigner());
    const ascendAuctionOrderInputOf = (
      args: listTokenAscendAuctionArgs
    ): CreateOrderInput => {
      const startTime = args.startTime;
      const endTime = args.endTime;
      const offer = args.offer;
      const consideration = args.consideration;
      const fees = args.fees;
      return {
        startTime,
        endTime,
        offer,
        consideration,
        fees,
      };
    };
    const orderInput = ascendAuctionOrderInputOf(args);
    if (signer || typeof signer !== "undefined") {
      this.seaport = new Seaport(signer);
    }
    const { executeAllActions } = await this.seaport.createOrder(
      orderInput,
      offerer,
      false
    );
    const order = await executeAllActions();
    return await axios.post(`${this.endpoint}/listings`, {
      parameters: {
        ...order.parameters,
        nonce: 0,
        orderType: OrderType.FULL_RESTRICTED,
      },
      signature: order.signature,
    });
  }

  // dutch auction
  async listTokenDutchAuction(
    args: listTokenDutchAuctionArgs,
    signer?: Signer
  ): Promise<Tx> {
    const offerer = signer || (await this.provider.getSigner());
    const duchAuctionOrderInputOf = (
      args: listTokenDutchAuctionArgs
    ): CreateOrderInput => {
      const startTime = args.startTime;
      const endTime = args.endTime;
      const offer = args.offer;
      const consideration = args.consideration;
      const fees = args.fees;
      return {
        startTime,
        endTime,
        offer,
        consideration,
        fees,
      };
    };
    const orderInput = duchAuctionOrderInputOf(args);
    if (signer || typeof signer !== "undefined") {
      this.seaport = new Seaport(signer);
    }
    const { executeAllActions } = await this.seaport.createOrder(
      orderInput,
      offerer,
      false
    );
    const order = await executeAllActions();
    return await axios.post(`${this.endpoint}/listings`, {
      parameters: { ...order.parameters, nonce: 0 },
      signature: order.signature,
    });
  }

  async batchListTokens(args: ListTokenArgs[], _?: any): Promise<any> {
    const offerer = await this.provider.getSigner().getAddress();
    const orderInputs = args.map((item) => this.orderInputOf(item, offerer));
    const { executeAllActions } = await this.seaport.createBulkOrders(
      orderInputs,
      offerer,
      false
    );
    const orders = await executeAllActions();
    return await Promise.all(
      orders.map(async (order) => {
        await axios.post(`${this.endpoint}/listings`, {
          parameters: { ...order.parameters, nonce: 0 },
          signature: order.signature,
        });
      })
    );
  }

  async delistToken(args: CancelOrderObject, _?: Signer): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders(
      [args.protocolOrder.parameters],
      seller
    );
    return await transact();
  }

  async createOffer(args: CreateOfferArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    const tokenAmount = BigNumber.from(args.tokenAmount.toString());
    let amount = BigNumber.from(args.price).mul(tokenAmount);
    const consideration = [];

    // multiple royalties
    const royalties = args.royalties ?? {};
    for (const [payee, royalty] of Object.entries(royalties)) {
      const fee = amount.mul(royalty).div(ethers.utils.parseEther("1"));
      const item = {
        token: NATIVE_ETH,
        amount: fee.toString(),
        endAmount: fee.toString(),
        recipient: payee,
      };
      consideration.push(item);
    }
    const itemType =
      args.standard === "ERC1155" ? ItemType.ERC1155 : ItemType.ERC721;
    const { executeAllActions } = await this.seaport.createOrder(
      {
        endTime: this.endTime(args.duration).toString(),
        offer: [
          {
            token: NATIVE_ETH,
            amount: amount.toString(),
            endAmount: amount.toString(),
          },
        ],
        consideration: [
          {
            itemType,
            token: args.collectionId,
            identifier: args.tokenId,
            amount: tokenAmount.toString(),
            endAmount: tokenAmount.toString(),
            recipient: offerer,
          },
          ...consideration,
        ],
        restrictedByZone: false,
        allowPartialFills: ItemType.ERC1155 === itemType,
      },
      offerer,
      false
    );

    const offer = await executeAllActions();
    return await axios.post(`${this.endpoint}/offers`, {
      parameters: { ...offer.parameters, nonce: 0 },
      signature: offer.signature,
    });
  }

  async cancelOffer(args: CancelOfferObject, _?: Signer): Promise<Tx> {
    const seller = await this.provider.getSigner().getAddress();
    const { transact } = this.seaport.cancelOrders(
      [args.protocolOrder.parameters],
      seller
    );
    return await transact();
  }

  async acceptOffer(args: AcceptOfferObject, _?: Signer): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args.protocolOrder,
      accountAddress: account,
      recipientAddress: args.buyer,
      exactApproval: false,
    });
    return await executeAllActions();
  }

  endTime(duration: number): number {
    const nowsecs = new Date().getTime() / 1000;
    return Math.floor(nowsecs + duration);
  }
}
