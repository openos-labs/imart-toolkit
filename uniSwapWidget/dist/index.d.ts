import { TradeType, Currency, Percent, CurrencyAmount, Token, Ether, NativeCurrency } from '@openos-labs/sdk-core';
export { Currency, TradeType } from '@openos-labs/sdk-core';
import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
export { JsonRpcProvider } from '@ethersproject/providers';
import { Trade } from '@uniswap/router-sdk';
import { ChainId } from '@uniswap/smart-order-router';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
export { Provider as EthersProvider } from '@ethersproject/abstract-provider';
import { TokenInfo, TokenList, Tags } from '@uniswap/token-lists';
export { TokenInfo } from '@uniswap/token-lists';
import react, { ErrorInfo, FunctionComponent, SVGProps, ReactNode } from 'react';
import * as _web3_react_types from '@web3-react/types';
import { Provider } from '@web3-react/types';
export { Provider as Eip1193Provider } from '@web3-react/types';
import * as styled_components from 'styled-components';
import { Icon as Icon$1 } from 'react-feather';
export { NumberType, formatCurrencyAmount } from '@uniswap/conedison/format';

declare enum RouterPreference {
    API = "api",
    CLIENT = "client"
}
declare enum QuoteType {
    TRADE = "trade",
    PRICE = "price",
    SKIP = "skip"
}

interface GetQuoteArgs {
    tokenInAddress: string;
    tokenInChainId: ChainId;
    tokenInDecimals: number;
    tokenInSymbol?: string;
    tokenOutAddress: string;
    tokenOutChainId: ChainId;
    tokenOutDecimals: number;
    tokenOutSymbol?: string;
    amount: string | null;
    routerPreference: RouterPreference;
    routerUrl?: string;
    tradeType: TradeType;
    provider: BaseProvider;
    quoteType: QuoteType;
    onQuote?: OnSwapQuote;
}
declare enum QuoteState {
    SUCCESS = "Success",
    INITIALIZED = "Initialized",
    NOT_FOUND = "Not found"
}
declare type TradeResult = {
    state: QuoteState.INITIALIZED | QuoteState.NOT_FOUND;
    trade?: undefined;
    gasUseEstimateUSD?: undefined;
    blockNumber?: undefined;
} | {
    state: QuoteState.SUCCESS;
    trade: InterfaceTrade;
    gasUseEstimateUSD: string;
    blockNumber: string;
};
declare class InterfaceTrade extends Trade<Currency, Currency, TradeType> {
}

interface WidgetErrorConfig {
    header?: string;
    action?: string;
    message?: string;
    error?: unknown;
}
declare class WidgetError extends Error {
    header: string;
    action: string;
    /** The original error, if this is a wrapped error. */
    error: unknown;
    dismissable: boolean;
    constructor(config: WidgetErrorConfig);
}
declare class UnknownError extends WidgetError {
    constructor(config: WidgetErrorConfig);
}
/**
 * A Promise which rejects with a known WidgetError.
 * Although it is well-typed, this typing only works when using the Promise as a Thennable, not through async/await.
 * @example widgetPromise.catch((reason: WidgetError) => console.error(reason.error))
 */
declare class WidgetPromise<V, R extends WidgetError = WidgetError> extends Promise<V> {
    static from<P extends {
        then(onfulfilled: (value: any) => any): any;
        catch(onrejected: (reason: any) => any): any;
    }, V extends Parameters<Parameters<P['then']>[0]>[0], R extends Parameters<Parameters<P['catch']>[0]>[0], WidgetValue = V, WidgetReason extends WidgetError = WidgetError>(value: P | (() => P), 
    /** Synchronously maps the value to the WidgetPromise value. Any thrown reason must be mappable by onrejected. */
    onfulfilled: ((value: V) => WidgetValue) | null, 
    /**
     * Synchronously maps the reason to the WidgetPromise reason. Must throw the mapped reason.
     * @throws {@link WidgetReason}
     */
    onrejected: (reason: R) => never): WidgetPromise<WidgetValue, WidgetReason & UnknownError>;
    catch<T = never>(onrejected?: ((reason: R) => T | Promise<T>) | undefined | null): Promise<V | T>;
}
/** Dismissable errors are not be considered fatal by the ErrorBoundary. */
declare class DismissableError extends WidgetError {
    constructor(config: WidgetErrorConfig);
}
declare class UserRejectedRequestError extends DismissableError {
    constructor();
}

