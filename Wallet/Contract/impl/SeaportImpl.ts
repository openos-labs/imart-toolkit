import { ContractProxy } from "../Proxy";
import {
    AcceptOfferArgs,
    BuyTokenArgs,
    CancelOfferArgs, Create,
    CreateOfferArgs,
    DelistTokenArgs,
    ListTokenArgs,
    Order,
    SeaportSettings,
    Settings,
    Token,
    TxCallable,
} from "../types";
import { Seaport } from "@opensea/seaport-js";
// import { Network, OpenSeaSDK } from "opensea-js";
// import Web3 from "web3";
import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import {APTOS_CREATION_ADDRESS} from "../../Hook/WalletHook/Config";

export class SeaportImpl extends ContractProxy {
    settings: SeaportSettings
    provider: ethers.providers.Web3Provider;
    seaport: Seaport;
    // opensea: OpenSeaSDK;

    constructor(settings: Settings) {
        super(settings);
        this.settings = settings as SeaportSettings
        // this.opensea = new OpenSeaSDK(
        //     new Web3.providers.HttpProvider("https://goerli.infura.io"),
        //     {
        //         networkName: Network.Goerli,
        //         apiKey: ""
        //     }
        // );
        this.provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        this.seaport = new Seaport(this.provider);
    }

    async buyToken(args: BuyTokenArgs) {
        throw new Error("Method not implemented.");
    }

    async create(args: Create) {


    }
    async listToken(args: ListTokenArgs) {
        const seller = await this.provider.getSigner().getAddress();
        const { executeAllActions } = await this.seaport.createOrder(
            {
                offer: [
                    {
                        itemType: ItemType.ERC721,
                        token: args.tokenId,
                        identifier: `${args.tokenAmount}`,
                    },
                ],
                consideration: [
                    {
                        amount: ethers.utils
                            .parseEther(`${args.coinAmount}`)
                            .toString(),
                        recipient: seller,
                    },
                ],
            },
            seller
        );
        const orderWithCounter = await executeAllActions();
        console.log(orderWithCounter);
        return orderWithCounter;
    }
    async delistToken(args: DelistTokenArgs) {
        throw new Error("Method not implemented.");
    }
    createOffer(args: CreateOfferArgs) {
        throw new Error("Method not implemented.");
    }
    cancelOffer(args: CancelOfferArgs) {
        throw new Error("Method not implemented.");
    }
    acceptOffer(args: AcceptOfferArgs) {
        throw new Error("Method not implemented.");
    }

    async getAssets(owner: string): Promise<Token[]> {
        throw new Error("Method not implemented.");
        // const response = await this.opensea.api.getAssets({
        //     owner,
        //     limit: 100,
        // });
        // return response.assets.map((asset) => {
        //     return {
        //         tokenId: asset.tokenId || "",
        //         collectionId: asset.assetContract.address,
        //         collection: asset.collection.name,
        //         name: asset.name,
        //         description: asset.description,
        //         creator: asset.owner.address,
        //         owner: asset.owner.address,
        //         uri: asset.imageUrl,
        //     } as Token;
        // });
    }

    async getUserOrders(account: string): Promise<Order[]> {
        throw new Error("Method not implemented.");
        // const response = await this.opensea.api.getOrders({
        //     protocol: "seaport",
        //     side: "ask",
        //     owner: account,
        //     maker: account,
        // });
        // return response.orders.map(this.mapOrder);
    }

    async getCollectionOrders(collectionId: string): Promise<Order[]> {
        throw new Error("Method not implemented.");
        // const response = await this.opensea.api.getOrders({
        //     protocol: "seaport",
        //     side: "ask",
        //     assetContractAddress: collectionId,
        // });
        // return response.orders.map(this.mapOrder);
    }

    mapOrder(o: any): Order {
        let status = "LISTING";
        let buyer: string | undefined;
        if (o.cancelled) {
            status = "CANCELED";
        }
        if (o.finalized) {
            status = "SOLD";
            buyer = o.taker?.address ?? o.maker?.address;
        }
        return {
            price: o.currentPrice,
            createTime: Date.parse(o.createdDate),
            tokenId: o.protocolData.parameters.offer[0].identifierOrCriteria,
            collectionId: o.protocolData.parameters.offer[0].token,
            quantity: o.protocolData.parameters.offer[0].startAmount,
            seller: o.protocolData.parameters.offerer,
            status: status,
            orderId: o.orderHash,
            buyer,
            currency: o.takerAssetBundle.assetContract?.tokenSymbol,
            decimals: 18,
        } as Order;
    }
}
