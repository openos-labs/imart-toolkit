'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var index = require('./index-8527eb1e.cjs');
var format = require('@uniswap/conedison/format');
var sdkCore = require('@openoscom/sdk-core');
require('buffer');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/helpers/defineProperty');
require('@web3-react/core');
require('styled-components');
require('@babel/runtime/helpers/extends');
require('@babel/runtime/helpers/objectWithoutProperties');
require('polished');
require('wcag-contrast');
require('rebass');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('react-feather');
require('@uniswap/universal-router-sdk');
require('@reduxjs/toolkit/query/react');
require('jotai/immer');
require('jotai/utils');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/inherits');
require('@babel/runtime/helpers/possibleConstructorReturn');
require('@babel/runtime/helpers/getPrototypeOf');
require('tiny-invariant');
require('@ethersproject/units');
require('jsbi');
require('@reduxjs/toolkit');
require('jotai');
require('@uniswap/router-sdk');
require('@uniswap/v2-sdk');
require('@uniswap/v3-sdk');
require('@babel/runtime/helpers/typeof');
require('@babel/runtime/helpers/asyncToGenerator');
require('@babel/runtime/regenerator');
require('@babel/runtime/helpers/get');
require('@babel/runtime/helpers/assertThisInitialized');
require('@babel/runtime/helpers/wrapNativeSuper');
require('qs');
require('@ethersproject/abi');
require('@uniswap/redux-multicall');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');
require('@uniswap/permit2-sdk');
require('@uniswap/conedison/provider/signing');
require('ethers/lib/utils');
require('@ethersproject/bytes');
require('@ethersproject/bignumber');
require('@ethersproject/strings');
require('popper-max-size-modifier');
require('react-dom');
require('react-popper');
require('@ethersproject/hash');
require('cids');
require('multicodec');
require('multihashes');
require('@babel/runtime/helpers/toConsumableArray');
require('wicg-inert');
require('node-vibrant/lib/bundle.js');
require('setimmediate');
require('react-virtualized-auto-sizer');
require('react-window');
require('@web3-react/walletconnect');
require('qrcode');
require('@uniswap/conedison/provider/index');
require('@ethersproject/providers');
require('@web3-react/eip1193');
require('@web3-react/metamask');
require('@web3-react/network');
require('@web3-react/types');
require('make-plural/plurals');
require('react-redux');
require('redux');
require('resize-observer-polyfill');
require('react-cosmos/fixture');



