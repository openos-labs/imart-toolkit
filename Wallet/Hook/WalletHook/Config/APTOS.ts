export namespace AptosSpec {
    export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
    export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
    export const MARKET = "0x0ae196d71a77b77e151a8fae5af27ced2cd16b7f6ed951065b51faed40544bf8";
    export const SINGLE_COLLECTIVE = "0x0ae196d71a77b77e151a8fae5af27ced2cd16b7f6ed951065b51faed40544bf8";
    export const MULTIPLE_COLLECTIVE ="0x0ae196d71a77b77e151a8fae5af27ced2cd16b7f6ed951065b51faed40544bf8";
    export const CURATION = "0x0ae196d71a77b77e151a8fae5af27ced2cd16b7f6ed951065b51faed40544bf8";
    export const configs ={
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