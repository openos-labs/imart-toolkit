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

export declare namespace QuickDraw {
  export type CreateActivityParamStruct = {
    activityId: PromiseOrValue<BigNumberish>;
    startTime: PromiseOrValue<BigNumberish>;
    endTime: PromiseOrValue<BigNumberish>;
    totalPrizeQuantity: PromiseOrValue<BigNumberish>;
    expectedParticipant: PromiseOrValue<BigNumberish>;
    nftAddress: PromiseOrValue<string>;
    nftQuantity: PromiseOrValue<BigNumberish>;
    nftTokenIds: PromiseOrValue<BigNumberish>[];
    nftEachQuantity: PromiseOrValue<BigNumberish>;
    erc20Address: PromiseOrValue<string>;
    erc20Amount: PromiseOrValue<BigNumberish>;
    erc20Quantity: PromiseOrValue<BigNumberish>;
    erc20EachQuantity: PromiseOrValue<BigNumberish>;
  };

  export type CreateActivityParamStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber[],
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    activityId: BigNumber;
    startTime: BigNumber;
    endTime: BigNumber;
    totalPrizeQuantity: BigNumber;
    expectedParticipant: BigNumber;
    nftAddress: string;
    nftQuantity: BigNumber;
    nftTokenIds: BigNumber[];
    nftEachQuantity: BigNumber;
    erc20Address: string;
    erc20Amount: BigNumber;
    erc20Quantity: BigNumber;
    erc20EachQuantity: BigNumber;
  };
}

export interface QuickDrawInterface extends utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "acitivityExist(bytes32)": FunctionFragment;
    "createActivity((uint256,uint256,uint256,uint256,uint256,address,uint256,uint256[],uint256,address,uint256,uint256,uint256))": FunctionFragment;
    "emergencyWithdraw(address,uint256)": FunctionFragment;
    "getActivityTotalPartcipant(address,uint256)": FunctionFragment;
    "getRemainingErc20(address,uint256)": FunctionFragment;
    "getRemainingTokenIds(address,uint256)": FunctionFragment;
    "getUserHasClaimed(address,address,uint256)": FunctionFragment;
    "getUserHasWinner(address,address,uint256)": FunctionFragment;
    "hasClaimed(bytes32)": FunctionFragment;
    "hasWinner(bytes32)": FunctionFragment;
    "initialize()": FunctionFragment;
    "joinActivity(uint256,address)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "organizerActivityInfo(bytes32)": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawPrize(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptOwnership"
      | "acitivityExist"
      | "createActivity"
      | "emergencyWithdraw"
      | "getActivityTotalPartcipant"
      | "getRemainingErc20"
      | "getRemainingTokenIds"
      | "getUserHasClaimed"
      | "getUserHasWinner"
      | "hasClaimed"
      | "hasWinner"
      | "initialize"
      | "joinActivity"
      | "onERC721Received"
      | "organizerActivityInfo"
      | "owner"
      | "pendingOwner"
      | "renounceOwnership"
      | "transferOwnership"
      | "withdrawPrize"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acitivityExist",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "createActivity",
    values: [QuickDraw.CreateActivityParamStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getActivityTotalPartcipant",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRemainingErc20",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRemainingTokenIds",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserHasClaimed",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserHasWinner",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "hasClaimed",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasWinner",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "joinActivity",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
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
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
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
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acitivityExist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createActivity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActivityTotalPartcipant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRemainingErc20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRemainingTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserHasClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserHasWinner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasWinner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "joinActivity",
    data: BytesLike
  ): Result;
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
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
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
    "Initialized(uint8)": EventFragment;
    "JoinActivity(address,uint256,bool)": EventFragment;
    "OwnershipTransferStarted(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "WithdrawPrize(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JoinActivity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawPrize"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface JoinActivityEventObject {
  user: string;
  activityId: BigNumber;
  isWinner: boolean;
}
export type JoinActivityEvent = TypedEvent<
  [string, BigNumber, boolean],
  JoinActivityEventObject
