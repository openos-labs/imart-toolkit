export namespace ZkSyncSpec {
  export const MARKET = "";
  export const SINGLE_COLLECTIVE = "0x6BE8b329633c792f08af07197744Fe547eF8A644";
  export const MULTIPLE_COLLECTIVE =
    "0x8359E0d0970D460DCB5420C30293401D25D1e3eb";
  export const CURATION = "0x7E88e6848E968fF186cCE619aA0b203A209e2797";
  export const NFTLOTTERY = "";
  export const configs = {
    testnet: {
      addresses: {
        singleCollective: SINGLE_COLLECTIVE,
        multipleCollective: MULTIPLE_COLLECTIVE,
        curation: CURATION,
        market: MARKET,
        nftlottery: NFTLOTTERY,
        quickDraw: "",
      },
    },
  };
}
