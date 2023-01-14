# ⚒️ IMart frontend packages

## Installation

```
npm install --save git@github.com:mix-labs/imart-toolkit.git#main
```

## Usage

```
import { ethers } from "ethers";
import { IMartToken__factory } from "imart-toolkit/evm"
const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
);
const imartTokenFactory = new IMartToken__factory(provider.getSigner(0));
const imartToken = imartTokenFactory.attach("<contract address>");
await imartToken
    .connect(provider.getSigner(0))
    .safeMint(account, "https://google.com");
```
