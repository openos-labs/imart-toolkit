export namespace OPBNBSpec {
    export const MARKET = "";
    export const SINGLE_COLLECTIVE = "0xbCBA93211d12F8B8416aCA0F5b1184c918a58DFe";
    export const MULTIPLE_COLLECTIVE ="0x9fdCcb58448A75ae5e04527B0afF5939f47448EA";
    export const CURATION = "0x341372E09023B4aC9004F9425a036219f1Ab55C0";
    export const NFTLOTTERY = "";
    export const configs = {
      testnet: {
        addresses: {
          singleCollective: SINGLE_COLLECTIVE,
          multipleCollective: MULTIPLE_COLLECTIVE,
          curation: CURATION,
          market: MARKET,
          nftlottery: NFTLOTTERY
        },
      }
    }
  }