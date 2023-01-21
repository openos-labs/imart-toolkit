import { CreationInterface } from "../proxy";
import { Address, Config, Create, Tx } from "../types";
import { ethers } from "ethers";
import { IMartToken__factory } from "../typechain";

export class Creation implements CreationInterface {
  readonly config: Config;
  readonly address: Address;
  readonly signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;

  constructor(config: Config) {
    this.config = config;
    this.address = config.addresses["creation"];
    this.signer = config.signer;
    this.provider = config.provider as ethers.providers.JsonRpcProvider;

  }
  async create(args: Create): Promise<Tx> {
    const imartToken = IMartToken__factory.connect(this.address, this.provider);
    return await imartToken
      .connect(this.signer)
      .safeMint(await this.signer.getAddress(), args.uri);
  }
}
