// @ts-nocheck
import { MarketInterface } from "../proxy";
import axios from "axios";
import {
  ListTokenArgs,
  CreateOfferArgs,
  FillOrderObject,
  CancelOrderObject,
  CancelOfferObject,
  AcceptOfferObject,
} from "../types/market";
import { Config, Signer, Tx } from "../types";
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers, BigNumber } from "ethers";

const NATIVE_ETH = "0x0000000000000000000000000000000000000000";
const SEAPORT_URL = "https://testnets-api.opensea.io/v2/orders/goerli/seaport";
const OPENSEA_FEE_RECEIPIENT = "0x0000a26b00c1F0DF003000390027140000fAa719";
const CONDUIT_KEY =
  "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000";
const MAX_DURATION = 3600 * 24 * 180;
const OPENSEA_FEE_BASIS_POINTS = BigNumber.from(250);
const OPENSEA_FEE_DENOMINATOR = BigNumber.from(10000);
export class Market implements MarketInterface {
  private provider: ethers.providers.JsonRpcProvider;
  private seaport: Seaport;
  readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.provider = config.provider;
    if (
      config.provider &&
      config.provider instanceof ethers.providers.Web3Provider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.seaport = new Seaport(this.provider);
    }
  }

  async buyToken(args: FillOrderObject, _?: Signer): Promise<Tx> {
    const account = await this.provider.getSigner().getAddress();
    const { executeAllActions } = await this.seaport.fulfillOrder({
      order: args.protocolOrder,
      accountAddress: account,
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
    });
    return await executeAllActions();
  }

  async listToken(args: ListTokenArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    let amount = BigNumber.from(args.coinAmount);
    const consideration = [];

    // opensea platform fee
    const openseaFee = amount
      .mul(OPENSEA_FEE_BASIS_POINTS)
      .div(OPENSEA_FEE_DENOMINATOR);
    const openseaItem = {
      token: NATIVE_ETH,
      amount: openseaFee.toString(),
      endAmount: openseaFee.toString(),
      recipient: OPENSEA_FEE_RECEIPIENT,
    };
    consideration.push(openseaItem);

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
    amount = amount.sub(openseaFee).sub(totalRoyalty);
    const offererItem = {
      token: NATIVE_ETH,
      amount: amount.toString(),
      endAmount: amount.toString(),
      recipient: offerer,
    };
    consideration.push(offererItem);

    const { executeAllActions } = await this.seaport.createOrder(
      {
        endTime: this.endTime(MAX_DURATION).toString(),
        offer: [
          {
            itemType: ItemType.ERC721,
            token: args.collectionId,
            identifier: args.tokenId,
            amount: "1",
            endAmount: "1",
          },
        ],
        consideration,
        conduitKey: CONDUIT_KEY,
      },
      offerer
    );
    const order = await executeAllActions();
    return await axios.post(`${SEAPORT_URL}/listings`, {
      parameters: order.parameters,
      signature: order.signature,
    });
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
    let amount = BigNumber.from(args.coinAmount);
    const consideration = [];

    // opensea platform fee
    const openseaFee = amount
      .mul(OPENSEA_FEE_BASIS_POINTS)
      .div(OPENSEA_FEE_DENOMINATOR);
    const openseaItem = {
      token: NATIVE_ETH,
      amount: openseaFee.toString(),
      endAmount: openseaFee.toString(),
      recipient: OPENSEA_FEE_RECEIPIENT,
    };
    consideration.push(openseaItem);

    // multiple royalties
    const royalties = args.royalties ?? {};
    for (const [payee, royalty] of royalties) {
      const fee = amount.mul(royalty).div(ethers.utils.parseEther("1"));
      const item = {
        token: NATIVE_ETH,
        amount: fee.toString(),
        endAmount: fee.toString(),
        recipient: payee,
      };
      consideration.push(item);
    }
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
            itemType: ItemType.ERC721,
            token: args.collectionId,
            identifier: args.tokenId,
            amount: "1",
            endAmount: "1",
            recipient: offerer,
          },
          ...consideration,
        ],
        conduitKey: CONDUIT_KEY,
      },
      offerer
    );

    const offer = await executeAllActions();
    return await axios.post(`${SEAPORT_URL}/offers`, {
      parameters: offer.parameters,
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
    });
    return await executeAllActions();
  }

  endTime(duration: number): number {
    const nowsecs = parseInt(new Date().getTime() / 1000);
    return nowsecs + duration;
  }
}
