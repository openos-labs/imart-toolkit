import {BigNumber, BigNumberish, ContractTransaction, ethers, Overrides} from "ethers";
import {QuickLotteryInterface} from "../proxy";
import {
	QuickDraw as QUICKDRAW,
	QuickDraw__factory,
	NftToken, NftToken__factory,
} from "../typechain";
import {Address, Config, Tx} from "../types";
import {PromiseOrValue} from "../typechain/common";

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
		signer?: any
	): Promise<any> {
		return this.quickDraw().connect(signer ?? this.signer).joinActivity(activityId, organizer)
	}
	
	createActivity(createActivityParam: QUICKDRAW.CreateActivityParamStruct, signer?: any): Promise<any> {
		return this.quickDraw().connect(signer ?? this.signer).createActivity(createActivityParam)
	}
	
  getUserHasClaimed(_user: PromiseOrValue<string>, _organizer: PromiseOrValue<string>, _activityId: PromiseOrValue<BigNumberish>,signer?:any): Promise<boolean> {
	  return this.quickDraw().getUserHasClaimed(_user,_organizer,_activityId)
  }
	
	getUserHasWinner(_user: PromiseOrValue<string>, _organizer: PromiseOrValue<string>, _activityId: PromiseOrValue<BigNumberish>,signer?:any): Promise<boolean> {
		return this.quickDraw().getUserHasWinner(_user,_organizer,_activityId)
	}
	emergencyWithdraw(_organizer: PromiseOrValue<string>, _activityId: PromiseOrValue<BigNumberish>,signer?:any): Promise<any> {
		return this.quickDraw().connect(signer ?? this.signer).emergencyWithdraw(_organizer,_activityId)
	}
	getRemainingTokenIds(_organizer: PromiseOrValue<string>, _activityId: PromiseOrValue<BigNumberish>,signer?:any): Promise<any> {
		return this.quickDraw().getRemainingTokenIds(_organizer,_activityId)
	}
}