declare enum TransactionType {
    APPROVAL = 0,
    SWAP = 1,
    WRAP = 2,
    UNWRAP = 3
}
interface BaseTransactionInfo {
    type: TransactionType;
    response: TransactionResponse;
}
interface ApprovalTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.APPROVAL;
    tokenAddress: string;
    spenderAddress: string;
}
interface SwapTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.SWAP;
    tradeType: TradeType;
    trade: InterfaceTrade;
    slippageTolerance: Percent;
}
interface ExactInputSwapTransactionInfo extends SwapTransactionInfo {
    tradeType: TradeType.EXACT_INPUT;
}
interface ExactOutputSwapTransactionInfo extends SwapTransactionInfo {
    tradeType: TradeType.EXACT_OUTPUT;
}
interface WrapTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.WRAP;
    amount: CurrencyAmount<Currency>;
}
interface UnwrapTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.UNWRAP;
    amount: CurrencyAmount<Currency>;
}
declare type TransactionInfo = ApprovalTransactionInfo | SwapTransactionInfo | WrapTransactionInfo | UnwrapTransactionInfo;
interface Transaction<T extends TransactionInfo = TransactionInfo> {
    addedTime: number;
    lastCheckedBlockNumber?: number;
    receipt?: TransactionReceipt;
    info: T;
}

/**
 * An integration hook called when a new quote is fetched.
 * @param quote resolves with the quote when it is available.
 */
declare type OnSwapQuote = (args: Omit<GetQuoteArgs, 'provider' | 'onQuote'>, quote: WidgetPromise<TradeResult>) => void;
/**
 * An integration hook called when requesting a token allowance from the user.
 * NB: You may instrument the time-to-confirmation by calling transaction.response.wait().
 * @param transaction resolves with the approval transaction info when it is granted.
 */
declare type OnTokenAllowance = (args: {
    token: Token;
    spender: string;
}, transaction: WidgetPromise<ApprovalTransactionInfo>) => void;
/**
 * An integration hook called when requesting a Permit2 token allowance from the user.
 * @param signed resolves when the permit is signed.
 */
declare type OnPermit2Allowance = (args: {
    token: Token;
    spender: string;
}, signed: WidgetPromise<void>) => void;
/**
 * An integration hook called when sending a swap transaction to the mempool through the user.
 * NB: You may instrument the time-to-confirmation by calling ransaction.response.wait().
 * @param transaction resolves with the swap transaction info when it is sent to the mempool.
 */
declare type OnSwapSend = (args: {
    trade: InterfaceTrade;
}, transaction: WidgetPromise<SwapTransactionInfo>) => void;
/**
 * An integration hook called when sending a swap transaction to the mempool through the user.
 * NB: You may instrument the time-to-confirmation by calling ransaction.response.wait().
 * @param transaction resolves with the swap transaction info when it is sent to the mempool.
 */
declare type OnWrapSend = (args: {
    amount: CurrencyAmount<Currency>;
}, transaction: WidgetPromise<WrapTransactionInfo | UnwrapTransactionInfo>) => void;
interface PerfEventHandlers {
    onSwapQuote?: OnSwapQuote;
    onTokenAllowance?: OnTokenAllowance;
    onPermit2Allowance?: OnPermit2Allowance;
    onSwapSend?: OnSwapSend;
    onWrapSend?: OnWrapSend;
}

interface Slippage {
    auto: boolean;
    max: string | undefined;
}
interface Settings {
    slippage: Slippage;
    transactionTtl: number | undefined;
    routerPreference: RouterPreference;
}
/** An integration hook called when the user resets settings. */
declare type OnSettingsReset = () => void;
/** An integration hook called when the user changes slippage settings. */
declare type OnSlippageChange = (slippage: Slippage) => void;
/** An integration hook called when the user changes transaction deadline settings. */
declare type OnTransactionDeadlineChange = (ttl: number | undefined) => void;
declare type OnRouterPreferenceChange = (routerPreference: RouterPreference) => void;
interface SettingsEventHandlers {
    onSettingsReset?: OnSettingsReset;
    onSlippageChange?: OnSlippageChange;
    onTransactionDeadlineChange?: OnTransactionDeadlineChange;
    onRouterPreferenceChange?: OnRouterPreferenceChange;
}

