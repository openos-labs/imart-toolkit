import { BigNumber, ethers } from "ethers";
import { NftLotteryInterface } from "../proxy";
import {
  NftLottery as NFTLOTTERY,
  NftLottery__factory,
  NftToken__factory,
  NftToken,
} from "../typechain";
import { Address, Config, Tx } from "../types";
export class NftLottery implements NftLotteryInterface {
  readonly config: Config;
  private nftLotteryAddress: Address;
  private signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;
  constructor(config: Config) {
    if (config.provider) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.signer = this.provider.getSigner(config.walletAddress);
      this.config = config;
    }
    this.nftLotteryAddress = config.addresses["nftlottery"];
  }

  nftLottery(): NFTLOTTERY {
    return NftLottery__factory.connect(this.nftLotteryAddress, this.provider);
  }

  erc721(contract: string): NftToken {
    return NftToken__factory.connect(contract, this.provider);
  }

  async getUserHasClaimed(
    user: string,
    organizer: string,
    activityId: number,
    signer?: any
  ): Promise<boolean> {
    return this.nftLottery()
      .connect(signer ?? this.signer)
      .getUserHasClaimed(user, organizer, activityId);
  }

  async hasPermissionOf(contracts: Array<string>, user: string) : Promise<boolean> {
    return await Promise.all(contracts.map(async i => await this.erc721(i).balanceOf(user))).then((balances) => !balances.every(i => i.isZero())).catch(_ => { return false })
  }

  async setApprovalForAll(
    _nftContractAddress: string,
    _approved: boolean,
    signer?: any
  ): Promise<Tx> {
    return this.erc721(_nftContractAddress)
      .connect(signer ?? this.signer)
      .setApprovalForAll(this.nftLotteryAddress, _approved);
  }

  async isApprovedForAll(
    _nftContractAddress: string,
    signer?: any
  ): Promise<boolean> {
    const owner = (await signer) ?? this.signer.getAddress();
    return this.erc721(_nftContractAddress)
      .connect(signer ?? this.signer)
      .isApprovedForAll(owner, this.nftLotteryAddress);
  }

  async createActivity(
    _nftContractAddress: string,
    _endBlockNumber: number,
    _activityId: number,
    _tokenIds: number[],
    signer?: any
  ): Promise<any> {
    return this.nftLottery()
      .connect(signer ?? this.signer)
      .createActivity(
        _nftContractAddress,
        _endBlockNumber,
        _activityId,
        _tokenIds
      );
  }
  async setMerkleRoot(
    _activityId: number,
    _merkleRoot: string,
    signer?: any
  ): Promise<any> {
    return this.nftLottery()
      .connect(signer ?? this.signer)
      .setMerkleRoot(_activityId, _merkleRoot);
  }
  async claim(
    _organizer: string,
    _activityId: number,
    _nftContract: string,
    _tokenId: number,
    merkleProof: string[],
    signer?: any
  ): Promise<any> {
    return this.nftLottery()
      .connect(signer ?? this.signer)
      .claim(_organizer, _activityId, _nftContract, _tokenId, merkleProof);
  }
  async getActivityInfo(_organizer: string, _activityId: number): Promise<any> {
    return this.nftLottery().getActivityInfo(_organizer, _activityId);
  }
  async getRemainingTokenIds(
    _organizer: string,
    _activityId: number
  ): Promise<any> {
    return this.nftLottery().getRemainingTokenIds(_organizer, _activityId);
  }
  async withdrawPrize(_activityId: number, signer?: any): Promise<any> {
    return this.nftLottery()
      .connect(signer ?? this.signer)
      .withdrawPrize(_activityId);
  }
}
