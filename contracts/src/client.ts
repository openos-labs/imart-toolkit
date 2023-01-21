import { Config } from "./types";
import { ContractProxy } from "./proxy";
import { Aptos } from "./aptos";
import { Evm } from "./evm";

export type Contract = Aptos | Evm;

export function Contractor<Contract extends ContractProxy>(
  Impl: new (config: Config) => Contract,
  config: Config
): Contract {
  return new Impl(config);
}
