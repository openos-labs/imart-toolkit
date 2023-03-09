import { ethers } from "hardhat";
import { expect } from "chai";
import * as env from "dotenv";
import { BigNumber, ContractTransaction } from "ethers";
import { Evm } from "../src/evm";
import { Aptos } from "../src/aptos";
import { Contractor } from "../src/client";
import {
  MultipleCollective__factory,
  MultipleCollective,
  SingleCollective,
  SingleCollective__factory,
} from "../src";
import * as addr from "./addresses.json";
env.config();

describe("EVM/creation tests", () => {
  let SingleCollective: SingleCollective;
  let MultipleCollective: MultipleCollective;
  let client: Evm | Aptos;

  const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL);
  const signer = new ethers.Wallet(process.env.TEST_ONLY, provider);

  before(async () => {
    SingleCollective = SingleCollective__factory.connect(
      addr.SingleCollective,
      signer
    );
    MultipleCollective = MultipleCollective__factory.connect(
      addr.MultipleCollective,
      signer
    );
    const config = {
      addresses: {
        singleCollective: addr.SingleCollective,
        multipleCollective: addr.MultipleCollective,
        market: "",
        creation: "",
        curation: "",
      },
      provider: provider,
    };
    client = Contractor(Evm, config);
  });

  it("Create 1 Erc721 token within untitled collection", async function () {
    const uri = "https://d1ktb2pux2fae3.cloudfront.net/imart/1674150362.json";
    const untitledCollection = "untitled collection";
    const tx = (await client.mintToken(
      {
        type: "single",
        balance: BigNumber.from("1"),
        collection: "",
        name: "lalala1",
        description: "desc",
        to: signer.address,
        uri,
      },
      signer
    )) as ContractTransaction;
    await tx.wait();
    const events = await SingleCollective.queryFilter(
      SingleCollective.filters.CollectionCreated()
    );
    const [, , name, , , , _uri, , , ,] = events.slice(-1)[0].args;
    expect(name).eq(untitledCollection);
  });

  it("Create 10 Erc1155 tokens within untitled collection", async function () {
    const uri = "https://d1ktb2pux2fae3.cloudfront.net/imart/1674150362.json";
    const untitledCollection = "untitled collection";
    const tx = (await client.mintToken(
      {
        type: "multiple",
        balance: BigNumber.from("10"),
        collection: "",
        name: "lalala2",
        description: "desc",
        to: signer.address,
        uri,
      },
      signer
    )) as ContractTransaction;
    await tx.wait();
    const events = await MultipleCollective.queryFilter(
      MultipleCollective.filters.CollectionCreated()
    );
    const [, , name, , , , _uri, , , ,] = events.slice(-1)[0].args;
    expect(name).eq(untitledCollection);
  });

  it("Create 1 Erc721 token within the selected collection", async function () {
    const uri = "https://d1ktb2pux2fae3.cloudfront.net/imart/1674150362.json";
    const collection = "Alice's daily 2";
    const tx1 = (await client.createCollection(
      {
        type: "single",
        name: collection, // collection name
        category: "ART",
        tags: ["tag"],
        description: "desc",
        uri,
        payees: [signer.address], // multiple payees
        royalties: [ethers.utils.parseEther("0.001")],
        maximum: BigNumber.from(10), // max supply
      },
      signer
    )) as ContractTransaction;
    await tx1.wait();
    const tx2 = (await client.mintToken(
      {
        type: "single",
        balance: BigNumber.from("1"),
        collection,
        name: "test",
        description: "desc",
        to: signer.address, // token receiver
        uri,
      },
      signer
    )) as ContractTransaction;
    await tx2.wait();
    const events = await SingleCollective.queryFilter(
      SingleCollective.filters.CollectionCreated()
    );
    const [, , name, category, , , _uri, payees, , ,] =
      events.slice(-1)[0].args;
    expect(name).eq(collection);
    expect(payees[0]).eq(signer.address);
    expect(category).eq("ART");
  });
});
