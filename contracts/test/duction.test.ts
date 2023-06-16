import { ethers } from "hardhat";
import { expect } from "chai";
import * as env from "dotenv";
import { BigNumber, ContractTransaction } from "ethers";
import { parseEther } from "ethers/lib/utils";
// const { parseEther } = require("ethers/lib/utils");
import { Evm } from "../src/evm";
import { Aptos } from "../src/aptos";
import { Contractor } from "../src/client";
import {
  MultipleCollective__factory,
  MultipleCollective,
  SingleCollective,
  SingleCollective__factory,
  listTokenAscendAuctionArgs,
} from "../src";
import { ItemType,OrderType  } from "@opensea/seaport-js/lib/constants";
import * as addr from "./addresses.json";
env.config();

describe("EVM/create a dutch auction",  () => {
  it("create a dutch auction", async function () {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL2);
    const signer = new ethers.Wallet(process.env.TEST_ONLY, provider);
    console.log("balance:", ethers.utils.formatEther(await provider.getBalance(signer.address)));
    const erc1155Address = "0xf4910C763eD4e47A585E2D34baA9A4b611aE448C"
    const nftId = "19973338218794631452213739857514963539927449815307617458450317876183749885953";
    // const [offerer, zone, fulfiller] = await ethers.getSigners();
    // console.log("offerer",offerer.address,"zone",zone.address,"fulfiller",fulfiller.address)
    const SECONDS_IN_WEEK = 60 * 60 * 24 * 7;
    const startTime = await (
      await provider.getBlock("latest")
    ).timestamp.toString();
    const endTime = BigNumber.from(startTime).add(SECONDS_IN_WEEK).toString();;
    console.log("startTime",startTime)
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    let listTokenDutchAuctionArgs = {
      startTime: startTime,
      endTime: endTime,
      offer: [
        {
            itemType: 3,
            token: erc1155Address,
            amount: "1",
            endAmount: "1",
            identifier: nftId,
        },
      ],
      consideration: [
          {
              amount: parseEther("10").toString(),
              endAmount: parseEther("2").toString(),
              recipient: signer.address,
              token:WETH
          },
      ],
        // 2.5% fee
        fees: [{ recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", basisPoints: 250 }]
      };

      const config = {
        addresses: {
          singleCollective: "",
          multipleCollective: "",
          market: "",
          creation: "",
          curation: "",
          nftlottery: "",
        },
        provider: provider,
      };
      let client = Contractor(Evm, config);

      const tx = (await client.listTokenDutchAuction(
        listTokenDutchAuctionArgs,
        signer
      )) as ContractTransaction;
      console.log("tx",tx)

  });
  
  it("create a ascend auction", async function () {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL2);
    const signer = new ethers.Wallet(process.env.TEST_ONLY, provider);
    console.log("balance:", ethers.utils.formatEther(await provider.getBalance(signer.address)));
    const erc721address = "0xc06Ce325fcCceAAeb809F00D1A9F7e844Bd8Ff09"
    const SECONDS_IN_WEEK = 60 * 60 * 24 * 7;
    const startTime = await (await provider.getBlock("latest")).timestamp.toString();
    const endTime = BigNumber.from(startTime).add(SECONDS_IN_WEEK).toString();;
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    let listTokenAscendAuctionArgs : listTokenAscendAuctionArgs = {
      startTime:startTime,
      endTime:endTime,
      offer: [
        {
            itemType: ItemType.ERC721,
            token: erc721address,
            amount: "1",
            endAmount: "1",
            identifier: "631",
        },
      ],
      consideration: [
          {
              amount: parseEther("20").toString(),
              endAmount: parseEther("20").toString(),
              recipient: signer.address,
              token:WETH
          },
      ],
        fees: [{ recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", basisPoints: 250 }]
    };
    
    const config = {
      addresses: {
        singleCollective: "",
        multipleCollective: "",
        market: "",
        creation: "",
        curation: "",
        nftlottery: "",
      },
      provider: provider,
      signer: signer,
    };
    let client = Contractor(Evm, config);
    const tx = (await client.listTokenAscendAuction(listTokenAscendAuctionArgs,signer)) as ContractTransaction;
    console.log("tx",tx)
  });

});
