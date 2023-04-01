export namespace AptosSpec {
    export const NODE_URL = "https://fullnode.testnet.aptoslabs.com";
    export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
    export const MARKET = "0x73545daede11168cbe4f5503f19929c7eebb888cffef27983ed374515f7e82a1";
    export const SINGLE_COLLECTIVE = "0x73545daede11168cbe4f5503f19929c7eebb888cffef27983ed374515f7e82a1";
    export const MULTIPLE_COLLECTIVE ="0x73545daede11168cbe4f5503f19929c7eebb888cffef27983ed374515f7e82a1";
    export const MIXVERSE_SPACE = "0x73545daede11168cbe4f5503f19929c7eebb888cffef27983ed374515f7e82a1";
    export const CURATION = "0x73545daede11168cbe4f5503f19929c7eebb888cffef27983ed374515f7e82a1";
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