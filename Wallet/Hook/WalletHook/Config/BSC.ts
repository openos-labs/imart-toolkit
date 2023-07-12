export namespace BscSpec {
    export const MARKET = "0x00000000000001ad428e4906aE43D8F9852d0dD6";
    export const SINGLE_COLLECTIVE = "0x83C62fD16A40288945553C9bC50036E6EC0f79A0";
    export const MULTIPLE_COLLECTIVE ="0x78A6d7FCA59deA2cD7a0ae255B52dBffD90bb8bC";
    export const CURATION = "0x846DcAd71124046E146bd01DcA744835EF216eb2";
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