// @ts-ignore
import buffer from "buffer";
import {getCrc32} from '@dfinity/principal/lib/esm/utils/getCrc';
import * as SHA1 from '@dfinity/principal/lib/esm/utils/sha224';
import {toHexString} from "@dfinity/identity/lib/esm/buffer";

export const principalToAccountIdentifier = (principal, s) => {
    if (!principal) return '';
    const padding = new buffer.Buffer('\x0Aaccount-id');
    const array = new Uint8Array([...padding, ...[principal.toUint8Array()], ...getSubAccountArray(s)]);
    const hash = SHA1.sha224(array);
    const checksum = to32bits(getCrc32(hash));
    // @ts-ignore
    const array2 = new Uint8Array([...checksum, ...hash]);
    return toHexString(array2);
};
const to32bits = (num) => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
};
const getSubAccountArray = (s) => {
    return Array(28)
        .fill(0)
        .concat(to32bits(s ? s : 0));
};
// export const getCurrencyString = (
//     amount: BigInt | undefined | string | number,
//     decimals: BigInt | undefined | number,
//     toFixed: number | undefined = undefined
// ) => {
//     if (!amount || typeof decimals === "undefined") return "0";
//     const num = new BigNumber(amount.toString()).div(
//         new BigNumber(10).pow(decimals.toString())
//     );
//     return typeof toFixed === "undefined" ? num.toString() : num.toFixed(toFixed);
// };
