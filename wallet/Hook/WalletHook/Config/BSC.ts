export namespace BscSpec {
  export const MARKET = "0x00000000000001ad428e4906aE43D8F9852d0dD6";
  export const SINGLE_COLLECTIVE = "0x7CEd67BfB6b25690C3d46a0773679cbeB0e059A6";
  export const MULTIPLE_COLLECTIVE =
    "0x281AA0645393Da4B81F3281F4a4932d232c57aaB";
  export const CURATION = "0x9677bE3ca5ee3F5973D91FF053F0BA1eCa59809F";
  export const QUICKDRAW = "0x91db77bBe3a79b654137f58157C41267A9830792";
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
