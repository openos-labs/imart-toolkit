import { BigNumberish } from "ethers";

export type Category = "SPACE" | "MUSIC" | "ART";
export type CollectionType = "single" | "multiple";

export interface CreationArgs {
  category: Category;
  title: string;
  description: string;
  uri: string;
}

export interface CreateCollectionArgs {
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

export interface MintTokenArgs {
  collection: string;
  name: string;
  description: string;
  to?: string;
  uri?: string;
  balance: BigNumberish;
  type?: CollectionType;
}

export interface ApproveArgs {
  type: CollectionType;
  to: string;
  tokenIdentifier: BigNumberish;
  collectionIdentifier: BigNumberish;
}