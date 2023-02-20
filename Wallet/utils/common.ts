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
