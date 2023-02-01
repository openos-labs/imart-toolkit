// @ts-nocheck
import { CreationInterface } from "../proxy";
import { Config, CreationArgs, Tx } from "../types";
export class Creation implements CreationInterface {
  readonly config: Config;
  readonly handle: string;
  constructor(config: Config) {
    this.config = config;
    this.handle = `${this.config.addresses["creation"]}::creation`;
  }
  create(args: CreationArgs): Promise<Tx> {
    const payload = {
      type: "entry_function_payload",
      function: `${this.handle}::create`,
      type_arguments: [],
      arguments: [args.category, args.title, args.description, args.uri],
    };
    return this.config?.submitTx!(payload);
  }
}
