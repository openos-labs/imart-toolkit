import { ethers } from "hardhat";
import { expect } from "chai";
import * as env from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { Evm } from "../src/evm";
import { Aptos } from "../src/aptos";
import { Contractor } from "../src/client";
import { IMartCollective, IMartCollective__factory } from "../src";

env.config();

describe("EVM/creation tests", () => {
  let IMartCollective: IMartCollective;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let client: Evm | Aptos;

  before(async () => {
    [owner, alice] = await ethers.getSigners();
    const IMartCollectiveFactory = new IMartCollective__factory(owner);
    IMartCollective = await IMartCollectiveFactory.deploy();
    await IMartCollective.deployed();
    const config = {
      addresses: {
        market: "",
        creation: IMartCollective.address,
        curation: "",
      },
      provider: ethers.getDefaultProvider(),
    };
    client = Contractor(Evm, config);
  });

  it("Create 1 NFT within untitled collection", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    const untitledCollection = "untitled collection";
    await client.mintToken(
      {
        collection: "",
        name: "test",
        description: "desc",
        to: alice.address,
        uri,
      },
      alice
    );
    const events = await IMartCollective.queryFilter(
      IMartCollective.filters.CollectionCreated()
    );
    const [, , name, , , , _uri, , , ,] = events[0].args;
    expect(name).eq(untitledCollection);
  });

  it("Create 1 NFT within the selected collection", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    const collection = "Alice's daily";
    await client.createCollection(
      {
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
        collection,
        name: "test",
        description: "desc",
        to: alice.address, // token receiver
        uri,
      },
      alice
    );
    const events = await IMartCollective.queryFilter(
      IMartCollective.filters.CollectionCreated()
    );
    const [, , name, category, , , _uri, payees, , ,] = events[1].args;
    expect(name).eq(collection);
    expect(payees[0]).eq(alice.address);
    expect(category).eq("ART");
  });
});
