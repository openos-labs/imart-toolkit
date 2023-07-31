import { Currency } from "@openos-labs/sdk-core"

import { SummaryRowProps } from "../components/Swap/Toolbar/ToolbarTradeSummary"
import { WrappedTokenInfo } from "../state/lists/wrappedTokenInfo"

const suppotTokens = ["ETH", "USDC", "DAI", "USDT"]

export type StatusType = "err" | "trade" | "loading"
export default class SetBaseMethod {
	public selectInputToken: ((update: Currency) => void) | undefined
	public selectOutToken: ((update: Currency) => void) | undefined
	addEvent: (() => void) | undefined
	public inputAmount: ((update: string, origin?: "max") => void) | undefined
	public outAmount: ((update: string, origin?: "max") => void) | undefined
	public swapEvent: (() => void) | undefined
	
	public nextSwap:() => void = () => {
	}
	public _onStartSwapFlow: () => void = () => {
	}
	swapInformationFn: ((e: any) => void) | any
	
	exchangeInfo: (e:any) => void = (e) => {
	}
	
	
	_swapInfData: (e: any) => void = (err: string) => {
	}
	
	_setLoading: (e: any) => void = (e) => {
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	swapError: (err: string) => void = (err: string) => {
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onInputAmountChange: (_inputAmount: string | undefined) => void = () => {
	}
	
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onOutAmountChange: (_outAmount: string | undefined) => void = () => {
	}
	
	// information
	public swapInformation: any | SummaryRowProps[]
	public tokens: WrappedTokenInfo[] | undefined | any
	
	set setSelectInputToken(_selectInputToken: (update: Currency) => void) {
		this.selectInputToken = _selectInputToken
	}
	
	set setOutputToken(_selectOutToken: (update: Currency) => void) {
		this.selectOutToken = _selectOutToken
	}
	
	set setInputAmount(_selectInputToken: (update: string, origin?: "max") => void) {
		this.inputAmount = _selectInputToken
	}
	
	set setOutAmount(_selectOutToken: (update: string, origin?: "max") => void) {
		this.outAmount = _selectOutToken
	}
	
	set setSwapEvent(_func: (() => void) | undefined) {
		this.swapEvent = _func
	}
	
	set setInformation(_val: SummaryRowProps[]) {
		this.swapInformationFn && this.swapInformationFn(_val)
	}
	
	setLoading(e: { status: StatusType, message: string }) {
		this._setLoading(e)
	}
	
	set setSwapInformation(_val: SummaryRowProps[]) {
		this.swapInformation = _val
	}
	
	set Tokens(_val: WrappedTokenInfo[]) {
		this.tokens = _val
	}
	
	set setSwapDataInfo(e: any) {
		this._swapInfData && this._swapInfData(e)
	}
	
	set  setExchangeInfo(e:any){
		this.exchangeInfo(e)
	}
	handleOnInputAmountChange(_input: string | undefined) {
		return this.onOutAmountChange(_input)
	}
	
	handleOnOutAmountChange(_out: string | undefined) {
		return this.onOutAmountChange(_out)
	}
	
	handleSwapError(err: string) {
		return this.swapError(err)
	}
}
