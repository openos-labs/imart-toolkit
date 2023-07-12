/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { NftLottery, NftLotteryInterface } from "../NftLottery";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "activityId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "organizer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "activityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "endBlockNumber",
        type: "uint256",
      },
    ],
    name: "CreateActivity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "activityId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
    ],
    name: "MerkleRoot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "organizer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "activityId",
        type: "uint256",
      },
    ],
    name: "WithdrawPrize",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "acitivityExist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "acitivityPrizeTokenIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_organizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_endBlockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
    ],
    name: "createActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_organizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_organizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
    ],
    name: "getActivityInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "organizer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "activityId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftContractAddress",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "endBlockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
        ],
        internalType: "struct NftLottery.ActivityInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_organizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
    ],
    name: "getRemainingTokenIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "hasClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "organizerActivityInfo",
    outputs: [
      {
        internalType: "address",
        name: "organizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "activityId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "endBlockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_merkleRoot",
        type: "bytes32",
      },
    ],
    name: "setMerkleRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_activityId",
        type: "uint256",
      },
    ],
    name: "withdrawPrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461005b5760008054336001600160a01b0319821681178355916001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a361161190816100618239f35b600080fdfe608080604052600436101561001357600080fd5b600090813560e01c90816312d18ed614610df857508063150b7a0214610d80578063183d506d14610d5157806318712c2114610c165780634b4e5be714610bce578063551512de14610a955780636c40ad7014610958578063715018a6146109105780637ab4d0fd146104cf5780638da5cb5b146104a8578063a894c45714610479578063c20eec7b1461026f578063e0f4b54e146101d9578063f2fde38b146101285763f9b70fea146100c657600080fd5b3461012557602036600319011261012557604060a0916004358152600160205220600180831b03808254169160018101549160028201541660056004830154920154926040519485526020850152604084015260608301526080820152f35b80fd5b5034610125576020366003190112610125576101426111c3565b61014a61124d565b6001600160a01b03908116908115610185576000548260018060a01b0319821617600055166000805160206115bc833981519152600080a380f35b60405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608490fd5b5034610125576040366003190112610125576101f36111c3565b60405190610200826112f1565b60018060a01b0316815261021c60209160243583820152611402565b82526004815261022e60408320611556565b60405192828493840190808552835180925280604086019401925b82811061025857505050500390f35b835185528695509381019392810192600101610249565b5034610125576020806003193601126104755760043560019161029e83610296843361144c565b1515146114cd565b6102ba6040516102ad816112f1565b3381528383820152611402565b80855283825260408520604051906102d182611322565b80546001600160a01b0390811683528682015485840152600282015481166040840190815292600392600590610308858201611556565b606084015260048101546080840152015460a08201528133915116036104245790879291848452600486526040842092610344845415156112a5565b84895b610389575b858960048a8a8452526103616040832061138a565b337fa73ef00cf3770008853149621e0eef4bdb15b3215395affcd01b8f60cc58ae298380a380f35b845481101561041f57828251166103a0828761121f565b905490861b1c90803b1561041b57604051632142170760e11b815291889183918290849082906103d5903330600485016114ab565b03925af19081156104105787916103f8575b50506103f290611486565b89610347565b6104019061133d565b61040c5785386103e7565b8580fd5b6040513d89823e3d90fd5b8780fd5b61034c565b60405162461bcd60e51b815260048101869052602360248201527f206f6e6c79206f7267616e697a65722063616e2077697468647261772070726960448201526203d32960ed1b6064820152608490fd5b5080fd5b50346101255760203660031901126101255760ff60406020926004358152600384522054166040519015158152f35b5034610125578060031936011261012557546040516001600160a01b039091168152602090f35b5034610125576080366003190112610125576104e96111c3565b6064356001600160401b03811161090c576105089036906004016111ef565b91906001600160a01b038216156108c75743602435111561085d5761052e8315156112a5565b61053a6044353361144c565b61081d5760405161054a81611322565b33815260443560208201526001600160a01b038316604082015261056d84611373565b61057a6040519182611350565b84815260208101368660051b8501116108195783905b8660051b85018210610809575050606082015260243560808201528460a0820152845b84811061078a57506105da6040516105ca816112f1565b3381526044356020820152611402565b808652600160208181526040808920855181546001600160a01b03199081166001600160a01b0392831617835593870151948201949094559085015160028201805490931693169290921790556060830151805192939192906001600160401b038211610776576020600385019161065284846113bf565b0190895260208920895b838110610762575050505060a081608060059301516004850155015191015580855260046020526040852060018060401b03851161074e5761069e85826113bf565b85526020852082865b86811061073a575050508452600260209081526040808620805460ff1916600117905580516001600160a01b03909416845290830181905282018390526001600160fb1b038311610736578260051b906060830137602435917feece7c57cc04066794eda97475dec1084a86f44d0b254b7fc9f4ec0ae1cb11ed60443592606081339460051b8101030190a480f35b8380fd5b6001906020833593019281850155016106a7565b634e487b7160e01b86526041600452602486fd5b60019060208451940193818401550161065c565b634e487b7160e01b89526041600452602489fd5b6001600160a01b0384163b1561040c5785604051632142170760e11b81528181806107c08660051b8901353033600485016114ab565b0381836001600160a01b038b165af180156107fe576107ea575b50506107e590611486565b6105b3565b6107f39061133d565b61040c5785386107da565b6040513d84823e3d90fd5b8135815260209182019101610590565b8680fd5b60405162461bcd60e51b815260206004820152601860248201527701030b1ba34bb34ba3c9030b63932b0b23c9032bc34b9ba160451b6044820152606490fd5b60405162461bcd60e51b815260206004820152603c60248201527f20656e64426c6f636b4e756d6265722073686f756c642062652067726561746560448201527b039103a3430b71031bab93932b73a10313637b1b590373ab6b132b9160251b6064820152608490fd5b60405162461bcd60e51b815260206004820152601f60248201527f206e6674436f6e747261637441646472657373206973206e6f74207a65726f006044820152606490fd5b8280fd5b503461012557806003193601126101255761092961124d565b600080546001600160a01b0319811682556001600160a01b03166000805160206115bc8339815191528280a380f35b5034610125576040366003190112610125576109726111c3565b9060405161097f81611322565b8181528160a0602092828482015282604082015260608082015282608082015201526109c96040516109b0816112f1565b6001600160a01b03948516815260243583820152611402565b825260019283825260408320604051936109e285611322565b8282541685528582015494848101958652836002840154169360408201948552610a0e60038501611556565b906060830191825260056004860154956080850196875201549560a0840196875260405198888a528260e08b01955116898b01525160408a015251166060880152519460c0608088015285518092528061010088019601925b828110610a8257845160a0890152855160c089015287870388f35b8351875295810195928101928801610a67565b503461012557606036600319011261012557610aaf6111c3565b6102966024359183610abf6111d9565b93610ac861124d565b604051610ad4816112f1565b6001600160a01b0384811682526020820183905290610af290611402565b95610b026001809781958861144c565b8684526004602052610b1660408520611556565b91610b23835115156112a5565b849116925b610b45575b838781526004602052610b426040822061138a565b80f35b8151811015610bc957610b5881836115a7565b51833b15610bc55784610b819160405180938192632142170760e11b83528a30600485016114ab565b038183885af1908115610bba578591610ba6575b5050610ba090611486565b85610b28565b610baf9061133d565b610736578338610b95565b6040513d87823e3d90fd5b8480fd5b610b2d565b503461012557604036600319011261012557602435906004358152600460205260408120908154831015610125576020610c08848461121f565b90546040519160031b1c8152f35b5034610125576040366003190112610125576004356024358015610d1257610c436001610296843361144c565b610c60604051610c52816112f1565b338152836020820152611402565b83526001602052604083208054336001600160a01b0390911603610cc157817f48211a20c285b6b077b7917b8bb118eaa92efdfb8fa2e3b114ffa253e0b665ae92600583610cb5600460209601544310611515565b0155604051908152a280f35b60405162461bcd60e51b8152602060048201526024808201527f206f6e6c79206f7267616e697a65722063616e20736574206d65726b6c652072604482015263037b7ba160e51b6064820152608490fd5b60405162461bcd60e51b8152602060048201526017602482015276206d65726b6c65526f6f74206973206e6f74207a65726f60481b6044820152606490fd5b50346101255760203660031901126101255760ff60406020926004358152600284522054166040519015158152f35b503461012557608036600319011261012557610d9a6111c3565b506024356001600160a01b03811603610df3576064356001600160401b0380821161090c573660238301121561090c57816004013590811161090c573691016024011161012557604051630a85bd0160e11b8152602090f35b600080fd5b9050346104755760a036600319011261047557610e136111c3565b90610e1c6111d9565b608435929091906001600160401b038411610bc557610e776001610296610e4a610e6d9736906004016111ef565b979095610e56816112f1565b838060a01b03861681526024356020820152611402565b936024359061144c565b808552600160205260408520610ee660405191610e9383611322565b80546001600160a01b039081168452600182015460208501526002820154166040840152610ec360038201611556565b606084015260a06005600483015492836080870152015493019283524310611515565b818652600360205260ff60408720541661117f57519360405160208101903360601b825260148152610f17816112f1565b51902090610f2481611373565b93610f326040519586611350565b8185526020850190368360051b82011161117b5780915b8360051b8201831061116b57505050509285935b8351851015610fa557610f7085856115a7565b519081811015610f93578752602052610f8d604087205b94611486565b93610f5d565b908752602052610f8d60408720610f87565b8693508503611126576001600160a01b031690813b1561090c57604051632142170760e11b8152838160643594818381610fe4893330600485016114ab565b03925af1801561111b57611108575b508252600360205260408220600160ff1982541617905560046020526040822090825b8254808210156110ff578261102b838661121f565b90549060031b1c14611046575061104190611486565b611016565b919290600019928381019081116110eb57611064611072918461121f565b90549060031b1c918361121f565b819291549060031b85811b9283911b16911916179055805480156110d75782019161109d838361121f565b909182549160031b1b19169055555b602435337f987d620f307ff6b94d58743cb7a7509f24071586a77759b77c2d4e29f75a2f9a8480a480f35b634e487b7160e01b85526031600452602485fd5b634e487b7160e01b86526011600452602486fd5b505090506110ac565b6111149093919361133d565b9183610ff3565b6040513d86823e3d90fd5b60405162461bcd60e51b815260206004820152601d60248201527f41697264726f703a20496e76616c6964206d65726b6c652070726f6f660000006044820152606490fd5b8235815260209283019201610f49565b8880fd5b60405162461bcd60e51b815260206004820152601c60248201527b0103cb7bab910383934bd329030b63932b0b23c9031b630b4b6b2b2160251b6044820152606490fd5b600435906001600160a01b0382168203610df357565b604435906001600160a01b0382168203610df357565b9181601f84011215610df3578235916001600160401b038311610df3576020808501948460051b010111610df357565b80548210156112375760005260206000200190600090565b634e487b7160e01b600052603260045260246000fd5b6000546001600160a01b0316330361126157565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b156112ac57565b60405162461bcd60e51b815260206004820152601e60248201527f20746f6b656e4964732073686f756c64206e6f7420626520656d7074792000006044820152606490fd5b604081019081106001600160401b0382111761130c57604052565b634e487b7160e01b600052604160045260246000fd5b60c081019081106001600160401b0382111761130c57604052565b6001600160401b03811161130c57604052565b601f909101601f19168101906001600160401b0382119082101761130c57604052565b6001600160401b03811161130c5760051b60200190565b8054906000908181558261139d57505050565b815260208120918201915b8281106113b457505050565b8181556001016113a8565b600160401b821161130c578054918082558281106113dc57505050565b60009182526020822092830192015b8281106113f757505050565b8181556001016113eb565b8051602091820151604051606092831b6001600160601b0319169381019384526034808201929092529081529081016001600160401b0381118282101761130c5760405251902090565b611472916040519161145d836112f1565b6001600160a01b031682526020820152611402565b600052600260205260ff6040600020541690565b60001981146114955760010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b03918216815291166020820152604081019190915260600190565b156114d457565b60405162461bcd60e51b815260206004820152601960248201527801030b1ba34bb34ba3c903237b2b9903737ba1032bc34b9ba1603d1b6044820152606490fd5b1561151c57565b60405162461bcd60e51b815260206004820152601260248201527101030b1ba34bb34ba3c9034b99037bb32b9160751b6044820152606490fd5b9060405191828154918282526020928383019160005283600020936000905b82821061158d5750505061158b92500383611350565b565b855484526001958601958895509381019390910190611575565b80518210156112375760209160051b01019056fe8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0a2646970667358221220c8aae4d0645157fa5b8ac0db32f7e800cb6030c9e93ef8449b935b2fc9bb31ef64736f6c63430008110033";

type NftLotteryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NftLotteryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NftLottery__factory extends ContractFactory {
  constructor(...args: NftLotteryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NftLottery> {
    return super.deploy(overrides || {}) as Promise<NftLottery>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NftLottery {
    return super.attach(address) as NftLottery;
  }
  override connect(signer: Signer): NftLottery__factory {
    return super.connect(signer) as NftLottery__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NftLotteryInterface {
    return new utils.Interface(_abi) as NftLotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NftLottery {
    return new Contract(address, _abi, signerOrProvider) as NftLottery;
  }
}