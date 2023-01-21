import { Config } from "./types";
import { Aptos } from "./aptos";
import { Evm } from "./evm";

export type Protocol = "aptos" | "evm";

export const ContractClient = (protocol: Protocol, config: Config) => {
  switch (protocol) {
    case "aptos":
      return new Aptos(config);
    case "evm":
      return new Evm(config);
  }
};