declare enum Field {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT"
}
interface Swap {
    type: TradeType;
    amount: string;
    [Field.INPUT]?: Currency;
    [Field.OUTPUT]?: Currency;
}
/** An integration hook called when the user selects a new token. */
declare type OnTokenChange = (field: Field, token: Currency) => void;
/**
 * An integration hook called when the user enters a new amount.
 * If the amount changed from the user clicking Max, origin will be set to 'max'.
 */
declare type OnAmountChange = (field: Field, amount: string, origin?: 'max') => void;
/** An integration hook called when the user switches the tokens. */
declare type OnSwitchTokens = () => void;
/**
 * An integration hook called when the user clicks the token selector.
 * If the hook resolve to false or rejects, the token selector will not open.
 */
declare type OnTokenSelectorClick = (field: Field) => void | boolean | Promise<boolean>;
/** An integration hook called when the user expands a swap's details. */
declare type OnExpandSwapDetails = () => void;
/**
 * An integration hook called when the user clicks 'Review swap'.
 * If the hook resolves to false or rejects, the review dialog will not open.
 */
declare type OnReviewSwapClick = () => void | boolean | Promise<boolean>;
interface InputEventHandlers {
    onTokenChange?: OnTokenChange;
    onAmountChange?: OnAmountChange;
    onSwitchTokens?: OnSwitchTokens;
    onTokenSelectorClick?: OnTokenSelectorClick;
    onExpandSwapDetails?: OnExpandSwapDetails;
    onReviewSwapClick?: OnReviewSwapClick;
}
/** An integration hook called when the user receives an initial quote for a set of inputs. */
declare type OnInitialSwapQuote = (trade: InterfaceTrade) => void;
/** An integration hook called when the user acks a quote's price update. */
declare type OnSwapPriceUpdateAck = (stale: InterfaceTrade, update: InterfaceTrade) => void;
/** An integration hook called when the user approves a token, either through allowance or permit. */
declare type OnSwapApprove = () => void;
/** An integration hook called when the confirms a swap, but before it is submitted. */
declare type OnSubmitSwapClick = (trade: InterfaceTrade) => void;
interface SwapEventHandlers extends SettingsEventHandlers, InputEventHandlers, PerfEventHandlers {
    onInitialSwapQuote?: OnInitialSwapQuote;
    onSwapPriceUpdateAck?: OnSwapPriceUpdateAck;
    /** @deprecated Use {@link onTokenAllowance} and {@link onPermit2Allowance} instead. */
    onSwapApprove?: OnSwapApprove;
    /** @deprecated Use {@link onSwapSend} instead. */
    onSubmitSwapClick?: OnSubmitSwapClick;
}

interface SwapController {
    value?: Swap;
    settings?: Settings;
}

interface FeeOptions {
    convenienceFee?: number;
    convenienceFeeRecipient?: string | string | {
        [chainId: number]: string;
    };
}

/**
 * List of all the networks supported by the Uniswap Interface
 */
declare enum SupportedChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,
    OPTIMISM = 10,
    OPTIMISM_GOERLI = 420,
    POLYGON = 137,
    POLYGON_MUMBAI = 80001,
    CELO = 42220,
    CELO_ALFAJORES = 44787,
    BNB = 56
}
declare enum ChainName {
    MAINNET = "mainnet",
    ROPSTEN = "ropsten",
    RINKEBY = "rinkeby",
    GOERLI = "goerli",
    KOVAN = "kovan",
    OPTIMISM = "optimism-mainnet",
    OPTIMISM_GOERLI = "optimism-goerli",
    ARBITRUM_ONE = "arbitrum-mainnet",
    ARBITRUM_RINKEBY = "arbitrum-rinkeby",
    POLYGON = "polygon-mainnet",
    POLYGON_MUMBAI = "polygon-mumbai",
    CELO = "celo",
    CELO_ALFAJORES = "celo-alfajores",
    BNB = "bnb"
}
declare const CHAIN_NAMES_TO_IDS: {
    [chainName: string]: SupportedChainId;
};
/**
 * Array of all the supported chain IDs
 */
