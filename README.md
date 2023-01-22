# ⚒️ IMart frontend packages

- [Installation](#Installation)
- [Usage](#Usage)
- [Development](#Development)
  - [Local test](#Local-test)
  - [Publish](#Publish)

## Installation

```
npm install --save git@github.com:mix-labs/imart-toolkit.git#main
```

## Usage

```
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

// change package version before publish
export GITHUB_ACCESS_TOKEN=xxxxxxx
npm publish
```