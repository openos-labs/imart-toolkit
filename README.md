# ⚒️ IMart frontend packages

- [Installation](#Installation)
- [Usage](#Usage)
- [Development](#Development)
  - [Local test](#Local-test)
  - [Publish](#Publish)

To pull and install package via the NPM CLI, you'll need:

A personal access token (you can create a personal acess token here)
The personal access token with the correct scopes, repo and read:packages to be granted access to the GitHub Package Registry.

Authentication via npm login, using your Github email for the username and the personal access token as your password:



## Installation

```
npm install @openos-labs/imart-toolkit
```

## Usage

```
import { Contractor } from "@openos-labs/imart-toolkit/contracts";
const configuration = {
    addresses: {
      creation: imartToken.address,
      curation: curation.address,
      market: "",
    },
    provider: ethers.getDefaultProvider(),
  };
const contractor = Contractor(Evm, config);
await contractor.createGallery(
    {
      collection: spaceContract,
      tokenIdentifier: spaceTokenId.toString(),
      spaceType: "art",
      name: "Hollywood",
      metadataUri:
        "https://mixverse-spaces.s3.amazonaws.com/mixverse-gallery-1.json",
    },                                                                          // payload
    curator                                                                     // signer
  );
```

## Development

### Local test

```
// start hardhat node
yarn workspace @imart/contracts hardhat node

// run tests
yarn workspace @imart/contracts hardhat test
```

### Publish

```
// generate github access token
// https://github.com/settings/tokens

// password == github access token
npm login --registry=https://npm.pkg.github.com

// upgrade package version before publish
export GITHUB_ACCESS_TOKEN=xxxxxxx
npm publish
```