declare const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[];
declare const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS: SupportedChainId[];
/**
 * All the chain IDs that are running the Ethereum protocol.
 */
declare const L1_CHAIN_IDS: readonly [SupportedChainId.MAINNET, SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY, SupportedChainId.GOERLI, SupportedChainId.KOVAN, SupportedChainId.POLYGON, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.CELO, SupportedChainId.CELO_ALFAJORES];
declare type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];
/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
declare const L2_CHAIN_IDS: readonly [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISM_GOERLI];
declare type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];
declare function isPolygonChain(chainId: number): chainId is SupportedChainId.POLYGON | SupportedChainId.POLYGON_MUMBAI;

declare type DefaultAddress = string | {
    [chainId: number]: string | 'NATIVE';
} | 'NATIVE';
interface TokenDefaults {
    defaultInputTokenAddress?: DefaultAddress;
    defaultInputAmount?: number | string;
    defaultOutputTokenAddress?: DefaultAddress;
    defaultOutputAmount?: number | string;
    defaultChainId?: SupportedChainId;
}

interface SwapProps extends FeeOptions, SwapController, SwapEventHandlers, TokenDefaults {
    hideConnectionUI?: boolean;
    routerUrl?: string;
}

declare enum Layer {
    UNDERLAYER = -1,
    OVERLAY = 100,
    DIALOG = 1000,
    TOOLTIP = 2000
}

interface Colors {
    accent: string;
    accentSoft: string;
    container: string;
    module: string;
    interactive: string;
    outline: string;
    dialog: string;
    scrim: string;
    primary: string;
    onAccent: string;
    secondary: string;
    hint: string;
    onInteractive: string;
    active: string;
    activeSoft: string;
    success: string;
    warning: string;
    warningSoft: string;
    error: string;
    critical: string;
    criticalSoft: string;
    networkDefaultShadow: string;
    deepShadow: string;
    currentColor: 'currentColor';
}
declare type Color = keyof Colors;
declare type ThemeBorderRadius = {
    large: number;
    medium: number;
    small: number;
    xsmall: number;
};
declare type ZIndex = {
    modal: number;
};
interface Attributes {
    borderRadius: ThemeBorderRadius;
    zIndex: ZIndex;
    fontFamily: string | {
        font: string;
        variable: string;
    };
    fontFamilyCode: string;
    tokenColorExtraction: boolean;
}
interface Theme extends Partial<Attributes>, Partial<Colors> {
}

declare const lightTheme: Colors;
declare const darkTheme: Colors;
declare const defaultTheme: {
    accent: string;
    accentSoft: string;
    container: string;
    module: string;
    interactive: string;
    outline: string;
    dialog: string;
    scrim: string;
    primary: string;
    onAccent: string;
    secondary: string;
    hint: string;
    onInteractive: string;
    active: string;
    activeSoft: string;
    success: string;
    warning: string;
    warningSoft: string;
    error: string;
    critical: string;
    criticalSoft: string;
    networkDefaultShadow: string;
    deepShadow: string;
    currentColor: "currentColor";
    borderRadius: {
        large: number;
        medium: number;
        small: number;
        xsmall: number;
    };
    zIndex: {
        modal: Layer;
    };
    fontFamily: {
        font: string;
        variable: string;
    };
    fontFamilyCode: string;
    tokenColorExtraction: boolean;
};

declare global {
    interface HTMLElement {
        inert: boolean;
    }
}
interface DialogOptions {
    animationType?: DialogAnimationType;
    pageCentered?: boolean;
}
interface DialogWidgetProps {
    dialog?: HTMLDivElement | null;
    dialogOptions?: DialogOptions;
}
declare enum DialogAnimationType {
    SLIDE = "slide",
    FADE = "fade",
    NONE = "none"
}

