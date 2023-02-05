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
      config.provider instanceof ethers.providers.JsonRpcProvider
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

  async listToken(args: ListTokenArgs, _?: Signer): Promise<Tx> {
    const offerer = await this.provider.getSigner().getAddress();
    let amount = BigNumber.from(args.coinAmount);
    const fee = amount
      .mul(OPENSEA_FEE_BASIS_POINTS)
      .div(OPENSEA_FEE_DENOMINATOR);
    amount = amount.sub(fee);
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
        consideration: [
          {
            token: NATIVE_ETH,
            amount: amount.toString(),
            endAmount: amount.toString(),
            recipient: offerer,
          },
          {
            token: NATIVE_ETH,
            amount: fee.toString(),
            endAmount: fee.toString(),
            recipient: OPENSEA_FEE_RECEIPIENT,
          },
        ],
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
    const fee = amount
      .mul(OPENSEA_FEE_BASIS_POINTS)
      .div(OPENSEA_FEE_DENOMINATOR);
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
          {
            token: NATIVE_ETH,
            amount: fee.toString(),
            endAmount: fee.toString(),
            recipient: OPENSEA_FEE_RECEIPIENT,
          },
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
