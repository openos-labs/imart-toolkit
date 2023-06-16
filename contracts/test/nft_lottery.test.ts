import { ContractTransaction } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish } from "ethers";
import { ethers } from "hardhat";
import "typechain";
import {
    NftLottery__factory,
    NftLottery,
    NftToken__factory,
    NftToken,
} from "../src";
import { Evm } from "../src/evm";
import * as addr from "./addresses.json";
import { Contractor } from "../src/client";
import { JsonRpcProvider } from "@ethersproject/providers";
let contractor: Evm;
let nftLottery: NftLottery;
let nftTokenAddr : string;
let client : Evm;


describe("Test NftLottery",  () => {

    const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL2);
    nftTokenAddr = '0x804D5fa549799c0A7e56e60aaBebF35103c130F9' // nft token goerli address
    const signer = new ethers.Wallet(process.env.TEST_ONLY, provider);

    const calculateAverageBlockTime = async  (provider:JsonRpcProvider, startBlock:number, endBlock:number):Promise<number> => {
        try {
            const startBlockInfo = await provider.getBlock(startBlock);
            const endBlockInfo = await provider.getBlock(endBlock);
        
            const startTime = startBlockInfo.timestamp;
            const endTime = endBlockInfo.timestamp;
            const blockCount = endBlock - startBlock + 1;
        
            const averageBlockTime = (endTime - startTime) / blockCount;
            return averageBlockTime;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    } 

    before(async () => {
        nftLottery = NftLottery__factory.connect(
            addr.NftLottery_goerli,
            signer
        );

        const config = {
            addresses: {
                singleCollective: "",
                multipleCollective: "",
                market: "",
                creation: "",
                curation: "",
                nftlottery: addr.NftLottery_goerli,
            },
            provider: provider,
        };
        client = Contractor(Evm, config);
        console.log("balance:", ethers.utils.formatEther(await provider.getBalance(signer.address)));
    });

    // set approve all
    it("Set approve all", async () => {
        const tx  = await(client.setApprovalForAll(nftTokenAddr, nftLottery.address,true, signer)) as ContractTransaction;
        await tx.wait();
        expect(tx).to.exist;
    });
    // create a activity
    it("Create a activity", async () => {
        const targetTime = new Date('2023-06-30T20:00:00Z'); 
        const elapsedTime :number= targetTime.getTime() - Date.now();//ms
        const currentBlockHeight = await provider.getBlockNumber();
        const averageBlockTimeSecend = await calculateAverageBlockTime(provider, currentBlockHeight - 100, currentBlockHeight);// 100 block average time(secend)
        const predictedBlockHeight = currentBlockHeight + Math.floor(elapsedTime / (averageBlockTimeSecend*1000));


        const tx = (await client.createActivity(
            nftTokenAddr,
            predictedBlockHeight,
            1,
            [0],
            signer
        )) as ContractTransaction;

        await tx.wait();
        const events = await nftLottery.queryFilter(
            nftLottery.filters.CreateActivity()
        );
        const [, , _nftContractAddress, _tokenIds, _endBlockNumber] = events.slice(-1)[0].args;
        expect(_nftContractAddress).to.equal(nftTokenAddr);

    });

    // setMerkleRoot
    it("Set Merkle Root", async () => {
        const tx = (await client.setMerkleRoot(
            1,
            '0x1234567890123456789012345678901234567890123456789012345678901234',
            signer
        )) as ContractTransaction;

        await tx.wait();
        const events = await nftLottery.queryFilter(
            nftLottery.filters.MerkleRoot()
        );
        const [, , _activityId, _merkleRoot] = events.slice(-1)[0].args;
        expect(_merkleRoot).to.equal('0x1234567890123456789012345678901234567890123456789012345678901234');
    });

});