declare type OnError = (error: Error, info?: ErrorInfo) => void;

declare const SUPPORTED_LOCALES: string[];
declare type SupportedLocale = typeof SUPPORTED_LOCALES[number] | 'pseudo';
declare const DEFAULT_LOCALE: SupportedLocale;

declare type OnTxSubmit = (hash: string, tx: Transaction) => void;
declare type OnTxSuccess = (hash: string, tx: WithRequired<Transaction, 'receipt'>) => void;
declare type OnTxFail = (hash: string, receipt: TransactionReceipt) => void;
interface TransactionEventHandlers {
    onTxSubmit?: OnTxSubmit;
    onTxSuccess?: OnTxSuccess;
    onTxFail?: OnTxFail;
}

interface Flags {
    brandedFooter?: boolean;
    permit2?: boolean;
}

/** Defined by EIP-3085. */
interface AddEthereumChainParameter {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: 18;
    };
    blockExplorerUrls: [string];
    rpcUrls: string[];
}
/**
 * An integration hook called when the user tries to switch chains.
 * If the hook returns a Promise, it is assumed the integrator is attempting to switch the chain, and no further attempts will be made.
 * If that Promise rejects, the error will be ignored so as not to crash the widget.
 */
declare type OnSwitchChain = (addChainParameter: AddEthereumChainParameter) => void | Promise<void>;

declare type OnConnectWalletClick = () => void | boolean | Promise<boolean>;

interface WidgetEventHandlers {
    onConnectWalletClick?: OnConnectWalletClick;
    onError?: OnError;
    onSwitchChain?: OnSwitchChain;
}

declare type JsonRpcConnectionMap = {
    [chainId: number]: string | string[] | JsonRpcProvider | JsonRpcProvider[];
};

interface ProviderProps {
    defaultChainId?: SupportedChainId;
    jsonRpcUrlMap?: JsonRpcConnectionMap;
    /**
     * If null, no auto-connection (MetaMask or WalletConnect) will be attempted.
     * This is appropriate for integrations which wish to control the connected provider.
     */
    provider?: Provider | JsonRpcProvider | null;
}

interface WidgetProps extends Flags, TransactionEventHandlers, ProviderProps, WidgetEventHandlers, DialogWidgetProps {
    theme?: Theme;
    locale?: SupportedLocale;
    tokenList?: string | TokenInfo[];
    width?: string | number;
    className?: string;
    onError?: OnError;
}

declare type TagDetails = Tags[keyof Tags];
interface TagInfo extends TagDetails {
    id: string;
}
/**
 * Token instances created from token info on a token list.
 */
declare class WrappedTokenInfo implements Token {
    readonly isNative: false;
    readonly isToken: true;
    readonly list?: TokenList;
    readonly tokenInfo: TokenInfo;
    constructor(tokenInfo: TokenInfo, list?: TokenList);
    private _checksummedAddress;
    get address(): string;
    get chainId(): number;
    get decimals(): number;
    get name(): string;
    get symbol(): string;
    get logoURI(): string | undefined;
    private _tags;
    get tags(): TagInfo[];
    equals(other: Currency): boolean;
    sortsBefore(other: Token): boolean;
    get wrapped(): Token;
}

declare type SVGIcon = FunctionComponent<SVGProps<SVGSVGElement>>;
declare function icon(Icon: Icon$1 | SVGIcon): styled_components.StyledComponent<SVGIcon | Icon$1, styled_components.DefaultTheme, {
    color?: keyof Colors | undefined;
}, never>;
declare type Icon = ReturnType<typeof icon> | typeof LargeIcon;
interface LargeIconProps {
    icon?: Icon;
    color?: Color;
    size?: number;
    strokeWidth?: number;
    onClick?: () => void;
    className?: string;
}
declare function LargeIcon({ icon: Icon, color, size, strokeWidth, onClick, className }: LargeIconProps): JSX.Element;

interface SummaryRowProps {
    name: ReactNode;
    value: ReactNode;
    color?: Color;
    nameTooltip?: {
        content: ReactNode;
    };
    valueTooltip?: {
        content: ReactNode;
        icon: Icon;
    };
}

