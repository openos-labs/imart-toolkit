export const idlFactory = ({ IDL }) => {
  const DIP20Errors = IDL.Variant({
    'InsufficientAllowance' : IDL.Null,
    'InsufficientBalance' : IDL.Null,
    'ErrorOperationStyle' : IDL.Null,
    'LedgerTrap' : IDL.Null,
    'ErrorTo' : IDL.Null,
    'Other' : IDL.Null,
    'BlockUsed' : IDL.Null,
    'AmountTooSmall' : IDL.Null,
  });
  const TxReceiptToken = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : DIP20Errors });
  const SaleInfo = IDL.Record({
    'startTime' : IDL.Int,
    'creator' : IDL.Principal,
    'whitelist' : IDL.Opt(IDL.Principal),
    'endTime' : IDL.Int,
    'minPerUser' : IDL.Nat,
    'timestamp' : IDL.Int,
    'paymentToken' : IDL.Principal,
    'price' : IDL.Nat,
    'amount' : IDL.Nat,
    'maxPerUser' : IDL.Nat,
    'canisterId' : IDL.Principal,
  });
  const Status = IDL.Variant({
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const CanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Opt(IDL.Nat),
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Opt(IDL.Nat),
    'compute_allocation' : IDL.Opt(IDL.Nat),
  });
  const CanisterStatus = IDL.Record({
    'status' : Status,
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : CanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Stats = IDL.Record({
    'fee' : IDL.Nat,
    'cyclesPerSale' : IDL.Nat,
    'numSales' : IDL.Nat,
    'owner' : IDL.Principal,
    'feeTokenId' : IDL.Principal,
    'cycles' : IDL.Nat,
  });
  const Sales = IDL.Service({
    'claimFee' : IDL.Func([], [TxReceiptToken], []),
    'createSale' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Int,
          IDL.Int,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Principal,
          IDL.Opt(IDL.Principal),
        ],
        [SaleInfo],
        [],
      ),
    'getAllSales' : IDL.Func([], [IDL.Vec(SaleInfo)], ['query']),
    'getClosedSales' : IDL.Func([], [IDL.Vec(SaleInfo)], ['query']),
    'getCyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getNFTCanisterStatus' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(CanisterStatus)],
        [],
      ),
    'getOpenSales' : IDL.Func([], [IDL.Vec(SaleInfo)], ['query']),
    'getSaleCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getSaleInfo' : IDL.Func([IDL.Principal], [IDL.Opt(SaleInfo)], ['query']),
    'getStats' : IDL.Func([], [Stats], ['query']),
    'getUpcomingSales' : IDL.Func([], [IDL.Vec(SaleInfo)], ['query']),
    'setController' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'setCyclesPerSale' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setFee' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'setOwner' : IDL.Func([IDL.Principal], [], ['oneway']),
  });
  return Sales;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Nat];
};
