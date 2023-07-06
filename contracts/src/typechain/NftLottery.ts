/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace NftLottery {
  export type ActivityInfoStruct = {
    organizer: PromiseOrValue<string>;
    activityId: PromiseOrValue<BigNumberish>;
    nftContractAddress: PromiseOrValue<string>;
    tokenIds: PromiseOrValue<BigNumberish>[];
    endBlockNumber: PromiseOrValue<BigNumberish>;
    merkleRoot: PromiseOrValue<BytesLike>;
  };

  export type ActivityInfoStructOutput = [
    string,
    BigNumber,
    string,
    BigNumber[],
    BigNumber,
    string
  ] & {
    organizer: string;
    activityId: BigNumber;
    nftContractAddress: string;
    tokenIds: BigNumber[];
    endBlockNumber: BigNumber;
    merkleRoot: string;
  };
}

export interface NftLotteryInterface extends utils.Interface {
  functions: {
    "acitivityExist(bytes32)": FunctionFragment;
    "acitivityPrizeTokenIds(bytes32,uint256)": FunctionFragment;
    "claim(address,uint256,address,uint256,bytes32[])": FunctionFragment;
    "createActivity(address,uint256,uint256,uint256[])": FunctionFragment;
    "emergencyWithdraw(address,uint256,address)": FunctionFragment;
    "getActivityInfo(address,uint256)": FunctionFragment;
    "getRemainingTokenIds(address,uint256)": FunctionFragment;
    "hasClaimed(bytes32)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "organizerActivityInfo(bytes32)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setMerkleRoot(uint256,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawPrize(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acitivityExist"
      | "acitivityPrizeTokenIds"
      | "claim"
      | "createActivity"
      | "emergencyWithdraw"
      | "getActivityInfo"
      | "getRemainingTokenIds"
      | "hasClaimed"
      | "onERC721Received"
      | "organizerActivityInfo"
      | "owner"
      | "renounceOwnership"
      | "setMerkleRoot"
      | "transferOwnership"
      | "withdrawPrize"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acitivityExist",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "acitivityPrizeTokenIds",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createActivity",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getActivityInfo",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRemainingTokenIds",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasClaimed",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "organizerActivityInfo",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMerkleRoot",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPrize",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "acitivityExist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acitivityPrizeTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createActivity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActivityInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRemainingTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasClaimed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "organizerActivityInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPrize",
    data: BytesLike
  ): Result;

  events: {
    "Claimed(address,uint256,uint256)": EventFragment;
    "CreateActivity(address,uint256,address,uint256[],uint256)": EventFragment;
    "MerkleRoot(uint256,bytes32)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "WithdrawPrize(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateActivity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MerkleRoot"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawPrize"): EventFragment;
}

export interface ClaimedEventObject {
  claimer: string;
  activityId: BigNumber;
  tokenId: BigNumber;
}
export type ClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ClaimedEventObject
>;

export type ClaimedEventFilter = TypedEventFilter<ClaimedEvent>;

export interface CreateActivityEventObject {
  organizer: string;
  activityId: BigNumber;
  nftContractAddress: string;
  tokenIds: BigNumber[];
  endBlockNumber: BigNumber;
}
export type CreateActivityEvent = TypedEvent<
  [string, BigNumber, string, BigNumber[], BigNumber],
  CreateActivityEventObject
>;

export type CreateActivityEventFilter = TypedEventFilter<CreateActivityEvent>;

export interface MerkleRootEventObject {
  activityId: BigNumber;
  merkleRoot: string;
}
export type MerkleRootEvent = TypedEvent<
  [BigNumber, string],
  MerkleRootEventObject
>;

export type MerkleRootEventFilter = TypedEventFilter<MerkleRootEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface WithdrawPrizeEventObject {
  organizer: string;
  activityId: BigNumber;
}
export type WithdrawPrizeEvent = TypedEvent<
  [string, BigNumber],
  WithdrawPrizeEventObject
>;

export type WithdrawPrizeEventFilter = TypedEventFilter<WithdrawPrizeEvent>;

export interface NftLottery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NftLotteryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    acitivityPrizeTokenIds(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claim(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContract: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createActivity(
      _nftContractAddress: PromiseOrValue<string>,
      _endBlockNumber: PromiseOrValue<BigNumberish>,
      _activityId: PromiseOrValue<BigNumberish>,
      _tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getActivityInfo(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[NftLottery.ActivityInfoStructOutput]>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    organizerActivityInfo(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, string] & {
        organizer: string;
        activityId: BigNumber;
        nftContractAddress: string;
        endBlockNumber: BigNumber;
        merkleRoot: string;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMerkleRoot(
      _activityId: PromiseOrValue<BigNumberish>,
      _merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawPrize(
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acitivityExist(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  acitivityPrizeTokenIds(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claim(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    _nftContract: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    merkleProof: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createActivity(
    _nftContractAddress: PromiseOrValue<string>,
    _endBlockNumber: PromiseOrValue<BigNumberish>,
    _activityId: PromiseOrValue<BigNumberish>,
    _tokenIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    _nftContractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getActivityInfo(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<NftLottery.ActivityInfoStructOutput>;

  getRemainingTokenIds(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  hasClaimed(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  onERC721Received(
    operator: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  organizerActivityInfo(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, string] & {
      organizer: string;
      activityId: BigNumber;
      nftContractAddress: string;
      endBlockNumber: BigNumber;
      merkleRoot: string;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMerkleRoot(
    _activityId: PromiseOrValue<BigNumberish>,
    _merkleRoot: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawPrize(
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    acitivityPrizeTokenIds(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claim(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContract: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    createActivity(
      _nftContractAddress: PromiseOrValue<string>,
      _endBlockNumber: PromiseOrValue<BigNumberish>,
      _activityId: PromiseOrValue<BigNumberish>,
      _tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContractAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getActivityInfo(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<NftLottery.ActivityInfoStructOutput>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    organizerActivityInfo(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, string] & {
        organizer: string;
        activityId: BigNumber;
        nftContractAddress: string;
        endBlockNumber: BigNumber;
        merkleRoot: string;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setMerkleRoot(
      _activityId: PromiseOrValue<BigNumberish>,
      _merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawPrize(
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Claimed(address,uint256,uint256)"(
      claimer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): ClaimedEventFilter;
    Claimed(
      claimer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): ClaimedEventFilter;

    "CreateActivity(address,uint256,address,uint256[],uint256)"(
      organizer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      nftContractAddress?: null,
      tokenIds?: null,
      endBlockNumber?: PromiseOrValue<BigNumberish> | null
    ): CreateActivityEventFilter;
    CreateActivity(
      organizer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      nftContractAddress?: null,
      tokenIds?: null,
      endBlockNumber?: PromiseOrValue<BigNumberish> | null
    ): CreateActivityEventFilter;

    "MerkleRoot(uint256,bytes32)"(
      activityId?: PromiseOrValue<BigNumberish> | null,
      merkleRoot?: null
    ): MerkleRootEventFilter;
    MerkleRoot(
      activityId?: PromiseOrValue<BigNumberish> | null,
      merkleRoot?: null
    ): MerkleRootEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "WithdrawPrize(address,uint256)"(
      organizer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null
    ): WithdrawPrizeEventFilter;
    WithdrawPrize(
      organizer?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null
    ): WithdrawPrizeEventFilter;
  };

  estimateGas: {
    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    acitivityPrizeTokenIds(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claim(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContract: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createActivity(
      _nftContractAddress: PromiseOrValue<string>,
      _endBlockNumber: PromiseOrValue<BigNumberish>,
      _activityId: PromiseOrValue<BigNumberish>,
      _tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getActivityInfo(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    organizerActivityInfo(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMerkleRoot(
      _activityId: PromiseOrValue<BigNumberish>,
      _merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawPrize(
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    acitivityPrizeTokenIds(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claim(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContract: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      merkleProof: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createActivity(
      _nftContractAddress: PromiseOrValue<string>,
      _endBlockNumber: PromiseOrValue<BigNumberish>,
      _activityId: PromiseOrValue<BigNumberish>,
      _tokenIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      _nftContractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getActivityInfo(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    organizerActivityInfo(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMerkleRoot(
      _activityId: PromiseOrValue<BigNumberish>,
      _merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawPrize(
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
