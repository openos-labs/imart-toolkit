import { ContractTransaction } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish } from "ethers";
import { ethers } from "hardhat";
import "typechain";
import {
  Contractor,
  Curation,
  MixverseSpace,
  MixverseSpace__factory,
  SingleCollective__factory,
  SingleCollective,
  ERC721__factory,
  ERC721,
} from "../src";
import { Evm } from "../src/evm";
import { alice_arts, bob_arts } from "./testdata";
import * as addr from "./addresses.json";

let contractor: Evm;
let singleCollective: SingleCollective;
let mixverseSpace: MixverseSpace;
let curation: Curation;
let erc721: ERC721;
let owner: SignerWithAddress;
let alice: SignerWithAddress;
let bob: SignerWithAddress;
let curator: SignerWithAddress;
let buyer: SignerWithAddress;

async function addWhitelist(): Promise<ContractTransaction> {
  return await curation.setWhitelist(curator.address, true);
}

async function createGallery(): Promise<ContractTransaction> {
  const spaceContract = mixverseSpace.address;
  const spaceTokenId = 1;
  return await contractor.createGallery(
    {
      collection: spaceContract,
      tokenIdentifier: spaceTokenId.toString(),
      spaceType: "art",
      name: "Hollywood",
      metadataUri:
        "https://mixverse-spaces.s3.amazonaws.com/mixverse-gallery-1.json",
    },
    curator
  );
}

async function sendOffer(
  from: SignerWithAddress,
  tokenId: BigNumberish
): Promise<ContractTransaction> {
  const galleries = await curation.getCuratorGalleries(from.address);
  const gallery = galleries[0];
  const price = ethers.utils.parseEther("0.11");
  const feerate = BigNumber.from(0.001 * Math.pow(10, 18));
  const offerDuration = 3600 * 24 * 30;
  const exhibitDuration = 3600 * 24 * 30;

  // ignorable fields on EVM contract:
  // tokenOwner, tokenCreator, tokenPropertyVersion
  return await contractor.createCurationOffer(
    {
      tokenOwner: "",
      tokenCreator: "",
      collectionName: "",
      tokenName: "",
      collectionIdentifier: erc721.address,
      tokenIdentifier: tokenId.toString(),
      tokenPropertyVersion: "",
      galleryId: gallery.id.toString(),
      price: price.toString(),
      offerDuration: offerDuration,
      exhibitExpiredAt: exhibitDuration,
      url: "https://github.com",
      additionalInfo: '{"remark": "help!", "tel": "+86xxxxx", "any other": ""}',
    },
    from
  );
}

async function acceptOffer(signer: SignerWithAddress, offerId: BigNumberish) {
  return await contractor.replyCurationOffer(
    { offerId: offerId.toString(), reply: true },
    signer
  );
}

async function rejectOffer(signer: SignerWithAddress, offerId: BigNumberish) {
  return await contractor.replyCurationOffer(
    { offerId: offerId.toString(), reply: false },
    signer
  );
}

async function cancelOffer(signer: SignerWithAddress, offerId: BigNumberish) {
  return await contractor.cancelCurationOffer(
    { offerId: offerId.toString() },
    signer
  );
}

async function listExhibit(
  signer: SignerWithAddress,
  galleryId: BigNumberish,
  exhibitId: BigNumberish,
  additionalInfo: string
) {
  return await contractor.listExhibit(
    {
      galleryId: galleryId.toString(),
      exhibitId: exhibitId.toString(),
      additionalInfo,
    },
    signer
  );
}

async function cancelExhibit(
  signer: SignerWithAddress,
  galleryId: BigNumberish,
  exhibitId: BigNumberish
) {
  return await contractor.cancelExhibit(
    {
      galleryId: galleryId.toString(),
      exhibitId: exhibitId.toString(),
    },
    signer
  );
}

async function buyExhibit(
  signer: SignerWithAddress,
  galleryId: BigNumberish,
  exhibitId: BigNumberish,
  price: BigNumberish
) {
  return await contractor.buyExhibit(
    {
      galleryId: galleryId.toString(),
      exhibitId: exhibitId.toString(),
      price: price.toString(),
    },
    signer
  );
}

