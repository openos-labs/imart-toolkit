export namespace PolygonSpec {
  export const MARKET = "";
  export const SINGLE_COLLECTIVE = "0xbCBA93211d12F8B8416aCA0F5b1184c918a58DFe";
  export const MULTIPLE_COLLECTIVE ="0x0f3ED7652caB58F0c9D79f97fF3eB13b307c5fdC";
  export const MIXVERSE_SPACE = "0x948Ff94B446f27D3CD8fA6dcA2D37d3E00F78Fc1";
  export const CURATION = "0x9fdCcb58448A75ae5e04527B0afF5939f47448EA";
  export const configs = {
    testnet: {
      addresses: {
        singleCollective: SINGLE_COLLECTIVE,
        multipleCollective: MULTIPLE_COLLECTIVE,
        curation: CURATION,
        market: MARKET
      },
    }
  }
}