exports.ALL_SUPPORTED_CHAIN_IDS = index.ALL_SUPPORTED_CHAIN_IDS;
exports.AMPL = index.AMPL;
exports.BTC_BNB_CHAIN = index.BTC_BNB_CHAIN;
exports.BUSD_BNB_CHAIN = index.BUSD_BNB_CHAIN;
exports.CAKE_BNB_CHAIN = index.CAKE_BNB_CHAIN;
exports.CELO_CELO = index.CELO_CELO;
exports.CELO_CELO_ALFAJORES = index.CELO_CELO_ALFAJORES;
exports.CEUR_CELO = index.CEUR_CELO;
exports.CEUR_CELO_ALFAJORES = index.CEUR_CELO_ALFAJORES;
exports.CHAIN_NAMES_TO_IDS = index.CHAIN_NAMES_TO_IDS;
exports.CMC02_CELO = index.CMC02_CELO;
exports.CUSD_CELO = index.CUSD_CELO;
exports.CUSD_CELO_ALFAJORES = index.CUSD_CELO_ALFAJORES;
Object.defineProperty(exports, 'ChainName', {
	enumerable: true,
	get: function () { return index.ChainName; }
});
exports.DAI = index.DAI;
exports.DAI_ARBITRUM_ONE = index.DAI_ARBITRUM_ONE;
exports.DAI_BNB_CHAIN = index.DAI_BNB_CHAIN;
exports.DAI_OPTIMISM = index.DAI_OPTIMISM;
exports.DAI_POLYGON = index.DAI_POLYGON;
exports.DEFAULT_LOCALE = index.DEFAULT_LOCALE;
Object.defineProperty(exports, 'DialogAnimationType', {
	enumerable: true,
	get: function () { return index.DialogAnimationType; }
});
exports.EMPTY_TOKEN_LIST = index.EMPTY_TOKEN_LIST;
exports.ETH2X_FLI = index.ETH2X_FLI;
exports.ETH_BNB_CHAIN = index.ETH_BNB_CHAIN;
exports.ExtendedEther = index.ExtendedEther;
exports.FEI = index.FEI;
exports.FRAX = index.FRAX;
exports.FRAX_BNB_CHAIN = index.FRAX_BNB_CHAIN;
exports.FXS = index.FXS;
Object.defineProperty(exports, 'Field', {
	enumerable: true,
	get: function () { return index.Field; }
});
exports.L1_CHAIN_IDS = index.L1_CHAIN_IDS;
exports.L2_CHAIN_IDS = index.L2_CHAIN_IDS;
exports.Logo = index.Logo;
exports.LogoUpdater = index.LogoUpdater;
exports.MATIC_BNB_CHAIN = index.MATIC_BNB_CHAIN;
exports.PORTAL_ETH_CELO = index.PORTAL_ETH_CELO;
exports.PORTAL_USDC_CELO = index.PORTAL_USDC_CELO;
Object.defineProperty(exports, 'RouterPreference', {
	enumerable: true,
	get: function () { return index.RouterPreference; }
});
exports.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = index.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS;
exports.SUPPORTED_LOCALES = index.SUPPORTED_LOCALES;
exports.SWISE = index.SWISE;
Object.defineProperty(exports, 'SupportedChainId', {
	enumerable: true,
	get: function () { return index.SupportedChainId; }
});
exports.SwapWidget = index.SwapWidget;
exports.SwapWidgetSkeleton = index.SwapWidgetSkeleton;
exports.TOKEN_SHORTHANDS = index.TOKEN_SHORTHANDS;
exports.TRIBE = index.TRIBE;
Object.defineProperty(exports, 'TransactionType', {
	enumerable: true,
	get: function () { return index.TransactionType; }
});
exports.UNI = index.UNI;
exports.UNISWAP_TOKEN_LIST = index.UNISWAP_TOKEN_LIST;
exports.USDC = index.USDC;
exports.USDC_ARBITRUM = index.USDC_ARBITRUM;
exports.USDC_ARBITRUM_RINKEBY = index.USDC_ARBITRUM_RINKEBY;
exports.USDC_BNB_CHAIN = index.USDC_BNB_CHAIN;
exports.USDC_CELO_ALFAJORES = index.USDC_CELO_ALFAJORES;
exports.USDC_GOERLI = index.USDC_GOERLI;
exports.USDC_KOVAN = index.USDC_KOVAN;
exports.USDC_MAINNET = index.USDC_MAINNET;
exports.USDC_OPTIMISM = index.USDC_OPTIMISM;
exports.USDC_POLYGON = index.USDC_POLYGON;
exports.USDC_POLYGON_MUMBAI = index.USDC_POLYGON_MUMBAI;
exports.USDC_RINKEBY = index.USDC_RINKEBY;
exports.USDC_ROPSTEN = index.USDC_ROPSTEN;
exports.USDT = index.USDT;
exports.USDT_ARBITRUM_ONE = index.USDT_ARBITRUM_ONE;
exports.USDT_BNB_CHAIN = index.USDT_BNB_CHAIN;
exports.USDT_OPTIMISM = index.USDT_OPTIMISM;
exports.USDT_POLYGON = index.USDT_POLYGON;
exports.UniswapInterface = index.widget;
exports.UnknownError = index.UnknownError;
exports.UserRejectedRequestError = index.UserRejectedRequestError;
exports.WBTC = index.WBTC;
exports.WBTC_ARBITRUM_ONE = index.WBTC_ARBITRUM_ONE;
exports.WBTC_OPTIMISM = index.WBTC_OPTIMISM;
exports.WBTC_POLYGON = index.WBTC_POLYGON;
exports.WETH_POLYGON = index.WETH_POLYGON;
exports.WETH_POLYGON_MUMBAI = index.WETH_POLYGON_MUMBAI;
exports.WRAPPED_NATIVE_CURRENCY = index.WRAPPED_NATIVE_CURRENCY;
exports.WidgetError = index.WidgetError;
exports.darkTheme = index.darkTheme;
exports.defaultTheme = index.defaultTheme;
exports.getAssetsRepoURI = index.getAssetsRepoURI;
exports.getNativeLogoURI = index.getNativeLogoURI;
exports.invertTradeType = index.invertTradeType;
exports.isCelo = index.isCelo;
exports.isPolygonChain = index.isPolygonChain;
exports.lightTheme = index.lightTheme;
exports.nativeOnChain = index.nativeOnChain;
exports.rETH2 = index.rETH2;
exports.renBTC = index.renBTC;
exports.sETH2 = index.sETH2;
exports.toTradeType = index.toTradeType;
exports.useLogo = index.useLogo;
exports.useLogos = index.useLogos;
exports.useOption = index.useOption;
exports.useProvider = index.useProvider;
exports.validateTokenList = index.validateTokenList;
exports.validateTokens = index.validateTokens;
Object.defineProperty(exports, 'NumberType', {
	enumerable: true,
	get: function () { return format.NumberType; }
});
Object.defineProperty(exports, 'formatCurrencyAmount', {
	enumerable: true,
	get: function () { return format.formatCurrencyAmount; }
});
Object.defineProperty(exports, 'TradeType', {
	enumerable: true,
	get: function () { return sdkCore.TradeType; }
});
