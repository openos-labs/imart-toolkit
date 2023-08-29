import { BSCAddresses } from "./addresses.config";

const { testnet, mainnet } = BSCAddresses;
const network = import.meta.env.ENV_NETWORK || "testnet";
const thatNetAddress = BSCAddresses[network];

export namespace BscSpec {
  export const MARKET = thatNetAddress.MARKET;
  export const SINGLE_COLLECTIVE = thatNetAddress.SINGLE_COLLECTIVE;
  export const MULTIPLE_COLLECTIVE = thatNetAddress.MULTIPLE_COLLECTIVE;
  export const CURATION = thatNetAddress.CURATION;
  export const QUICKDRAW = thatNetAddress.QUICKDRAW;
  export const NFTLOTTERY = thatNetAddress.NFTLOTTERY;
  export const configs = {
    testnet: {
      addresses: {
        singleCollective: testnet.SINGLE_COLLECTIVE,
        multipleCollective: testnet.MULTIPLE_COLLECTIVE,
        curation: testnet.CURATION,
        market: testnet.MARKET,
        nftlottery: testnet.NFTLOTTERY,
        quickDraw: testnet.QUICKDRAW,
      },
    },
    mainnet: {
      addresses: {
        singleCollective: mainnet.SINGLE_COLLECTIVE,
        multipleCollective: mainnet.MULTIPLE_COLLECTIVE,
        curation: mainnet.CURATION,
        market: mainnet.MARKET,
        nftlottery: mainnet.NFTLOTTERY,
        quickDraw: mainnet.QUICKDRAW,
      },
    },
  };
}
