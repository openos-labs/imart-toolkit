import {
  CreateOfferArgs,
  ListTokenArgs,
  Order,
  Token,
  Create,
  Config,
  CancelOrderObject,
  CancelOfferObject,
  FillOrderObject,
  AcceptOfferObject,
  Tx,
} from "./types";

export interface CreationInterface {
  config: Config;
  create(args: Create): Promise<Tx>;
}

export interface MarketInterface {
  config: Config;
  buyToken(args: FillOrderObject): Promise<Tx>;
  listToken(args: ListTokenArgs): Promise<Tx>;
  delistToken(args: CancelOrderObject): Promise<Tx>;
  createOffer(args: CreateOfferArgs): Promise<Tx>;
  cancelOffer(args: CancelOfferObject): Promise<Tx>;
  acceptOffer(args: AcceptOfferObject): Promise<Tx>;
}

export interface ResourceInterface {
  assets(owner: string): Promise<Token[]>;
  userOrders(account: string, tokenIds: string[]): Promise<Order[]>;
  collectionOrders(collectionId: string, tokenIds: string[]): Promise<Order[]>;
}

export abstract class ContractProxy
  implements MarketInterface, CreationInterface
{
  config: Config;

  // creation
  abstract create(args: Create): Promise<Tx>;

  // market
  abstract listToken(args: ListTokenArgs): Promise<Tx>;
  abstract buyToken(args: FillOrderObject): Promise<Tx>;
  abstract delistToken(args: CancelOrderObject): Promise<Tx>;
  abstract createOffer(args: CreateOfferArgs): Promise<Tx>;
  abstract acceptOffer(args: AcceptOfferObject): Promise<Tx>;
  abstract cancelOffer(args: CancelOfferObject): Promise<Tx>;
}
