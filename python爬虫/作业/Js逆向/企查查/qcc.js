CryptoJs = require('crypto-js')
_xt={
    "n": 20,
    "codes": {
        "0": "W",
        "1": "l",
        "2": "k",
        "3": "B",
        "4": "Q",
        "5": "g",
        "6": "f",
        "7": "i",
        "8": "i",
        "9": "r",
        "10": "v",
        "11": "6",
        "12": "A",
        "13": "K",
        "14": "N",
        "15": "k",
        "16": "4",
        "17": "L",
        "18": "1",
        "19": "8"
    }
}
var r = function() {
                for (var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/").toLowerCase(), t = e + e, n = "", i = 0; i < t.length; ++i) {
                    var a = t[i].charCodeAt() % _xt.n;
                    n += _xt.codes[a]
                }
                return n
            };


var s = function() {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
      , t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/").toLowerCase()
      , n = JSON.stringify(e).toLowerCase();
    return  CryptoJs.HmacSHA512(t + n, r(t)).toString().toLowerCase().substr(8, 20)
};

var _s = function() {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
              , n = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/").toLowerCase()
              , i = JSON.stringify(e).toLowerCase();
            return CryptoJs.HmacSHA512(n + "pathString" + i + t, r(n)).toString()
        };

var key = function(path){
        return s(path, undefined);
}
var value = function(path){
    return _s(path, undefined,'81ced092b48b66ea935a5bdb86eee513')
}
console.log(s("/api/datalist/touzilist?keyno=5dffb644394922f9073544a08f38be9f&pageindex=3", undefined));
console.log(_s("/api/datalist/touzilist?keyno=5dffb644394922f9073544a08f38be9f&pageindex=3", undefined,'81ced092b48b66ea935a5bdb86eee513'));