import { ethers } from "hardhat";
import { expect } from "chai";
import * as env from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { Evm } from "../src/evm";
import { Aptos } from "../src/aptos";
import { Contractor } from "../src/client";
import {
  MultipleCollective__factory,
  MultipleCollective,
  SingleCollective,
  SingleCollective__factory,
} from "../src";

env.config();

describe("EVM/creation tests", () => {
  let SingleCollective: SingleCollective;
  let MultipleCollective: MultipleCollective;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let client: Evm | Aptos;

  before(async () => {
    [owner, alice] = await ethers.getSigners();
    const SingleCollectiveFactory = new SingleCollective__factory(owner);
    SingleCollective = await SingleCollectiveFactory.deploy();
    await SingleCollective.deployed();

    const MultipleCollectiveFactory = new MultipleCollective__factory(owner);
    MultipleCollective = await MultipleCollectiveFactory.deploy();
    await MultipleCollective.deployed();

    const config = {
      addresses: {
        singleCollective: SingleCollective.address,
        multipleCollective: MultipleCollective.address,
        market: "",
        creation: "",
        curation: "",
      },
      provider: new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"),
    };
    client = Contractor(Evm, config);
  });

  it("Create 1 Erc721 token within untitled collection", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    const untitledCollection = "untitled collection";
    await client.mintToken(
      {
        type: "single",
        balance: BigNumber.from("1"),
        collection: "",
        name: "test",
        description: "desc",
        to: alice.address,
        uri,
      },
      alice
    );
    const events = await SingleCollective.queryFilter(
      SingleCollective.filters.CollectionCreated()
    );
    const [, , name, , , , _uri, , , ,] = events[0].args;
    expect(name).eq(untitledCollection);
  });

  it("Create 10 Erc1155 tokens within untitled collection", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    const untitledCollection = "untitled collection";
    await client.mintToken(
      {
        type: "multiple",
        balance: BigNumber.from("10"),
        collection: "",
        name: "test",
        description: "desc",
        to: alice.address,
        uri,
      },
      alice
    );
    const events = await MultipleCollective.queryFilter(
      MultipleCollective.filters.CollectionCreated()
    );
    const [, , name, , , , _uri, , , ,] = events[0].args;
    expect(name).eq(untitledCollection);
  });

  it("Create 1 Erc721 token within the selected collection", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    const collection = "Alice's daily";
    await client.createCollection(
      {
        type: "single",
        name: collection, // collection name
        category: "ART",
        tags: ["tag"],
        description: "desc",
        uri,
        payees: [alice.address], // multiple payees
        royalties: [ethers.utils.parseEther("0.001")],
        maximum: BigNumber.from(10), // max supply
      },
      alice
    );
    await client.mintToken(
      {
        type: "single",
        balance: BigNumber.from("1"),
        collection,
        name: "test",
        description: "desc",
        to: alice.address, // token receiver
        uri,
      },
      alice
    );
    const events = await SingleCollective.queryFilter(
      SingleCollective.filters.CollectionCreated()
    );
    const [, , name, category, , , _uri, payees, , ,] = events[1].args;
    expect(name).eq(collection);
    expect(payees[0]).eq(alice.address);
    expect(category).eq("ART");
  });
});
