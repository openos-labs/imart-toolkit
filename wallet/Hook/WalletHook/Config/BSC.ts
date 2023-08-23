export namespace BscSpec {
  export const MARKET = "0x00000000000001ad428e4906aE43D8F9852d0dD6";
  export const SINGLE_COLLECTIVE = "0x3A43fAb6DA76152a4F3A73CA4D36ACa3e5Bb098a";
  export const MULTIPLE_COLLECTIVE =
    "0x787D3d66552C3F90574391ffd12F791725E23765";
  export const CURATION = "0x846DcAd71124046E146bd01DcA744835EF216eb2";
  export const QUICKDRAW = "0xE092DF7D1F7B43edd29C384a84c62E731F04A06b";
  export const NFTLOTTERY = "";
  export const configs = {
    testnet: {
      addresses: {
        singleCollective: SINGLE_COLLECTIVE,
        multipleCollective: MULTIPLE_COLLECTIVE,
        curation: CURATION,
        market: MARKET,
        nftlottery: NFTLOTTERY,
        quickDraw: QUICKDRAW,
      },
    },
  };
}
