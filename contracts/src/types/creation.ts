import { BigNumberish } from "ethers";

export type Category = "SPACE" | "MUSIC" | "ART";

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
}

export interface MintTokenArgs {
  collection: string;
  name: string;
  description: string;
  to: string;
  uri: string;
}
