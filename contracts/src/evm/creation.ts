import { CreationInterface } from "../proxy";
import { ethers } from "ethers";
import { IMartToken, IMartToken__factory } from "../typechain";
import { Config, Tx, Address, CreationArgs, Signer } from "../types";

export class Creation implements CreationInterface {
  readonly config: Config;
  readonly address: Address;
  private provider: ethers.providers.JsonRpcProvider;
  private imartToken: IMartToken

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["creation"];
    this.provider = config.provider as ethers.providers.JsonRpcProvider;
    this.imartToken = IMartToken__factory.connect(this.address, this.provider);

  }
  async create(args: CreationArgs, signer: Signer): Promise<Tx> {
    return await this.imartToken
      .connect(signer)
      .safeMint(await signer.getAddress(), args.uri);
  }
}
