import BasMethod from "./setBaseMethod"

class UniswapInterface extends BasMethod {
	// click swap
	public handleSwap() {
		this.swapEvent && this.swapEvent()
	}
	public onStartSwapFlow(){
		this._onStartSwapFlow && this._onStartSwapFlow()
	}
	
	public listenerInputAmount(_fn: (_inputAmount: string | undefined) => void) {
		this.onInputAmountChange = _fn
	}
	
	public listenerSwapError(_fn: (err: string) => void) {
		this.swapError = _fn
	}
	
	public listenerSwapInfoData(fun:(e:any)=>void){
		 this._swapInfData = fun
	}
	
	public listenerStatus(fn:any){
		this._setLoading = fn
	}
	public listenerSwapInformation(_fn: (err: string)=>void){
		this.swapInformationFn = _fn
	}
	
	// change receive amount
	public handleChangeOutAmount(_val: string) {
		this.outAmount && this.outAmount(_val)
	}
	
	// change input amount
	public handleChangeInputAmount(_val: string) {
		this.inputAmount && this.inputAmount(_val)
	}
	
	public listenerOutAmount(_fn: (_outAmount: string | undefined) => void) {
		this.onOutAmountChange = _fn
	}
	
	get getTokens() {
		return this.Tokens
	}
	
	get getSwapInformation() {
		return this.swapInformation
	}
	
	ListenerEvent(_event: () => void) {
		this.addEvent = _event
	}
}

const widget = new UniswapInterface()
// @ts-ignore
window.widget = widget
export default widget
