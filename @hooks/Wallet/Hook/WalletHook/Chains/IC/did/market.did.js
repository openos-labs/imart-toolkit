export const idlFactory = ({IDL}) => {
    const Result = IDL.Variant({'ok': IDL.Bool, 'err': IDL.Text});
    const Offer = IDL.Record({
        'end': IDL.Nat,
        'start': IDL.Nat,
        'price': IDL.Nat,
        'bidder': IDL.Principal,
    });
    const TxReceipt = IDL.Variant({'ok': IDL.Nat, 'err': IDL.Text});
    const CollectionExt = IDL.Record({
        'floor': IDL.Opt(IDL.Nat),
        'creator': IDL.Principal,
        'desc': IDL.Text,
        'orders': IDL.Nat,
        'logo': IDL.Text,
        'name': IDL.Text,
        'cover': IDL.Text,
        'feeRate': IDL.Nat,
        'volume': IDL.Nat,
        'historyOrders': IDL.Nat,
        'category': IDL.Text,
        'index': IDL.Nat,
        'canisterId': IDL.Principal,
    });
    const OrderStatus = IDL.Variant({
        'done': IDL.Nat,
        'open': IDL.Nat,
        'cancel': IDL.Nat,
    });
    const OrderExt = IDL.Record({
        'status': OrderStatus,
        'token': IDL.Principal,
        'createAt': IDL.Int,
        'tokenIndex': IDL.Nat,
        'owner': IDL.Principal,
        'index': IDL.Nat,
        'price': IDL.Nat,
    });
    const OfferExt = IDL.Record({
        'end': IDL.Nat,
        'token': IDL.Principal,
        'tokenId': IDL.Nat,
        'start': IDL.Nat,
        'price': IDL.Nat,
        'bidder': IDL.Principal,
    });
    const Result_1 = IDL.Variant({'ok': OrderExt, 'err': IDL.Text});
    const UserInfoExt = IDL.Record({
        'favorites': IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
        'desc': IDL.Text,
        'logo': IDL.Text,
        'name': IDL.Text,
        'cover': IDL.Text,
    });
    const Attribute = IDL.Record({'key': IDL.Text, 'value': IDL.Text});
    const Location = IDL.Variant({
        'Web': IDL.Text,
        'AssetCanister': IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat8)),
        'IPFS': IDL.Text,
        'InCanister': IDL.Vec(IDL.Nat8),
    });
    const TokenMetadata = IDL.Record({
        'filetype': IDL.Text,
        'attributes': IDL.Vec(Attribute),
        'location': Location,
    });
    const Time = IDL.Int;
    const TokenInfoExt = IDL.Record({
        'owner': IDL.Principal,
        'metadata': IDL.Opt(TokenMetadata),
        'operator': IDL.Opt(IDL.Principal),
        'timestamp': Time,
        'index': IDL.Nat,
    });
    const Market = IDL.Service({
        'addCollection': IDL.Func(
            [IDL.Principal, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
            [Result],
            [],
        ),
        'addFavorite': IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
        'allOffers': IDL.Func(
            [IDL.Principal, IDL.Nat],
            [IDL.Vec(Offer)],
            ['query'],
        ),
        'balanceOf': IDL.Func([IDL.Principal], [IDL.Nat], []),
        'buy': IDL.Func([IDL.Nat], [TxReceipt], []),
        'cancelOrder': IDL.Func([IDL.Nat], [TxReceipt], []),
        'deposit': IDL.Func([IDL.Nat], [TxReceipt], []),
        'getCollection': IDL.Func(
            [IDL.Principal],
            [IDL.Opt(CollectionExt)],
            ['query'],
        ),
        'getCollectionOrders': IDL.Func(
            [IDL.Principal],
            [IDL.Vec(OrderExt)],
            ['query'],
        ),
        'getCollectionVolume': IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
        'getCollections': IDL.Func([], [IDL.Vec(CollectionExt)], ['query']),
        'getCollectionsByCategory': IDL.Func(
            [IDL.Text],
            [IDL.Vec(CollectionExt)],
            ['query'],
        ),
        'getNFTs': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        'getOffer': IDL.Func([IDL.Principal], [IDL.Vec(OfferExt)], ['query']),
        'getOpenOrders': IDL.Func([], [IDL.Vec(OrderExt)], ['query']),
        'getOpenOrdersByPriceRange': IDL.Func(
            [IDL.Principal, IDL.Nat, IDL.Nat],
            [IDL.Vec(OrderExt)],
            ['query'],
        ),
        'getOpenOrdersByToken': IDL.Func(
            [IDL.Principal, IDL.Nat],
            [Result_1],
            ['query'],
        ),
        'getOrder': IDL.Func([IDL.Nat], [IDL.Opt(OrderExt)], ['query']),
        'getTotalVolume': IDL.Func([], [IDL.Nat], ['query']),
        'getUserInfo': IDL.Func([IDL.Principal], [UserInfoExt], ['query']),
        'getUserOrders': IDL.Func([IDL.Principal], [IDL.Vec(OrderExt)], ['query']),
        'getUserOwnedNFTs': IDL.Func(
            [IDL.Principal],
            [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(TokenInfoExt)))],
            [],
        ),
        'isFavorite': IDL.Func(
            [IDL.Principal, IDL.Principal, IDL.Nat],
            [IDL.Bool],
            ['query'],
        ),
        'lazyBuy': IDL.Func([IDL.Nat], [TxReceipt], []),
        'listToken': IDL.Func([IDL.Principal, IDL.Nat, IDL.Nat], [TxReceipt], []),
        'offerIt': IDL.Func(
            [IDL.Principal, IDL.Nat, IDL.Nat, IDL.Nat],
            [IDL.Bool],
            [],
        ),
        'removeFavorite': IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
        'setCollectionCategory': IDL.Func([IDL.Principal, IDL.Text], [Result], []),
        'setCollectionCover': IDL.Func([IDL.Principal, IDL.Text], [Result], []),
        'setCollectionDesc': IDL.Func([IDL.Principal, IDL.Text], [Result], []),
        'setCollectionFee': IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
        'setCollectionLogo': IDL.Func([IDL.Principal, IDL.Text], [Result], []),
        'setUserCover': IDL.Func([IDL.Text], [Result], []),
        'setUserDesc': IDL.Func([IDL.Text], [Result], []),
        'setUserLogo': IDL.Func([IDL.Text], [Result], []),
        'setUserName': IDL.Func([IDL.Text], [Result], []),
        'setUserProfile': IDL.Func(
            [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
            [Result],
            [],
        ),
        'sortOpenOrdersByPriceAsc': IDL.Func(
            [IDL.Principal],
            [IDL.Vec(OrderExt)],
            ['query'],
        ),
        'sortOpenOrdersByPriceDesc': IDL.Func(
            [IDL.Principal],
            [IDL.Vec(OrderExt)],
            ['query'],
        ),
        'updatePrice': IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
        'withdraw': IDL.Func([IDL.Nat], [TxReceipt], []),
    });
    return Market;
};
export const init = ({IDL}) => {
    return [IDL.Principal, IDL.Principal, IDL.Principal];
};
