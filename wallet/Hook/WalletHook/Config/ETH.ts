export namespace EthereumSpec {
  export const MARKET = "0x00000000000001ad428e4906aE43D8F9852d0dD6";
  export const SINGLE_COLLECTIVE = "0x9ED826624d295a8B276947d567a5438Be83aaACC";
  export const MULTIPLE_COLLECTIVE =
    "0x16F88C3af47971Eeb071bdcDD8fcA146BE5F7C90";
  export const CURATION = "0xc1d86DfeD6ceb43d83c7fFEf264D8C9d764751eB";
  export const NFTLOTTERY = "0x50119e8e72E64746d84b808D0d040cB57DC35ed3";
  export const QUICKDRAW = "0xE092DF7D1F7B43edd29C384a84c62E731F04A06b";
  export const SBTUpgrade = "0x7D091734e3C9DA0a0458119997323872A97D34AE";
  export const configs = {
    testnet: {
      addresses: {
        singleCollective: SINGLE_COLLECTIVE,
        multipleCollective: MULTIPLE_COLLECTIVE,
        curation: CURATION,
        market: MARKET,
        nftlottery: NFTLOTTERY,
        quickDraw: QUICKDRAW,
        badgeNFTContract: SBTUpgrade,
      },
    },
  };
}