async function getSentOffers(
  signer: SignerWithAddress
): Promise<Curation.OfferStructOutput[]> {
  return await curation.connect(signer).getSentOffers();
}

async function getReceivedOffers(
  signer: SignerWithAddress
): Promise<Curation.OfferStructOutput[]> {
  return await curation.connect(signer).getReceivedOffers();
}
const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL);
const signer = new ethers.Wallet(process.env.TEST_ONLY, provider);

async function deployAndMint() {
  // Modeler create space tempate and curator buy space template
  [owner, alice, bob, curator, buyer] = await ethers.getSigners();
  mixverseSpace = MixverseSpace__factory.connect(addr.MixverseSpace, signer);
  const amount = 10;
  const cid = "QmXwfwQxrdxg9czutZ5ta1NgJLfea6m1SRoTYnVyjzMTTK";
  await mixverseSpace.create(amount, cid);
  await mixverseSpace.safeTransferFrom(
    owner.address,
    curator.address,
    1,
    1,
    ethers.utils.formatBytes32String("")
  );

  // user mint NFT on IMart
  singleCollective = SingleCollective__factory.connect(
    addr.SingleCollective,
    provider
  );

  singleCollective
    .connect(signer)
    .createCollection(
      "test",
      "ART",
      ["test"],
      "test only",
      "https://bing.com",
      [],
      [],
      1
    );

  const events = await singleCollective.queryFilter(
    singleCollective.filters.CollectionCreated()
  );
  const [root, , name, , , , _uri, , , ,] = events[0].args;
  erc721 = ERC721__factory.connect(root, signer);

  const balance = BigNumber.from("1");
  await singleCollective.connect(signer).setMarketplace(curation.address);
  for (const art of alice_arts) {
    await singleCollective.connect(signer).mint(alice.address, balance, art);
  }
  for (const art of bob_arts) {
    await singleCollective.connect(signer).mint(bob.address, balance, art);
  }
  await singleCollective
    .connect(signer)
    .mint(buyer.address, balance, alice_arts[0]);

  const configuration = {
    addresses: {
      singleCollective: addr.SingleCollective,
      multipleCollective: addr.MultipleCollective,
      creation: singleCollective.address,
      curation: addr.Curation,
      market: "",
    },
    provider: provider,
  };
  contractor = Contractor(Evm, configuration) as Evm;
}

describe("Curation-1: create gallery", () => {
  before(async () => {
    await deployAndMint();
  });
  it("Add curator to whitelist", async () => {
    await addWhitelist();
    const enable = await curation.connect(signer).whitelist(curator.address);
    expect(enable).eq(true);
  });
  it("Curator create gallery", async () => {
    await addWhitelist();
    await createGallery();
    const galleries = await curation.getCuratorGalleries(curator.address);
    expect(galleries.length).gt(0);
    expect(galleries[0].name).eq("Hollywood");
  });
});

describe("Curation-2: send offer & accept offer", () => {
  before(async () => {
    await deployAndMint();
    await addWhitelist();
    await createGallery();
  });
  it("Curator send offer to artist", async () => {
    const tokenId = await erc721.tokenOfOwnerByIndex(alice.address, 0);
    await sendOffer(curator, tokenId);

    const sentOffers = await getSentOffers(curator);
    const sentOffer = sentOffers[0];
    expect(sentOffer.from).eq(curator.address);
    expect(sentOffer.to).eq(alice.address);

    const receivedOffers = await getReceivedOffers(alice);
    const receivedOffer = receivedOffers[0];
    expect(receivedOffer.from).eq(curator.address);
    expect(receivedOffer.to).eq(alice.address);
  });

  it("Alice accept offer", async () => {
    const tokenId = await erc721.tokenOfOwnerByIndex(alice.address, 1);
    await sendOffer(curator, tokenId);
    const sentOffers = await getSentOffers(curator);
    const sentOffer = sentOffers.slice(-1)[0];
    await acceptOffer(alice, sentOffer.id);
    const receivedOffers = await getReceivedOffers(alice);
    const receivedOffer = receivedOffers.slice(-1)[0];
    expect(receivedOffer!.status).eq(1); // pending: 0, accepted: 1, rejected: 2
  });

  it("Bob reject offer", async () => {
    const tokenId = await erc721.tokenOfOwnerByIndex(bob.address, 2);
    await sendOffer(curator, tokenId);
    const sentOffers = await getSentOffers(curator);
    const sentOffer = sentOffers.slice(-1)[0];
    await rejectOffer(bob, sentOffer.id);
    const receivedOffers = await getReceivedOffers(bob);
    const receivedOffer = receivedOffers.slice(-1)[0];
    expect(receivedOffer!.status).eq(2); // pending: 0, accepted: 1, rejected: 2
  });
  it("Curator cancel offer", async () => {
    const tokenId = await erc721.tokenOfOwnerByIndex(buyer.address, 0);
    await sendOffer(curator, tokenId);
    const sentOffers = await getSentOffers(curator);
    const sentOffer = sentOffers.slice(-1)[0];
    await cancelOffer(curator, sentOffer.id);
    const receivedOffers = await getReceivedOffers(buyer);
    const receivedOffer = receivedOffers.slice(-1)[0];
    expect(receivedOffer!.status).eq(3); // pending: 0, accepted: 1, rejected: 2, canceled: 3
  });
});