declare type StatusType = "err" | "trade" | "loading";
declare class SetBaseMethod {
    selectInputToken: ((update: Currency) => void) | undefined;
    selectOutToken: ((update: Currency) => void) | undefined;
    addEvent: (() => void) | undefined;
    inputAmount: ((update: string, origin?: "max") => void) | undefined;
    outAmount: ((update: string, origin?: "max") => void) | undefined;
    swapEvent: (() => void) | undefined;
    nextSwap: () => void;
    _onStartSwapFlow: () => void;
    swapInformationFn: ((e: any) => void) | any;
    exchangeInfo: (e: any) => void;
    _swapInfData: (e: any) => void;
    _setLoading: (e: any) => void;
    swapError: (err: string) => void;
    onInputAmountChange: (_inputAmount: string | undefined) => void;
    onOutAmountChange: (_outAmount: string | undefined) => void;
    swapInformation: any | SummaryRowProps[];
    tokens: WrappedTokenInfo[] | undefined | any;
    set setSelectInputToken(_selectInputToken: (update: Currency) => void);
    set setOutputToken(_selectOutToken: (update: Currency) => void);
    set setInputAmount(_selectInputToken: (update: string, origin?: "max") => void);
    set setOutAmount(_selectOutToken: (update: string, origin?: "max") => void);
    set setSwapEvent(_func: (() => void) | undefined);
    set setInformation(_val: SummaryRowProps[]);
    setLoading(e: {
        status: StatusType;
        message: string;
    }): void;
    set setSwapInformation(_val: SummaryRowProps[]);
    set Tokens(_val: WrappedTokenInfo[]);
    set setSwapDataInfo(e: any);
    set setExchangeInfo(e: any);
    handleOnInputAmountChange(_input: string | undefined): void;
    handleOnOutAmountChange(_out: string | undefined): void;
    handleSwapError(err: string): void;
}

declare class UniswapInterface extends SetBaseMethod {
    handleSwap(): void;
    handleNextSwap(): void;
    onStartSwapFlow(): void;
    listenerInputAmount(_fn: (_inputAmount: string | undefined) => void): void;
    listenerExchangeMoney(_fn: (e: any) => void): void;
    listenerSwapError(_fn: (err: string) => void): void;
    listenerSwapInfoData(fun: (e: any) => void): void;
    listenerStatus(fn: any): void;
    listenerSwapInformation(_fn: (err: string) => void): void;
    handleChangeOutAmount(_val: string): void;
    handleChangeInputAmount(_val: string): void;
    listenerOutAmount(_fn: (_outAmount: string | undefined) => void): void;
    get getTokens(): WrappedTokenInfo[];
    get getSwapInformation(): any;
    ListenerEvent(_event: () => void): void;
}
declare const widget: UniswapInterface;

declare type LogoTableInput = {
    address?: string | null;
    chainId: number;
    isNative?: boolean;
    logoURI?: string;
};

/** An optional component to update table with logos as sources change */
declare function LogoUpdater({ assets }: {
    assets: LogoTableInput[];
}): null;
declare function useLogos(currency: LogoTableInput | undefined): string[] | undefined;
declare function useLogo(currency: LogoTableInput | undefined): {
    src: string | undefined;
    invalidateSrc: () => void;
};

declare function getAssetsRepoURI(asset: LogoTableInput): string | undefined;
declare function getNativeLogoURI(chainId?: SupportedChainId): string;

declare type LogoBasePops = {
    symbol?: string | null;
    backupImg?: string | null;
    size?: string;
    style?: react.CSSProperties;
};
/**
 * Renders an image by prioritizing a list of sources, and then eventually a fallback triangle alert
 */
declare type LogoProps = {
    currency: LogoTableInput;
} & LogoBasePops;
declare function Logo({ currency, symbol, backupImg, size, style, ...rest }: LogoProps): JSX.Element;

interface SwapWidgetSkeletonProps {
    theme?: Theme;
    width?: string | number;
}
declare function SwapWidgetSkeleton({ theme, width }: SwapWidgetSkeletonProps): JSX.Element;

declare const UNISWAP_TOKEN_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";
declare const EMPTY_TOKEN_LIST: never[];

