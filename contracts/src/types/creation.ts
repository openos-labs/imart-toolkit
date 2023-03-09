import { BigNumberish } from "ethers";
import { Base } from ".";

export type Category = "SPACE" | "MUSIC" | "ART";
export type CollectionType = "single" | "multiple";

export interface CreationArgs extends Base {
  category: Category;
  title: string;
  description: string;
  uri: string;
}

export interface CreateCollectionArgs extends Base {
  name: string;
  category: Category;
  tags: string[];
  description: string;
  uri: string;
  payees: string[];
  royalties: BigNumberish[];
  maximum: BigNumberish;
  type: CollectionType;
}

export interface MintTokenArgs extends Base {
  collection: string;
  name: string;
  description: string;
  to?: string;
  uri?: string;
  balance: BigNumberish;
  type?: CollectionType;
}

export interface ApproveArgs extends Base {
  type: CollectionType;
  to: string;
  tokenIdentifier: BigNumberish;
  collectionIdentifier: BigNumberish;
}