describe("Curation-3: list / delist / buy exhibit", () => {
  before(async () => {
    await deployAndMint();
    await addWhitelist();
    await createGallery();

    // alice accept offer
    const tokenId_A = await erc721.tokenOfOwnerByIndex(alice.address, 1);
    await sendOffer(curator, tokenId_A);
    const receivedOffers_A = await getReceivedOffers(alice);
    const receivedOffer_A = receivedOffers_A.slice(-1)[0];
    await acceptOffer(alice, receivedOffer_A.id);

    // bob reject offer
    const tokenId_B = await erc721.tokenOfOwnerByIndex(bob.address, 1);
    await sendOffer(curator, tokenId_B);
    const receivedOffers_B = await getReceivedOffers(bob);
    const receivedOffer_B = receivedOffers_B.slice(-1)[0];
    await rejectOffer(bob, receivedOffer_B.id);
  });
  it("Curator list exhibit", async () => {
    const galleries = await curation.getCuratorGalleries(curator.address);
    const gallery = galleries.slice(-1)[0];
    const exhibits = await curation.getGalleryExhibits(gallery.id);
    const exhibit = exhibits.slice(-1)[0];
    await listExhibit(curator, gallery.id, exhibit.id, "0,0,0");
    const updatedExhibit = (
      await curation.getGalleryExhibits(gallery.id)
    ).slice(-1)[0];
    expect(updatedExhibit.status).eq(1); // reserved: 0, listing: 1, expired: 2, sold: 3
  });
  it("Curator delist exhibit", async () => {
    const galleries = await curation.getCuratorGalleries(curator.address);
    const gallery = galleries.slice(-1)[0];
    const exhibits = await curation.getGalleryExhibits(gallery.id);
    const exhibit = exhibits.slice(-1)[0];
    await cancelExhibit(curator, gallery.id, exhibit.id);
    const updatedExhibit = (
      await curation.getGalleryExhibits(gallery.id)
    ).slice(-1)[0];
    expect(updatedExhibit.status).eq(0); // reserved: 0, listing: 1, expired: 2, sold: 3
  });

  it("Customer buy exhibit", async () => {
    const galleries = await curation.getCuratorGalleries(curator.address);
    const gallery = galleries.slice(-1)[0];
    const exhibits = await curation.getGalleryExhibits(gallery.id);
    const exhibit = exhibits.slice(-1)[0];
    // list again
    await listExhibit(curator, gallery.id, exhibit.id, "0,0,0");
    const listedExhibit = (await curation.getGalleryExhibits(gallery.id)).slice(
      -1
    )[0];
    expect(listedExhibit.status).eq(1); // reserved: 0, listing: 1, expired: 2, sold: 3

    // buy
    await buyExhibit(buyer, gallery.id, exhibit.id, listedExhibit.price);
    const updatedExhibit = (
      await curation.getGalleryExhibits(gallery.id)
    ).slice(-1)[0];
    expect(updatedExhibit.status).eq(3); // reserved: 0, listing: 1, expired: 2, sold: 3
    expect(await erc721.ownerOf(updatedExhibit.tokenId)).eq(buyer.address);
  });
});