/**
 * Validates an array of tokens.
 * @param json the TokenInfo[] to validate
 */
declare function validateTokens(json: TokenInfo[]): Promise<TokenInfo[]>;
/**
 * Validates a token list.
 * @param json the TokenList to validate
 */
declare function validateTokenList(json: TokenList): Promise<TokenList>;

declare const USDC_MAINNET: Token;
declare const USDC_ROPSTEN: Token;
declare const USDC_RINKEBY: Token;
declare const USDC_GOERLI: Token;
declare const USDC_KOVAN: Token;
declare const USDC_OPTIMISM: Token;
declare const USDC_ARBITRUM: Token;
declare const USDC_ARBITRUM_RINKEBY: Token;
declare const USDC_POLYGON: Token;
declare const USDC_POLYGON_MUMBAI: Token;
declare const PORTAL_USDC_CELO: Token;
declare const USDC_CELO_ALFAJORES: Token;
declare const AMPL: Token;
declare const DAI: Token;
declare const DAI_ARBITRUM_ONE: Token;
declare const DAI_OPTIMISM: Token;
declare const USDC_BNB_CHAIN: Token;
declare const USDC: {
    [chainId in SupportedChainId]: Token;
};
declare const DAI_POLYGON: Token;
declare const USDT_POLYGON: Token;
declare const WBTC_POLYGON: Token;
declare const USDT: Token;
declare const USDT_ARBITRUM_ONE: Token;
declare const USDT_OPTIMISM: Token;
declare const WBTC: Token;
declare const WBTC_ARBITRUM_ONE: Token;
declare const WBTC_OPTIMISM: Token;
declare const FEI: Token;
declare const TRIBE: Token;
declare const FRAX: Token;
declare const FXS: Token;
declare const renBTC: Token;
declare const ETH2X_FLI: Token;
declare const sETH2: Token;
declare const rETH2: Token;
declare const SWISE: Token;
declare const WETH_POLYGON_MUMBAI: Token;
declare const WETH_POLYGON: Token;
declare const CELO_CELO: Token;
declare const CUSD_CELO: Token;
declare const CEUR_CELO: Token;
declare const PORTAL_ETH_CELO: Token;
declare const CMC02_CELO: Token;
declare const CELO_CELO_ALFAJORES: Token;
declare const CUSD_CELO_ALFAJORES: Token;
declare const CEUR_CELO_ALFAJORES: Token;
declare const USDT_BNB_CHAIN: Token;
declare const ETH_BNB_CHAIN: Token;
declare const MATIC_BNB_CHAIN: Token;
declare const FRAX_BNB_CHAIN: Token;
declare const BTC_BNB_CHAIN: Token;
declare const CAKE_BNB_CHAIN: Token;
declare const BUSD_BNB_CHAIN: Token;
declare const DAI_BNB_CHAIN: Token;
declare const UNI: {
    [chainId: number]: Token;
};
declare const WRAPPED_NATIVE_CURRENCY: {
    [chainId: number]: Token | undefined;
};
declare function isCelo(chainId: number): chainId is SupportedChainId.CELO | SupportedChainId.CELO_ALFAJORES;
declare class ExtendedEther extends Ether {
    get wrapped(): Token;
    private static _cachedExtendedEther;
    static onChain(chainId: number): ExtendedEther;
}
declare function nativeOnChain(chainId: number): NativeCurrency | Token;
declare const TOKEN_SHORTHANDS: {
    [shorthand: string]: {
        [chainId in SupportedChainId]?: string;
    };
};

declare function useOption<T extends string>(label: string, { options, defaultValue, nullable, }: {
    options: T[];
    defaultValue?: T;
    nullable?: boolean;
}): T | undefined;
declare function useOption<T>(label: string, { options, defaultValue, nullable, }: {
    options: Record<string, T>;
    defaultValue?: string;
    nullable?: boolean;
}): T | undefined;

declare function useProvider(defaultChainId?: number): _web3_react_types.Provider | undefined;

declare function invertTradeType(tradeType: TradeType): TradeType;
declare function toTradeType(modifiedField: Field): TradeType;

