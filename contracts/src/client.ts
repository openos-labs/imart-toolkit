import { Config } from "./types";
import { ContractProxy } from "./proxy";

export function Contractor<T extends ContractProxy>(
  Impl: new (config: Config) => T,
  config: Config
): T {
  return new Impl(config);
}
