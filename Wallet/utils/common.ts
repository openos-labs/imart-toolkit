import BigNumber from "bignumber.js";

export class AwaitResolve {
    static awaitEvents: Map<string, Function> = new Map()
    static awaitValues: Map<string, any> = new Map()

    constructor() {
    }

    static resolveFn(key: string, obj) {
        this.awaitValues.set(key, obj);
        const _fn = this.awaitEvents.get(key);
        _fn && _fn(obj)
    }

    static awaitFn(key: string) {
        return new Promise((resolve, reject) => {
            const _value = this.awaitValues.get(key);
            if (_value) {
                resolve(_value)
            } else {
                this.awaitEvents.set(key, resolve);
            }
        })
    }
}

export const getCurrencyString = (
    // eslint-disable-next-line no-undef
    amount: BigInt | undefined | string | number,
    // eslint-disable-next-line no-undef
    decimals: BigInt | undefined | number,
    toFixed: number | undefined = undefined
) => {
    if (!amount || typeof decimals === "undefined") return "0";
    const num = new BigNumber(amount.toString()).div(
        new BigNumber(10).pow(decimals.toString())
    );
    return typeof toFixed === "undefined" ? num.toString() : num.toFixed(toFixed);
};
