import BigNumber from "bignumber.js";
import { parseUnits, formatUnits } from "ethers/lib/utils";

let timer: any | null = null, bucket: any = null;
export type BigNumberish = BigNumber | bigint | string | number | any;
import { ethers } from "ethers";
import moment from "moment-timezone";

let timer2 = null;
export const parseAmount = (val: string, decimals: number): BigInt => {
    try {
        const str = parseUnits(val, decimals).toString();
        return BigInt(str);
    } catch (err) {
        return BigInt(0);
    }
};

export const getCurrencyString = (
    amount: BigInt | undefined | string | number,
    decimals: BigInt | undefined | number,
    toFixed: number | undefined = undefined
) => {
    if (!amount || typeof decimals === "undefined") return "0";
    const num = new BigNumber(amount.toString()).div(
        new BigNumber(10).pow(decimals.toString())
    );
    return typeof toFixed === "undefined" ? num.toString() : num.toFixed(toFixed);
};


export const getLpAmount = (
    fromTokenAmount: string,
    toTokenAmount: string,
    reserve0: string,
    reserve1: string,
    pairTotalSupply: string
) => {
    const one = (new BigNumber(fromTokenAmount).times(new BigNumber(pairTotalSupply))).div(new BigNumber(reserve0)).toFixed(3);
    const two = (new BigNumber(toTokenAmount).times(new BigNumber(pairTotalSupply))).div(new BigNumber(reserve1)).toFixed(3);
    return Math.min(Number(one), Number(two)).toFixed(3);
};

export const debounce = (fn: Function, awaitTime: number = 500) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        fn();
    }, awaitTime || 0);
};


export const getAmountOut = (
    amountIn: string,
    decimalsIn: string,
    decimalsOut: string,
    reserveIn: string,
    reserveOut: string,
    fee = 3 // means 0.003
): string => {
    if (!amountIn || new BigNumber(amountIn).isZero()) return "0";
    const amountInWithFee = new BigNumber(amountIn) // amountIn * 997;
        .multipliedBy(new BigNumber(10).pow(decimalsIn))
        .multipliedBy(new BigNumber("1000").minus(fee));
    const numerator = amountInWithFee.multipliedBy(new BigNumber(reserveOut)); // amountInWithFee * reserveOut;
    const denominator = new BigNumber(reserveIn) // reserveIn * 1000 + amountInWithFee;
        .multipliedBy(new BigNumber("1000"))
        .plus(amountInWithFee);
    return numerator
        .dividedBy(denominator)
        .dividedBy(new BigNumber(10).pow(decimalsOut))
        .toFixed(Number(decimalsOut));
};
export const getAmountIn = (
    amountOut: string,
    decimalsIn: string,
    decimalsOut: string,
    reserveIn: string,
    reserveOut: string
): string => {
    if (!amountOut || new BigNumber(amountOut).isZero()) return "0";
    const numerator = new BigNumber(reserveIn) // reserveIn * amountOut * 1000;
        .multipliedBy(
            new BigNumber(amountOut).multipliedBy(new BigNumber(10).pow(decimalsOut))
        )
        .multipliedBy(new BigNumber("1000"));
    const denominator = new BigNumber(reserveOut) // (reserveOut - amountOut) * 997;
        .minus(
            new BigNumber(amountOut).multipliedBy(new BigNumber(10).pow(decimalsOut))
        )
        .multipliedBy(new BigNumber("997"));
    return numerator
        .dividedBy(denominator)
        .plus(new BigNumber("1"))
        .dividedBy(new BigNumber(10).pow(decimalsIn))
        .toFixed(Number(decimalsIn));
};

export const calculatePriceImpact = (
    amountIn: string,
    decimalsIn: string,
    amountOut: string,
    decimalsOut: string,
    reserve0: string,
    reserve1: string
): string => {
    if (
        !amountIn ||
        !amountOut ||
        new BigNumber(amountIn).isNaN() ||
        new BigNumber(amountOut).isNaN() ||
        new BigNumber(reserve1).isZero()
    )
        return "0.00";
    // price impact = abs(reserve0/reserve1 - (reserve0 + amountIn)/(reserve1 - amountOut))
    const aIn = new BigNumber(amountIn).multipliedBy(
        new BigNumber(10).pow(parseInt(decimalsIn))
    );
    const aOut = new BigNumber(amountOut).multipliedBy(
        new BigNumber(10).pow(parseInt(decimalsOut))
    );
    const a = new BigNumber(reserve0).dividedBy(new BigNumber(reserve1));
    const b = new BigNumber(reserve0).plus(aIn);
    const c = new BigNumber(reserve1).plus(aOut);
    const impact = a.minus(b.dividedBy(c)).abs().multipliedBy(100).toFixed(2);
    return impact;
};

//desensitization
export const desensitizationPrincipal = (info: string, len: number = 3) => {
    if (!info) {
        return "";
    }
    return info.substring(0, len) + "..." + info.substring(info.length - len, info.length);
};



export const formatAmount = (val: BigInt, decimals: number): string => {
    try {
        return formatUnits(ethers.BigNumber.from(val.toString()), decimals);
    } catch (err) {
        return "0";
    }
};

export const toThousands = (num) => {
    const numStr = (num || 0).toString();
    return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};
/**
 *
 * @param startTime  ms
 * @param endTime ms
 */
export const countDown = (startTime: number | any, endTime: number) => {
    const allTime = endTime - startTime;
    console.log(allTime, 90);
    if (allTime <= 0) {
        return "End";
    }
    return moment(allTime).format("DD天HH小时mm分钟");
};

export const getImageInformation = (img_url: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = img_url;
        if (img.complete) {
            resolve({ width: img.width, height: img.height });
        } else {
            img.onload = function() {
                resolve({ width: img.width, height: img.height });
            };
        }
    }).catch(() => {
        return { width: "", height: "" };
    });

};
export const createBucket = async () => {

    const setting = {
        accessKeyId: "AKIA6N3WC2XTGTBPVMXL",
        secretAccessKey: "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"
    };
    // @ts-ignore
    AWS.config.update(setting);
    // @ts-ignore
    return new AWS.S3({ params: { Bucket: "inft" }, region: "us-east-1" });

};

export const AwsUpload = (file): any => {
    return new Promise(async (resolve, reject) => {
        const { type, name } = file?.file || file;
        const params = {
            Bucket: "imart-nft/mixverse",
            Key: name,
            ContentType: type,
            Body: file?.file || file,
            "Access-Control-Allow-Credentials": "*",
            "ACL": "public-read-write"
        };
        if (!bucket) {
            bucket = await createBucket();
        }
        bucket.upload(params, function(err, data) {
            console.log(data, "data");
            console.log(err, "err");

            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });

    // const s3subject = new Subject(); //创建一个Subject主体

};
export const AwsUploadModel = (file): any => {
    return new Promise(async (resolve, reject) => {
        const { type, name } = file;
        const params = {
            Bucket: "imart-nft/template",
            Key: name,
            ContentType: "glb",
            Body: file,
            "Access-Control-Allow-Credentials": "*",
            "ACL": "public-read-write"
        };
        if (!bucket) {
            bucket = await createBucket();
        }
        bucket.upload(params, function(err, data) {
            console.log(data, "data");
            console.log(err, "err");

            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });

    // const s3subject = new Subject(); //创建一个Subject主体

};

export function IsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let pc = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            pc = false;
            break;
        }
    }
    return pc;
}