>;

export type JoinActivityEventFilter = TypedEventFilter<JoinActivityEvent>;

export interface OwnershipTransferStartedEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferStartedEvent = TypedEvent<
  [string, string],
  OwnershipTransferStartedEventObject
>;

export type OwnershipTransferStartedEventFilter =
  TypedEventFilter<OwnershipTransferStartedEvent>;

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

export interface QuickDraw extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: QuickDrawInterface;

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
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    createActivity(
      createActivityParam: QuickDraw.CreateActivityParamStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getActivityTotalPartcipant(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRemainingErc20(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getUserHasClaimed(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getUserHasWinner(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hasWinner(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    joinActivity(
      activityId: PromiseOrValue<BigNumberish>,
      organizer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

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
      [
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        startTime: BigNumber;
        endTime: BigNumber;
        organizer: string;
        activityId: BigNumber;
        totalPrizeType: BigNumber;
        totalPrizeQuantity: BigNumber;
        totalPartcipant: BigNumber;
        expectedParticipant: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingOwner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
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

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acitivityExist(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  createActivity(
    createActivityParam: QuickDraw.CreateActivityParamStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getActivityTotalPartcipant(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRemainingErc20(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRemainingTokenIds(
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getUserHasClaimed(
    _user: PromiseOrValue<string>,
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getUserHasWinner(
    _user: PromiseOrValue<string>,
    _organizer: PromiseOrValue<string>,
    _activityId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hasClaimed(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hasWinner(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  joinActivity(
    activityId: PromiseOrValue<BigNumberish>,
    organizer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

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
    [
      BigNumber,
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      startTime: BigNumber;
      endTime: BigNumber;
      organizer: string;
      activityId: BigNumber;
      totalPrizeType: BigNumber;
      totalPrizeQuantity: BigNumber;
      totalPartcipant: BigNumber;
      expectedParticipant: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingOwner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
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
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    createActivity(
      createActivityParam: QuickDraw.CreateActivityParamStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getActivityTotalPartcipant(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRemainingErc20(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getUserHasClaimed(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getUserHasWinner(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hasWinner(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(overrides?: CallOverrides): Promise<void>;

    joinActivity(
      activityId: PromiseOrValue<BigNumberish>,
      organizer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

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
      [
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        startTime: BigNumber;
        endTime: BigNumber;
        organizer: string;
        activityId: BigNumber;
        totalPrizeType: BigNumber;
        totalPrizeQuantity: BigNumber;
        totalPartcipant: BigNumber;
        expectedParticipant: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingOwner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

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
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "JoinActivity(address,uint256,bool)"(
      user?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      isWinner?: PromiseOrValue<boolean> | null
    ): JoinActivityEventFilter;
    JoinActivity(
      user?: PromiseOrValue<string> | null,
      activityId?: PromiseOrValue<BigNumberish> | null,
      isWinner?: PromiseOrValue<boolean> | null
    ): JoinActivityEventFilter;

    "OwnershipTransferStarted(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferStartedEventFilter;
    OwnershipTransferStarted(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferStartedEventFilter;

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
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createActivity(
      createActivityParam: QuickDraw.CreateActivityParamStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getActivityTotalPartcipant(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRemainingErc20(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserHasClaimed(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserHasWinner(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasWinner(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    joinActivity(
      activityId: PromiseOrValue<BigNumberish>,
      organizer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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

    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
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
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acitivityExist(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createActivity(
      createActivityParam: QuickDraw.CreateActivityParamStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getActivityTotalPartcipant(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRemainingErc20(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRemainingTokenIds(
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserHasClaimed(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserHasWinner(
      _user: PromiseOrValue<string>,
      _organizer: PromiseOrValue<string>,
      _activityId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasClaimed(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasWinner(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    joinActivity(
      activityId: PromiseOrValue<BigNumberish>,
      organizer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
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

    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
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
