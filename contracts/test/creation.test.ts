import { ethers } from "hardhat";
import { expect } from "chai";
import * as env from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { Evm } from "../src/evm";
import { Aptos } from "../src/aptos";
import { ContractClient } from "../src/client";
import { IMartToken, IMartToken__factory } from "../src";

env.config();

describe("EVM/creation tests", () => {
  let IMartToken: IMartToken;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let client: Evm | Aptos;

  before(async () => {
    [owner, alice] = await ethers.getSigners();
    const IMartTokenFactory = new IMartToken__factory(owner);
    IMartToken = await IMartTokenFactory.deploy("IMart token", "IMART");
    await IMartToken.deployed();
    const config = {
      addresses: {
        market: "",
        creation: IMartToken.address,
        curation: "",
      },
      provider: ethers.getDefaultProvider(),
      signer: alice,
    };
    client = ContractClient("evm", config);
  });

  it("Alice create 1 NFT", async function () {
    const uri = "https://imart-nft.s3.amazonaws.com/imart/1674150362.json";
    await client.create({
      category: "ART",
      title: "first NFT",
      description: "yeah, my first NFT",
      uri,
    });
    expect(await IMartToken.balanceOf(alice.address)).eq(BigNumber.from("1"));
    expect(await IMartToken.tokenURI(0)).eq(uri);
  });
});
