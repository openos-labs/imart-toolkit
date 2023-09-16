import { Config } from "./types";
import { ContractProxy } from "./proxy";
import { Aptos } from "./aptos";
import { Evm } from "./evm";
import { QuickDraw__factory, QuickDraw } from "./typechain";
import { ethers } from "ethers";

export type Contract = Aptos | Evm;

export function Contractor<Contract extends ContractProxy>(
  Impl: new (config: Config) => Contract,
  config: Config
): Contract {
  return new Impl(config);
}

export class ContractorV2 {
  readonly config: Config;
  readonly signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;
  private _quickDraw: QuickDraw;
  constructor(config: Config) {
    this.config = config;
    if (
      config.provider &&
      config.provider instanceof ethers.providers.JsonRpcProvider
    ) {
      this.provider = config.provider as ethers.providers.JsonRpcProvider;
      this.signer = this.provider.getSigner();
    }
  }
  get quickDraw() {
    return this._quickDraw ?? (this._quickDraw = QuickDraw__factory.connect(this.config.addresses["quickDraw"], this.provider));
  }
}