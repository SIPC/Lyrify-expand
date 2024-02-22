// https://github.com/zhizhuodemao/youdao_translate
const crypto = require("crypto")
const axios = require("axios")
var status

function r(t) {
    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    }
        : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ,
        r(t)
}

function i(t, e) {
    if ("object" !== r(t) || null === t)
        return t;
    var n = t[Symbol.toPrimitive];
    if (void 0 !== n) {
        var i = n.call(t, e || "default");
        if ("object" !== r(i))
            return i;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === e ? String : Number)(t)
}

function o(t) {
    var e = i(t, "string");
    return "symbol" === r(e) ? e : String(e)
}

function a(t, e, n) {
    return e = o(e),
        e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
}

function s(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e && (r = r.filter((function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }
        ))),
            n.push.apply(n, r)
    }
    return n
}

function hebing(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2 ? s(Object(n), !0).forEach((function (e) {
            a(t, e, n[e])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
        }
        ))
    }
    return t
}


function j(e) {
    return crypto.createHash("md5").update(e.toString()).digest("hex")
}

function k(e, t) {
    return j(`client=fanyideskweb&mysticTime=${new Date().getTime()}&product=webfanyi&key=fsdsogkndfokasodnaso`)
}

function E(e, t) {
    const o = (new Date).getTime();
    return {
        sign: k(o, e),
        client: "fanyideskweb",
        product: "webfanyi",
        appVersion: "1.0.0",
        vendor: "web",
        pointParam: "client,mysticTime,product",
        mysticTime: o,
        keyfrom: "fanyi.web",
        mid: 1,
        screen: 1,
        model: 1,
        network: "wifi",
        abtest: 0,
        yduuid: t || "abcdefg"
    }
}

B = (e, t) => {
    return Object(send)("https://dict.youdao.com/webtranslate", hebing(e, E(t)), {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "https://fanyi.youdao.com/",
            "Cookie": "OUTFOX_SEARCH_USER_ID=-580141615@121.19.39.73; OUTFOX_SEARCH_USER_ID_NCOO=1063133201.7130609"
        }
    });
}
send = function l(e, t, o) {
    return new Promise((n, i) => {
        axios.post(e, t, o).then(e => {
            status = e.status
            n(e.data)
        }
        ).catch(e => {
            i(e)
        }
        )
    }
    )
}

function y(e) {
    return crypto.createHash("md5").update(e).digest()
}

R = (t, o, n) => {
    const a = Buffer.alloc(16, y(o))
        , i = Buffer.alloc(16, y(n))
        , r = crypto.createDecipheriv("aes-128-cbc", a, i);
    let s = r.update(t, "base64", "utf-8");
    return s += r.final("utf-8"), s
}


function translate(from, to, text) {
    try {
        return new Promise((resolve, reject) => {
            first = {
                "i": text,
                "from": from,
                "to": to,
                "domain": "0",
                "dictResult": true,
                "keyid": "webfanyi"
            };
            second = "fsdsogkndfokasodnaso";
            B(first, second).then(function (o) {
                decode_key_str = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl";
                decode_iv_str = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4";
                const response = JSON.parse(R(o, decode_key_str, decode_iv_str))
                if (response.code === 0) {
                    response.code = status
                } else {
                    response.code = 500
                }
                resolve(response);
            });
        })
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = translate