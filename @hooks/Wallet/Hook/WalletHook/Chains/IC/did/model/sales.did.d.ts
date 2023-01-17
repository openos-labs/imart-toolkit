import type { Principal } from '@dfinity/principal';
export interface CanisterSettings {
  'freezing_threshold' : [] | [bigint],
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : [] | [bigint],
  'compute_allocation' : [] | [bigint],
}
export interface CanisterStatus {
  'status' : Status,
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : CanisterSettings,
  'module_hash' : [] | [Array<number>],
}
export type DIP20Errors = { 'InsufficientAllowance' : null } |
  { 'InsufficientBalance' : null } |
  { 'ErrorOperationStyle' : null } |
  { 'LedgerTrap' : null } |
  { 'ErrorTo' : null } |
  { 'Other' : null } |
  { 'BlockUsed' : null } |
  { 'AmountTooSmall' : null };
export interface SaleInfo {
  'startTime' : bigint,
  'creator' : Principal,
  'whitelist' : [] | [Principal],
  'endTime' : bigint,
  'minPerUser' : bigint,
  'timestamp' : bigint,
  'paymentToken' : Principal,
  'price' : bigint,
  'amount' : bigint,
  'maxPerUser' : bigint,
  'canisterId' : Principal,
}
export interface Sales {
  'claimFee' : () => Promise<TxReceiptToken>,
  'createSale' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: bigint,
      arg_5: bigint,
      arg_6: bigint,
      arg_7: bigint,
      arg_8: bigint,
      arg_9: bigint,
      arg_10: bigint,
      arg_11: Principal,
      arg_12: [] | [Principal],
    ) => Promise<SaleInfo>,
  'getAllSales' : () => Promise<Array<SaleInfo>>,
  'getClosedSales' : () => Promise<Array<SaleInfo>>,
  'getCyclesBalance' : () => Promise<bigint>,
  'getNFTCanisterStatus' : (arg_0: Principal) => Promise<[] | [CanisterStatus]>,
  'getOpenSales' : () => Promise<Array<SaleInfo>>,
  'getSaleCount' : () => Promise<bigint>,
  'getSaleInfo' : (arg_0: Principal) => Promise<[] | [SaleInfo]>,
  'getStats' : () => Promise<Stats>,
  'getUpcomingSales' : () => Promise<Array<SaleInfo>>,
  'setController' : (arg_0: Principal) => Promise<boolean>,
  'setCyclesPerSale' : (arg_0: bigint) => Promise<undefined>,
  'setFee' : (arg_0: bigint) => Promise<boolean>,
  'setOwner' : (arg_0: Principal) => Promise<undefined>,
}
export interface Stats {
  'fee' : bigint,
  'cyclesPerSale' : bigint,
  'numSales' : bigint,
  'owner' : Principal,
  'feeTokenId' : Principal,
  'cycles' : bigint,
}
export type Status = { 'stopped' : null } |
  { 'stopping' : null } |
  { 'running' : null };
export type TxReceiptToken = { 'Ok' : bigint } |
  { 'Err' : DIP20Errors };
export interface _SERVICE extends Sales {}