declare type SwapWidgetProps = SwapProps & WidgetProps;
declare function SwapWidget(props: SwapWidgetProps): JSX.Element;

export { ALL_SUPPORTED_CHAIN_IDS, AMPL, AddEthereumChainParameter, ApprovalTransactionInfo, BTC_BNB_CHAIN, BUSD_BNB_CHAIN, CAKE_BNB_CHAIN, CELO_CELO, CELO_CELO_ALFAJORES, CEUR_CELO, CEUR_CELO_ALFAJORES, CHAIN_NAMES_TO_IDS, CMC02_CELO, CUSD_CELO, CUSD_CELO_ALFAJORES, ChainName, DAI, DAI_ARBITRUM_ONE, DAI_BNB_CHAIN, DAI_OPTIMISM, DAI_POLYGON, DEFAULT_LOCALE, DefaultAddress, DialogAnimationType, DialogOptions, DialogWidgetProps, EMPTY_TOKEN_LIST, ETH2X_FLI, ETH_BNB_CHAIN, ExactInputSwapTransactionInfo, ExactOutputSwapTransactionInfo, ExtendedEther, FEI, FRAX, FRAX_BNB_CHAIN, FXS, FeeOptions, Field, Flags, JsonRpcConnectionMap, L1_CHAIN_IDS, L2_CHAIN_IDS, Logo, LogoUpdater, MATIC_BNB_CHAIN, OnAmountChange, OnConnectWalletClick, OnError, OnExpandSwapDetails, OnInitialSwapQuote, OnPermit2Allowance, OnReviewSwapClick, OnRouterPreferenceChange, OnSettingsReset, OnSlippageChange, OnSubmitSwapClick, OnSwapApprove, OnSwapPriceUpdateAck, OnSwapQuote, OnSwapSend, OnSwitchChain, OnSwitchTokens, OnTokenAllowance, OnTokenChange, OnTokenSelectorClick, OnTransactionDeadlineChange, OnTxFail, OnTxSubmit, OnTxSuccess, OnWrapSend, PORTAL_ETH_CELO, PORTAL_USDC_CELO, RouterPreference, SUPPORTED_GAS_ESTIMATE_CHAIN_IDS, SUPPORTED_LOCALES, SWISE, Slippage, SupportedChainId, SupportedL1ChainId, SupportedL2ChainId, SupportedLocale, SwapController, SwapEventHandlers, PerfEventHandlers as SwapPerfEventHandlers, SettingsEventHandlers as SwapSettingsEventHandlers, SwapTransactionInfo, SwapWidget, SwapWidgetProps, SwapWidgetSkeleton, SwapWidgetSkeletonProps, TOKEN_SHORTHANDS, TRIBE, Theme, TokenDefaults, Transaction, TransactionEventHandlers, TransactionInfo, TransactionType, UNI, UNISWAP_TOKEN_LIST, USDC, USDC_ARBITRUM, USDC_ARBITRUM_RINKEBY, USDC_BNB_CHAIN, USDC_CELO_ALFAJORES, USDC_GOERLI, USDC_KOVAN, USDC_MAINNET, USDC_OPTIMISM, USDC_POLYGON, USDC_POLYGON_MUMBAI, USDC_RINKEBY, USDC_ROPSTEN, USDT, USDT_ARBITRUM_ONE, USDT_BNB_CHAIN, USDT_OPTIMISM, USDT_POLYGON, widget as UniswapInterface, UnknownError, UnwrapTransactionInfo, UserRejectedRequestError, WBTC, WBTC_ARBITRUM_ONE, WBTC_OPTIMISM, WBTC_POLYGON, WETH_POLYGON, WETH_POLYGON_MUMBAI, WRAPPED_NATIVE_CURRENCY, WidgetError, WidgetEventHandlers, WidgetPromise, WrapTransactionInfo, darkTheme, defaultTheme, getAssetsRepoURI, getNativeLogoURI, invertTradeType, isCelo, isPolygonChain, lightTheme, nativeOnChain, rETH2, renBTC, sETH2, toTradeType, useLogo, useLogos, useOption, useProvider, validateTokenList, validateTokens };
