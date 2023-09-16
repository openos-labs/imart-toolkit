import {
  BigNumber,
  BigNumberish,
  ContractTransaction,
  ethers,
  Overrides,
  Signer,
} from "ethers";
import { QuickLotteryInterface } from "../proxy";
import {
  QuickDraw as QUICKDRAW,
  QuickDraw__factory,
  NftToken,
  NftToken__factory,
  ERC20__factory,
} from "../typechain";
import { Address, Config, Tx } from "../types";
import { PromiseOrValue } from "../typechain/common";

export class QuickDraw implements QuickLotteryInterface {
  readonly config: Config;
  private quickDrawAddress: Address;
  private signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;

  constructor(config: Config) {
    if (
      config.provider &&
      config.provider instanceof ethers.providers.JsonRpcProvider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.signer = this.provider.getSigner();
      this.config = config;
    }
    this.quickDrawAddress = config.addresses["quickDraw"];
  }

  quickDraw(): QUICKDRAW {
    return QuickDraw__factory.connect(this.quickDrawAddress, this.provider);
  }

  erc721(contract: string): NftToken {
    return NftToken__factory.connect(contract, this.provider);
  }

  joinActivity(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    invitedCode: PromiseOrValue<BigNumberish>,
    signer?: any
  ): Promise<any> {
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .joinActivity(activityId, organizer, invitedCode);
  }

  async createActivity(
    createActivityParam: QUICKDRAW.CreateActivityParamStruct,
    signer?: any
  ): Promise<any> {
    const { erc20Address, erc20Amount } = createActivityParam;
    const ERC20_INSTANCE = ERC20__factory.connect(
      erc20Address as string,
      this.provider
    );

    const tx = await ERC20_INSTANCE.connect(this.signer ?? signer).approve(
      this.quickDrawAddress,
      erc20Amount
    );
    await tx.wait();
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .createActivity(createActivityParam);
  }

  async createReffralPool(
    createReffralPoolParam: QUICKDRAW.CreateReffralPoolParamStruct,
    signer?: Signer
  ): Promise<ContractTransaction> {
    const { erc20Address, totalErc20Amount } = createReffralPoolParam;

    const ERC20_INSTANCE = ERC20__factory.connect(
      erc20Address as string,
      this.provider
    );

    const tx = await ERC20_INSTANCE.connect(this.signer ?? signer).approve(
      this.quickDrawAddress,
      totalErc20Amount
    );

    await tx.wait();
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .createReffralPool(createReffralPoolParam);
  }

  async getInvitedCode(
    userAddress: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<BigNumber> {
    const INSTANCE = this.getInstance(signer);
    let code = await INSTANCE.getInvitedCode(userAddress);
    if (code.toNumber() > 0) {
      return code;
    }

    const tx = await INSTANCE.setInvitedCode();
    await tx.wait();
    code = await INSTANCE.getInvitedCode(userAddress);

    return code;
  }

  claimRefferallPrize(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<ContractTransaction> {
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .claimRefferallPrize(activityId, organizer);
  }

  getLeaderboard(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<string[]> {
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .getLeaderboard(activityId, organizer);
  }

  getUserInfo(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    userAddress: PromiseOrValue<string>,
    signer?: Signer
  ): Promise<[string, BigNumber, BigNumber]> {
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .getUserInfo(activityId, organizer, userAddress);
  }

  getUserHasClaimed(
    _user: PromiseOrValue<string>,
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    signer?: any
  ): Promise<boolean> {
    return this.quickDraw().getUserHasClaimed(_user, _organizer, _activityId);
  }

  getUserHasWinner(
    _user: PromiseOrValue<string>,
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    signer?: any
  ): Promise<boolean> {
    return this.quickDraw().getUserHasWinner(_user, _organizer, _activityId);
  }
  emergencyWithdraw(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    signer?: any
  ): Promise<any> {
    return this.quickDraw()
      .connect(this.signer ?? signer)
      .emergencyWithdraw(_organizer, _activityId);
  }
  getRemainingTokenIds(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    signer?: any
  ): Promise<any> {
    return this.quickDraw().getRemainingTokenIds(_organizer, _activityId);
  }
  getActivityTotalPartcipant(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>
  ): Promise<BigNumber> {
    return this.quickDraw().getActivityTotalPartcipant(_organizer, _activityId);
  }

  withdrawPrize(
    _organizer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction> {
    return this.quickDraw().withdrawPrize(_organizer, overrides);
  }

  getInstance(signer?: Signer): QUICKDRAW {
    return this.quickDraw().connect(this.signer ?? signer);
  }
}
