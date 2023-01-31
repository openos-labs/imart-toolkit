import { CreationInterface } from "../proxy";
import { ethers } from "ethers";
import { IMartToken, IMartToken__factory } from "../typechain";
import { Config, Tx, Address, CreationArgs, Signer } from "../types";

export class Creation implements CreationInterface {
  readonly config: Config;
  readonly address: Address;
  private provider: ethers.providers.JsonRpcProvider;
  private imartToken: IMartToken;

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["creation"];
    if (
      config.provider &&
      config.provider instanceof ethers.providers.Web3Provider
    ) {
      this.provider = config.provider as ethers.providers.Web3Provider;
      this.imartToken = IMartToken__factory.connect(
        this.address,
        this.provider
      );
    }
  }
  async create(args: CreationArgs, signer: Signer): Promise<Tx> {
    const owner = await this.provider.getSigner().getAddress();
    return await this.imartToken
      .connect(this.provider)
      .safeMint(owner, args.uri);
  }
}
